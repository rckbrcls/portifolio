"use client";

import React, {
  useRef,
  forwardRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Text } from "../atoms/Text";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { BiSolidComponent } from "react-icons/bi";
import { ZoomInIcon, ZoomOutIcon } from "@radix-ui/react-icons";

// ===== EXCALIDRAW-STYLE TYPE SYSTEM =====
interface WorldCoordinates {
  x: number;
  y: number;
}

interface ViewportState {
  scale: number;
  translateX: number;
  translateY: number;
}

interface ArchitectureCard {
  id: string;
  position: WorldCoordinates;
  size: { width: number; height: number };
  title: string;
  githubUrl: string;
  microfrontendUrl?: string;
}

interface Connection {
  id: string;
  from: string;
  to: string;
  color?: string;
  thickness?: number;
}

interface AppState {
  viewport: ViewportState;
  cards: Map<string, ArchitectureCard>;
  connections: Map<string, Connection>;
  selectedCards: Set<string>;
  isDragging: boolean;
  dragState: {
    cardId: string;
    startPosition: WorldCoordinates;
    offset: WorldCoordinates;
  } | null;
}

// ===== EXCALIDRAW-STYLE COORDINATE TRANSFORMATIONS =====
const screenToWorld = (
  screenCoords: { x: number; y: number },
  viewport: ViewportState,
  containerRect: DOMRect,
): WorldCoordinates => ({
  x:
    (screenCoords.x - containerRect.left - viewport.translateX) /
    viewport.scale,
  y:
    (screenCoords.y - containerRect.top - viewport.translateY) / viewport.scale,
});

const worldToScreen = (
  worldCoords: WorldCoordinates,
  viewport: ViewportState,
): { x: number; y: number } => ({
  x: worldCoords.x * viewport.scale + viewport.translateX,
  y: worldCoords.y * viewport.scale + viewport.translateY,
});

// ===== EXCALIDRAW-STYLE ZOOM MANAGEMENT =====
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 5.0;
const ZOOM_STEP = 0.1;

const getNormalizedZoom = (zoom: number): number => {
  return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));
};

const getStateForZoom = (
  viewportX: number,
  viewportY: number,
  nextZoom: number,
  currentState: ViewportState,
  containerRect: DOMRect,
): ViewportState => {
  const appLayerX = viewportX - containerRect.left;
  const appLayerY = viewportY - containerRect.top;
  const currentZoom = currentState.scale;

  // Get original scroll position without zoom
  const baseTranslateX =
    currentState.translateX + (appLayerX - appLayerX / currentZoom);
  const baseTranslateY =
    currentState.translateY + (appLayerY - appLayerY / currentZoom);

  // Get translate offsets for target zoom level
  const zoomOffsetX = -(appLayerX - appLayerX / nextZoom);
  const zoomOffsetY = -(appLayerY - appLayerY / nextZoom);

  return {
    scale: nextZoom,
    translateX: baseTranslateX + zoomOffsetX,
    translateY: baseTranslateY + zoomOffsetY,
  };
};

// ===== EXCALIDRAW-STYLE COMPONENTS =====

// Card component following Excalidraw element pattern
const ArchitectureCardElement = React.forwardRef<
  HTMLDivElement,
  {
    card: ArchitectureCard;
    viewport: ViewportState;
    isSelected: boolean;
    isDragging: boolean;
    onMouseDown: (e: React.MouseEvent, cardId: string) => void;
  }
>(({ card, viewport, isSelected, isDragging, onMouseDown }, ref) => {
  const screenPos = worldToScreen(card.position, viewport);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: screenPos.x,
        top: screenPos.y,
        width: card.size.width * viewport.scale,
        height: card.size.height * viewport.scale,
        transform: "translate3d(0, 0, 0)", // Hardware acceleration
        zIndex: isDragging ? 30 : isSelected ? 20 : 10,
      }}
      className={cn(
        "glass-dark rounded-lg bg-zinc-950/50 p-3 transition-shadow duration-200",
        isSelected && "ring-2 ring-purple-400/50",
        isDragging && "scale-105 shadow-xl",
      )}
      onMouseDown={(e) => onMouseDown(e, card.id)}
      data-card-id={card.id}
    >
      <div
        className="flex w-full flex-col items-center gap-2 p-2"
        style={{
          fontSize: `${Math.max(0.7, viewport.scale)}rem`,
          transform: `scale(${Math.min(1, 1 / viewport.scale)})`,
          transformOrigin: "center center",
        }}
      >
        <Text className="text-nowrap font-bold">{card.title}</Text>
        <a
          className="glass-dark flex w-full items-center justify-center gap-2 rounded p-2 transition duration-500 hover:scale-105"
          href={card.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          <GitHubLogoIcon />
          <Text className="w-full md:text-sm">Codebase</Text>
        </a>
        {card.microfrontendUrl && (
          <a
            className="glass-dark flex w-full items-center justify-center gap-2 rounded p-2 transition duration-500 hover:scale-105"
            href={card.microfrontendUrl}
            onClick={(e) => e.stopPropagation()}
          >
            <BiSolidComponent />
            <Text className="w-full md:text-sm">Microfrontend</Text>
          </a>
        )}
      </div>
    </div>
  );
});

ArchitectureCardElement.displayName = "ArchitectureCardElement";

// SVG Connection component following Excalidraw pattern
const ConnectionElement: React.FC<{
  connection: Connection;
  cards: Map<string, ArchitectureCard>;
  viewport: ViewportState;
}> = ({ connection, cards, viewport }) => {
  const fromCard = cards.get(connection.from);
  const toCard = cards.get(connection.to);

  if (!fromCard || !toCard) return null;

  const fromScreen = worldToScreen(fromCard.position, viewport);
  const toScreen = worldToScreen(toCard.position, viewport);

  // Calculate center points of cards
  const fromCenter = {
    x: fromScreen.x + (fromCard.size.width * viewport.scale) / 2,
    y: fromScreen.y + (fromCard.size.height * viewport.scale) / 2,
  };

  const toCenter = {
    x: toScreen.x + (toCard.size.width * viewport.scale) / 2,
    y: toScreen.y + (toCard.size.height * viewport.scale) / 2,
  };

  // Generate bezier curve path (Excalidraw style)
  const controlOffset = Math.abs(toCenter.x - fromCenter.x) * 0.3;
  const path = `M ${fromCenter.x} ${fromCenter.y} 
               C ${fromCenter.x + controlOffset} ${fromCenter.y}, 
                 ${toCenter.x - controlOffset} ${toCenter.y}, 
                 ${toCenter.x} ${toCenter.y}`;

  return (
    <path
      d={path}
      stroke={connection.color || "#9c40ff"}
      strokeWidth={(connection.thickness || 2) / viewport.scale}
      fill="none"
      strokeDasharray="5,5"
      style={{
        strokeDasharray: `${5 / viewport.scale},${5 / viewport.scale}`,
      }}
    />
  );
};

// Main viewport component following Excalidraw architecture
const ViewportLayer: React.FC<{
  appState: AppState;
  onViewportChange: (viewport: ViewportState) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}> = ({ appState, onViewportChange, containerRef, children }) => {
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

  // Excalidraw-style wheel handler
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();

      if (e.ctrlKey || e.metaKey) {
        // Zoom with cursor position
        const factor = e.deltaY > 0 ? 0.9 : 1.1;
        const nextZoom = getNormalizedZoom(appState.viewport.scale * factor);

        const newViewport = getStateForZoom(
          e.clientX,
          e.clientY,
          nextZoom,
          appState.viewport,
          containerRect,
        );

        onViewportChange(newViewport);
      } else {
        // Pan
        const newViewport = {
          ...appState.viewport,
          translateX: appState.viewport.translateX - e.deltaX,
          translateY: appState.viewport.translateY - e.deltaY,
        };
        onViewportChange(newViewport);
      }
    },
    [appState.viewport, onViewportChange, containerRef],
  );

  // Excalidraw-style mouse handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1) {
      // Middle mouse button
      e.preventDefault();
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isPanning) return;

      e.preventDefault();
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;

      const newViewport = {
        ...appState.viewport,
        translateX: appState.viewport.translateX + deltaX,
        translateY: appState.viewport.translateY + deltaY,
      };

      onViewportChange(newViewport);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    },
    [isPanning, lastPanPoint, appState.viewport, onViewportChange],
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Event listeners setup (Excalidraw pattern)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });

    if (isPanning) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      container.removeEventListener("wheel", handleWheel);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleWheel, handleMouseMove, handleMouseUp, isPanning]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        cursor: isPanning ? "grabbing" : "grab",
        overflow: "hidden",
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

// ===== MAIN ARCHITECTURE CONTAINER =====
export function ArchitectureContainer({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({
    width: 850,
    height: 600,
  });

  // Initialize Excalidraw-style app state
  const [appState, setAppState] = useState<AppState>(() => {
    const cards = new Map<string, ArchitectureCard>();
    const connections = new Map<string, Connection>();

    // Architecture blocks data
    const architectureBlocks = [
      {
        title: "Simple Store",
        githubUrl:
          "https://github.com/brcls/portifolio-monorepo/tree/main/apps/lojinha-simples",
        microfrontendUrl: "/microfrontend/lojinha-simples",
      },
      {
        title: "Video Project Manage",
        githubUrl:
          "https://github.com/brcls/portifolio-monorepo/tree/main/apps/video-project-manage",
        microfrontendUrl: "/microfrontend/video-project-manage",
      },
      {
        title: "Main",
        githubUrl:
          "https://github.com/brcls/portifolio-monorepo/tree/main/apps/main",
      },
      {
        title: "Alan Turing",
        githubUrl:
          "https://github.com/brcls/portifolio-monorepo/tree/main/apps/alan-turing",
        microfrontendUrl: "/microfrontend/alan-turing",
      },
      {
        title: "Joystick",
        githubUrl:
          "https://github.com/brcls/portifolio-monorepo/tree/main/apps/joystick",
        microfrontendUrl: "/microfrontend/joystick",
      },
      {
        title: "Secret Santa",
        githubUrl:
          "https://github.com/brcls/portifolio-monorepo/tree/main/apps/secret-santa",
        microfrontendUrl: "/microfrontend/secret-santa",
      },
      {
        title: "Electoral System",
        githubUrl:
          "https://github.com/brcls/portifolio-monorepo/tree/main/apps/electoral-system",
        microfrontendUrl: "/microfrontend/electoral-system",
      },
      {
        title: "RGBWallet",
        githubUrl:
          "https://github.com/brcls/portifolio-monorepo/tree/main/apps/rgbwallet",
        microfrontendUrl: "/microfrontend/rgbwallet",
      },
    ];

    // Create cards with world coordinates
    architectureBlocks.forEach((block, index) => {
      const cardWidth = 170;
      const cardHeight = 120;

      let position: WorldCoordinates;

      if (block.title === "Main") {
        // Center card
        position = { x: 300, y: 200 };
      } else {
        // Arrange other cards in a circle around main
        const angle = (index * (Math.PI * 2)) / (architectureBlocks.length - 1);
        const radius = 250;
        position = {
          x: 300 + Math.cos(angle) * radius,
          y: 200 + Math.sin(angle) * radius,
        };
      }

      const card: ArchitectureCard = {
        id: block.title.toLowerCase().replace(/\s+/g, "-"),
        position,
        size: { width: cardWidth, height: cardHeight },
        title: block.title,
        githubUrl: block.githubUrl,
        microfrontendUrl: block.microfrontendUrl,
      };

      cards.set(card.id, card);

      // Create connections to Main (except Main itself)
      if (block.title !== "Main") {
        const connection: Connection = {
          id: `${card.id}-to-main`,
          from: card.id,
          to: "main",
          color: "#9c40ff",
          thickness: 2,
        };
        connections.set(connection.id, connection);
      }
    });

    return {
      viewport: { scale: 1, translateX: 0, translateY: 0 },
      cards,
      connections,
      selectedCards: new Set(),
      isDragging: false,
      dragState: null,
    };
  });

  // Container size monitoring (Excalidraw pattern)
  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setContainerSize({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateContainerSize();

    const resizeObserver = new ResizeObserver(updateContainerSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Drag handling (Excalidraw style)
  const handleCardMouseDown = useCallback(
    (e: React.MouseEvent, cardId: string) => {
      e.preventDefault();
      e.stopPropagation();

      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const worldPos = screenToWorld(
        { x: e.clientX, y: e.clientY },
        appState.viewport,
        containerRect,
      );

      const card = appState.cards.get(cardId);
      if (!card) return;

      // Start drag operation
      setAppState((prev) => ({
        ...prev,
        isDragging: true,
        selectedCards: new Set([cardId]),
        dragState: {
          cardId,
          startPosition: card.position,
          offset: {
            x: worldPos.x - card.position.x,
            y: worldPos.y - card.position.y,
          },
        },
      }));

      // Global mouse event handlers for drag
      const handleMouseMove = (e: MouseEvent) => {
        e.preventDefault();

        const worldPos = screenToWorld(
          { x: e.clientX, y: e.clientY },
          appState.viewport,
          containerRect,
        );

        setAppState((prev) => {
          if (!prev.dragState) return prev;

          const newPosition = {
            x: worldPos.x - prev.dragState.offset.x,
            y: worldPos.y - prev.dragState.offset.y,
          };

          const updatedCards = new Map(prev.cards);
          const card = updatedCards.get(cardId);
          if (card) {
            updatedCards.set(cardId, { ...card, position: newPosition });
          }

          return {
            ...prev,
            cards: updatedCards,
          };
        });
      };

      const handleMouseUp = () => {
        setAppState((prev) => ({
          ...prev,
          isDragging: false,
          dragState: null,
        }));

        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [appState.viewport, appState.cards],
  );

  // Viewport update handler
  const handleViewportChange = useCallback((newViewport: ViewportState) => {
    setAppState((prev) => ({
      ...prev,
      viewport: newViewport,
    }));
  }, []);

  // Zoom controls (Excalidraw style)
  const zoomIn = useCallback(() => {
    const newScale = getNormalizedZoom(
      appState.viewport.scale * (1 + ZOOM_STEP),
    );
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    const newViewport = getStateForZoom(
      centerX,
      centerY,
      newScale,
      appState.viewport,
      containerRect,
    );

    handleViewportChange(newViewport);
  }, [appState.viewport, handleViewportChange]);

  const zoomOut = useCallback(() => {
    const newScale = getNormalizedZoom(
      appState.viewport.scale * (1 - ZOOM_STEP),
    );
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    const newViewport = getStateForZoom(
      centerX,
      centerY,
      newScale,
      appState.viewport,
      containerRect,
    );

    handleViewportChange(newViewport);
  }, [appState.viewport, handleViewportChange]);

  const resetView = useCallback(() => {
    handleViewportChange({ scale: 1, translateX: 0, translateY: 0 });
  }, [handleViewportChange]);

  // Render cards and connections
  const cardsArray = Array.from(appState.cards.values());
  const connectionsArray = Array.from(appState.connections.values());

  return (
    <div
      className={cn(
        "bg-background glass-dark relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-xl transition-all duration-200",
        "border border-zinc-700/50",
        className,
      )}
      ref={containerRef}
      style={{
        minWidth: 850,
        minHeight: 620,
        height: "90vh",
        maxHeight: 720,
      }}
    >
      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          className="rounded-lg border border-purple-500/50 bg-purple-500/20 p-2 text-purple-300 backdrop-blur-sm transition-all duration-200 hover:bg-purple-500/30 hover:text-purple-100"
          title="Zoom In"
          disabled={appState.viewport.scale >= MAX_ZOOM}
        >
          <ZoomInIcon className="h-4 w-4" />
        </button>
        <button
          onClick={zoomOut}
          className="rounded-lg border border-purple-500/50 bg-purple-500/20 p-2 text-purple-300 backdrop-blur-sm transition-all duration-200 hover:bg-purple-500/30 hover:text-purple-100"
          title="Zoom Out"
          disabled={appState.viewport.scale <= MIN_ZOOM}
        >
          <ZoomOutIcon className="h-4 w-4" />
        </button>
        <button
          onClick={resetView}
          className="rounded-lg border border-purple-500/50 bg-purple-500/20 px-2 py-1 text-purple-300 backdrop-blur-sm transition-all duration-200 hover:bg-purple-500/30 hover:text-purple-100"
          title="Reset View"
        >
          <Text className="text-xs">Reset</Text>
        </button>
      </div>

      {/* Scale Indicator */}
      {appState.viewport.scale !== 1 && (
        <div className="absolute right-2 top-2 z-50 rounded-lg border border-purple-500/50 bg-purple-500/20 px-2 py-1 backdrop-blur-sm">
          <Text className="font-mono text-xs text-purple-300">
            {Math.round(appState.viewport.scale * 100)}%
          </Text>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-2 left-2 z-50 rounded-lg border border-purple-500/50 bg-purple-500/20 px-3 py-1 backdrop-blur-sm">
        <Text className="text-xs text-purple-300">
          Ctrl+Scroll: Zoom • Scroll: Pan • Drag: Move Cards
        </Text>
      </div>

      {/* Viewport Layer (Excalidraw architecture) */}
      <ViewportLayer
        appState={appState}
        onViewportChange={handleViewportChange}
        containerRef={containerRef}
      >
        {/* SVG Layer for Connections */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {connectionsArray.map((connection) => (
            <ConnectionElement
              key={connection.id}
              connection={connection}
              cards={appState.cards}
              viewport={appState.viewport}
            />
          ))}
        </svg>

        {/* Cards Layer */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            zIndex: 2,
          }}
        >
          {cardsArray.map((card) => (
            <ArchitectureCardElement
              key={card.id}
              card={card}
              viewport={appState.viewport}
              isSelected={appState.selectedCards.has(card.id)}
              isDragging={
                appState.isDragging && appState.dragState?.cardId === card.id
              }
              onMouseDown={handleCardMouseDown}
            />
          ))}
        </div>
      </ViewportLayer>
    </div>
  );
}
