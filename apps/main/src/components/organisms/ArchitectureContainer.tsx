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
import { ZoomInIcon, ZoomOutIcon, HandIcon } from "@radix-ui/react-icons";

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
  isPanModeActive: boolean; // New state for pan/zoom mode
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
const ZOOM_STEP = 0.12; // Reduced from 0.2 for more controlled zoom
const ZOOM_WHEEL_FACTOR = 1.15; // Reduced from 1.3 for smoother zoom (was 1.2)
const PAN_SENSITIVITY = 1.2; // Reduced from 2.5 for more controlled pan (was 1.5)

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
    onTouchStart: (e: React.TouchEvent, cardId: string) => void;
  }
>(
  (
    { card, viewport, isSelected, isDragging, onMouseDown, onTouchStart },
    ref,
  ) => {
    const screenPos = worldToScreen(card.position, viewport);

    // Excalidraw-style: Cards scale uniformly with viewport
    const cardScale = viewport.scale;

    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          left: screenPos.x,
          top: screenPos.y,
          width: card.size.width * cardScale,
          height: card.size.height * cardScale,
          transformOrigin: "top left",
          zIndex: isDragging ? 30 : isSelected ? 20 : 10,
          cursor: isDragging ? "grabbing" : "grab",
          // Touch optimizations
          WebkitUserSelect: "none",
          userSelect: "none",
          WebkitTouchCallout: "none",
          WebkitTapHighlightColor: "transparent",
          touchAction: "none",
        }}
        className={cn(
          "glass-dark rounded-xl border-zinc-800 bg-zinc-950 transition-shadow duration-200",
          isSelected && "ring-2 ring-purple-400/50",
          isDragging && "scale-105 shadow-xl",
        )}
        onMouseDown={(e) => onMouseDown(e, card.id)}
        onTouchStart={(e) => onTouchStart(e, card.id)}
        data-card-id={card.id}
      >
        <div
          className="flex h-full w-full flex-col justify-between"
          style={{
            padding: `${8 * cardScale}px`,
            gap: `${6 * cardScale}px`,
          }}
        >
          {/* Title area - centered vertically in top portion */}
          <div
            className="flex items-center justify-center"
            style={{
              minHeight: `${40 * cardScale}px`, // Give the title area some height to center within
            }}
          >
            <span
              className="text-center font-bold leading-tight text-white"
              style={{
                fontSize: `${14 * cardScale}px`,
              }}
            >
              {card.title}
            </span>
          </div>
          {/* Buttons container */}
          <div
            className="flex w-full flex-col"
            style={{
              gap: `${6 * cardScale}px`,
            }}
          >
            <a
              className="glass-dark flex w-full items-center justify-center rounded-xl border-zinc-800 transition duration-500 hover:scale-105"
              style={{
                padding: `${8 * cardScale}px`,
                gap: `${6 * cardScale}px`,
              }}
              href={card.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <GitHubLogoIcon
                style={{
                  width: `${12 * cardScale}px`,
                  height: `${12 * cardScale}px`,
                }}
              />
              <span
                className="w-full text-white"
                style={{
                  fontSize: `${12 * cardScale}px`,
                }}
              >
                Codebase
              </span>
            </a>
            {card.microfrontendUrl && (
              <a
                className="glass-dark flex w-full items-center justify-center rounded-xl border-zinc-800 transition duration-500 hover:scale-105"
                style={{
                  padding: `${8 * cardScale}px`,
                  gap: `${6 * cardScale}px`,
                }}
                href={card.microfrontendUrl}
                onClick={(e) => e.stopPropagation()}
              >
                <BiSolidComponent
                  style={{
                    width: `${12 * cardScale}px`,
                    height: `${12 * cardScale}px`,
                  }}
                />
                <span
                  className="w-full text-white"
                  style={{
                    fontSize: `${12 * cardScale}px`,
                  }}
                >
                  Microfrontend
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  },
);

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

  // Calculate center points of cards using the viewport scale
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
      strokeWidth={connection.thickness || 2}
      fill="none"
      strokeDasharray="5,5"
      style={{
        strokeDasharray: "5,5",
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

  // Touch state for pinch zoom
  const [touchState, setTouchState] = useState<{
    touches: Array<{ x: number; y: number }>;
    lastDistance: number;
    lastCenter: { x: number; y: number };
  }>({ touches: [], lastDistance: 0, lastCenter: { x: 0, y: 0 } });

  // Helper function to get touch distance for pinch zoom
  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2),
    );
  };

  // Helper function to get center point between two touches
  const getTouchCenter = (touches: React.TouchList) => {
    if (touches.length < 2) return { x: 0, y: 0 };
    const touch1 = touches[0];
    const touch2 = touches[1];
    return {
      x: (touch1.clientX + touch2.clientX) / 2,
      y: (touch1.clientY + touch2.clientY) / 2,
    };
  };

  // Excalidraw-style wheel handler - only active when pan mode is on
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!appState.isPanModeActive) return; // Only work when pan mode is active

      e.preventDefault();
      e.stopPropagation();

      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();

      if (e.ctrlKey || e.metaKey) {
        // Zoom with cursor position - faster zoom
        const factor = e.deltaY > 0 ? 1 / ZOOM_WHEEL_FACTOR : ZOOM_WHEEL_FACTOR;
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
        // Pan - faster pan with sensitivity multiplier
        const panDeltaX = e.deltaX * PAN_SENSITIVITY;
        const panDeltaY = e.deltaY * PAN_SENSITIVITY;

        const newViewport = {
          ...appState.viewport,
          translateX: appState.viewport.translateX - panDeltaX,
          translateY: appState.viewport.translateY - panDeltaY,
        };
        onViewportChange(newViewport);
      }
    },
    [
      appState.viewport,
      appState.isPanModeActive,
      onViewportChange,
      containerRef,
    ],
  );

  // Touch handlers for mobile support
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!appState.isPanModeActive) return;

      e.preventDefault();
      const touches = e.touches;

      if (touches.length === 1) {
        // Single touch - start panning
        setIsPanning(true);
        setLastPanPoint({ x: touches[0].clientX, y: touches[0].clientY });
      } else if (touches.length === 2) {
        // Two touches - prepare for pinch zoom
        const distance = getTouchDistance(touches);
        const center = getTouchCenter(touches);
        setTouchState({
          touches: Array.from(touches).map((t) => ({
            x: t.clientX,
            y: t.clientY,
          })),
          lastDistance: distance,
          lastCenter: center,
        });
        setIsPanning(false); // Stop panning when starting pinch
      }
    },
    [appState.isPanModeActive],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!appState.isPanModeActive) return;

      e.preventDefault();
      const touches = e.touches;

      if (touches.length === 1 && isPanning) {
        // Single touch - pan
        const touch = touches[0];
        const deltaX = (touch.clientX - lastPanPoint.x) * PAN_SENSITIVITY;
        const deltaY = (touch.clientY - lastPanPoint.y) * PAN_SENSITIVITY;

        const newViewport = {
          ...appState.viewport,
          translateX: appState.viewport.translateX + deltaX,
          translateY: appState.viewport.translateY + deltaY,
        };

        onViewportChange(newViewport);
        setLastPanPoint({ x: touch.clientX, y: touch.clientY });
      } else if (touches.length === 2) {
        // Two touches - pinch zoom
        const distance = getTouchDistance(touches);
        const center = getTouchCenter(touches);

        if (touchState.lastDistance > 0) {
          const container = containerRef.current;
          if (!container) return;

          const containerRect = container.getBoundingClientRect();
          const scale = distance / touchState.lastDistance;
          const nextZoom = getNormalizedZoom(appState.viewport.scale * scale);

          const newViewport = getStateForZoom(
            center.x,
            center.y,
            nextZoom,
            appState.viewport,
            containerRect,
          );

          onViewportChange(newViewport);
        }

        setTouchState({
          touches: Array.from(touches).map((t) => ({
            x: t.clientX,
            y: t.clientY,
          })),
          lastDistance: distance,
          lastCenter: center,
        });
      }
    },
    [
      appState.isPanModeActive,
      isPanning,
      lastPanPoint,
      touchState,
      appState.viewport,
      onViewportChange,
      containerRef,
    ],
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!appState.isPanModeActive) return;

      const touches = e.touches;

      if (touches.length === 0) {
        // All touches ended
        setIsPanning(false);
        setTouchState({
          touches: [],
          lastDistance: 0,
          lastCenter: { x: 0, y: 0 },
        });
      } else if (touches.length === 1) {
        // One touch remaining after pinch - switch to pan
        setIsPanning(true);
        setLastPanPoint({ x: touches[0].clientX, y: touches[0].clientY });
        setTouchState({
          touches: [],
          lastDistance: 0,
          lastCenter: { x: 0, y: 0 },
        });
      }
    },
    [appState.isPanModeActive],
  );
  const handleMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!appState.isPanModeActive) return; // Only work when pan mode is active

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const button = "button" in e ? e.button : 0;

      if (button === 0 || button === 1 || "touches" in e) {
        // Left mouse button, middle mouse button, or touch
        e.preventDefault();
        setIsPanning(true);
        setLastPanPoint({ x: clientX, y: clientY });
      }
    },
    [appState.isPanModeActive],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isPanning || !appState.isPanModeActive) return;

      e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = (clientX - lastPanPoint.x) * PAN_SENSITIVITY;
      const deltaY = (clientY - lastPanPoint.y) * PAN_SENSITIVITY;

      const newViewport = {
        ...appState.viewport,
        translateX: appState.viewport.translateX + deltaX,
        translateY: appState.viewport.translateY + deltaY,
      };

      onViewportChange(newViewport);
      setLastPanPoint({ x: clientX, y: clientY });
    },
    [
      isPanning,
      lastPanPoint,
      appState.viewport,
      appState.isPanModeActive,
      onViewportChange,
    ],
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Event listeners setup with optimized handling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use passive: false for wheel to prevent default and enable smooth zoom
    container.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });

    if (isPanning) {
      document.addEventListener("mousemove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleMouseUp, { passive: true });
      // Add touch event listeners for mobile
      document.addEventListener("touchmove", handleMouseMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleMouseUp, { passive: true });
    }

    return () => {
      container.removeEventListener("wheel", handleWheel);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleMouseMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleWheel, handleMouseMove, handleMouseUp, isPanning]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        cursor: appState.isPanModeActive
          ? isPanning
            ? "grabbing"
            : "grab"
          : "default",
        overflow: "hidden",
        // Optimize rendering performance
        willChange: appState.isPanModeActive ? "transform" : "auto",
        contain: "layout style paint",
        // Touch optimizations for mobile
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: appState.isPanModeActive ? "none" : "auto",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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

  // Fixed reference size for consistent card positioning across all screen sizes
  const REFERENCE_WIDTH = 1200;
  const REFERENCE_HEIGHT = 700;

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
      {
        title: "Liga Academica de Psiquiatria",
        githubUrl:
          "https://github.com/brcls/portifolio-monorepo/tree/main/apps/liga-academica",
        microfrontendUrl: "/microfrontend/liga-academica",
      },
    ];

    // Create cards with world coordinates
    architectureBlocks.forEach((block, index) => {
      const cardWidth = 280; // Increased from 220 to accommodate longer text
      // Special height for Main card (shorter since it has no microfrontend button)
      const cardHeight = block.title === "Main" ? 120 : 150; // Increased Main card height from 90 to 120

      let position: WorldCoordinates;

      // Calculate center based on reference size (fixed positions regardless of screen size)
      const centerX = REFERENCE_WIDTH / 2; // Use reference width for consistent positioning
      const centerY = REFERENCE_HEIGHT / 2; // Use reference height for consistent positioning

      if (block.title === "Main") {
        // Center card - dynamically centered based on container size
        position = { x: centerX, y: centerY - 50 };
      } else {
        // Arrange other cards in specific positions around the rectangle
        const otherCards = architectureBlocks.filter((b) => b.title !== "Main");
        const otherCardIndex = otherCards.findIndex(
          (b) => b.title === block.title,
        );

        // Define specific positions for each card around the rectangle (fixed positions)
        // Increased distances for better mobile spacing
        const positions = [
          // Top row
          { x: centerX - 450, y: centerY - 350 }, // Top-left
          { x: centerX, y: centerY - 350 }, // Top-center
          { x: centerX + 450, y: centerY - 350 }, // Top-right

          // Middle row (sides)
          { x: centerX - 550, y: centerY - 50 }, // Middle-left
          { x: centerX + 550, y: centerY - 50 }, // Middle-right

          // Bottom row
          { x: centerX - 450, y: centerY + 250 }, // Bottom-left
          { x: centerX, y: centerY + 250 }, // Bottom-center
          { x: centerX + 450, y: centerY + 250 }, // Bottom-right
        ];

        position = positions[otherCardIndex] || { x: centerX, y: centerY };
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
      viewport: { scale: 0.7, translateX: 0, translateY: 0 }, // Initial values, will be updated by resize observer with mobile detection
      cards,
      connections,
      selectedCards: new Set(),
      isDragging: false,
      isPanModeActive: false, // Disable pan mode by default
      dragState: null,
    };
  });

  // Container size monitoring (Excalidraw pattern)
  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setContainerSize({ width: offsetWidth, height: offsetHeight });

        // Detect mobile devices
        const isMobile = offsetWidth <= 768;

        // Update viewport translation for responsive centering
        const scale = isMobile ? 0.45 : 0.7; // Smaller scale for mobile

        // Calculate dynamic centering based on container size and scale
        const scaledWidth = REFERENCE_WIDTH * scale;
        const scaledHeight = REFERENCE_HEIGHT * scale;

        // Center the content in the available space
        const translateX = (offsetWidth - scaledWidth) / 2;
        const translateY = (offsetHeight - scaledHeight) / 2;

        setAppState((prev) => ({
          ...prev,
          viewport: {
            ...prev.viewport,
            scale: scale,
            translateX: translateX + (isMobile ? -60 : -75), // Removed Math.max to allow overflow centering
            translateY: translateY + (isMobile ? -30 : -20), // Removed Math.max to allow overflow centering
          },
        }));
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
      // Don't allow card dragging when pan mode is active
      if (appState.isPanModeActive) return;

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
    [appState.viewport, appState.cards, appState.isPanModeActive],
  );

  // Touch handling for cards (mobile support)
  const handleCardTouchStart = useCallback(
    (e: React.TouchEvent, cardId: string) => {
      // Don't allow card dragging when pan mode is active
      if (appState.isPanModeActive) return;

      e.preventDefault();
      e.stopPropagation();

      const container = containerRef.current;
      if (!container) return;

      const touch = e.touches[0];
      if (!touch) return;

      const containerRect = container.getBoundingClientRect();
      const worldPos = screenToWorld(
        { x: touch.clientX, y: touch.clientY },
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

      // Global touch event handlers for drag
      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();

        const touch = e.touches[0];
        if (!touch) return;

        const worldPos = screenToWorld(
          { x: touch.clientX, y: touch.clientY },
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

      const handleTouchEnd = () => {
        setAppState((prev) => ({
          ...prev,
          isDragging: false,
          dragState: null,
        }));

        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleTouchEnd);
    },
    [appState.viewport, appState.cards, appState.isPanModeActive],
  );

  // Viewport update handler with optimized rendering
  const handleViewportChange = useCallback((newViewport: ViewportState) => {
    setAppState((prev) => ({
      ...prev,
      viewport: newViewport,
    }));
  }, []);

  // Toggle pan mode
  const togglePanMode = useCallback(() => {
    setAppState((prev) => ({
      ...prev,
      isPanModeActive: !prev.isPanModeActive,
    }));
  }, []);

  // Zoom controls (Excalidraw style)
  const zoomIn = useCallback(() => {
    const newScale = getNormalizedZoom(
      appState.viewport.scale * (1 + ZOOM_STEP),
    );

    // Simple center-based zoom - maintain center position
    const scaleFactor = newScale / appState.viewport.scale;
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    const newViewport = {
      scale: newScale,
      translateX:
        centerX - (centerX - appState.viewport.translateX) * scaleFactor,
      translateY:
        centerY - (centerY - appState.viewport.translateY) * scaleFactor,
    };

    handleViewportChange(newViewport);
  }, [appState.viewport, handleViewportChange]);

  const zoomOut = useCallback(() => {
    const newScale = getNormalizedZoom(
      appState.viewport.scale * (1 - ZOOM_STEP),
    );

    // Simple center-based zoom - maintain center position
    const scaleFactor = newScale / appState.viewport.scale;
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    const newViewport = {
      scale: newScale,
      translateX:
        centerX - (centerX - appState.viewport.translateX) * scaleFactor,
      translateY:
        centerY - (centerY - appState.viewport.translateY) * scaleFactor,
    };

    handleViewportChange(newViewport);
  }, [appState.viewport, handleViewportChange]);

  const resetView = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { offsetWidth, offsetHeight } = container;

    // Detect mobile devices
    const isMobile = offsetWidth <= 768;

    // Use the same logic as the initial setup
    const scale = isMobile ? 0.45 : 0.7;

    // Calculate dynamic centering based on container size and scale
    const scaledWidth = REFERENCE_WIDTH * scale;
    const scaledHeight = REFERENCE_HEIGHT * scale;

    // Center the content in the available space
    const translateX = (offsetWidth - scaledWidth) / 2;
    const translateY = (offsetHeight - scaledHeight) / 2;

    const initialViewport = {
      scale: scale,
      translateX: translateX + (isMobile ? -60 : -75),
      translateY: translateY + (isMobile ? -30 : -20),
    };

    handleViewportChange(initialViewport);
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
        width: "90vw",
        height: "90vh",
        minHeight: "400px", // Minimum height for very small screens
        maxWidth: "90vw",
        maxHeight: "90vh",
        // Mobile touch optimizations
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "none", // Prevent default touch behaviors
      }}
    >
      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={togglePanMode}
          className={cn(
            "relative transform rounded-lg border p-3 backdrop-blur-sm transition-all duration-300",
            appState.isPanModeActive
              ? "scale-110 border-green-400 bg-green-500/30 text-green-100 shadow-lg shadow-green-500/30"
              : "border-purple-500/50 bg-purple-500/20 text-purple-300 hover:scale-105 hover:bg-purple-500/30 hover:text-purple-100",
          )}
          title={
            appState.isPanModeActive
              ? "Disable Pan/Zoom Mode"
              : "Enable Pan/Zoom Mode"
          }
        >
          <HandIcon className="h-5 w-5" />
          {appState.isPanModeActive && (
            <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-green-400"></div>
          )}
        </button>
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

      {/* Mode Status Indicator */}
      {appState.isPanModeActive && (
        <div className="absolute left-1/2 top-4 z-50 -translate-x-1/2 transform rounded-lg border border-green-400 bg-green-500/30 px-4 py-2 shadow-lg shadow-green-500/20 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
            <Text className="text-sm font-medium text-green-100">
              Pan & Zoom Mode Active
            </Text>
            <HandIcon className="h-4 w-4 text-green-300" />
          </div>
        </div>
      )}

      {/* Scale Indicator */}
      {appState.viewport.scale !== 1 && (
        <div className="absolute right-2 top-2 z-50 rounded-lg border border-purple-500/50 bg-purple-500/20 px-2 py-1 backdrop-blur-sm">
          <Text className="font-mono text-xs text-purple-300">
            {Math.round(appState.viewport.scale * 100)}%
          </Text>
        </div>
      )}

      {/* Instructions */}
      <div
        className={cn(
          "absolute bottom-2 left-2 z-50 rounded-lg border px-3 py-2 backdrop-blur-sm transition-all duration-300",
          appState.isPanModeActive
            ? "border-green-400/50 bg-green-500/20"
            : "border-purple-500/50 bg-purple-500/20",
        )}
      >
        <Text
          className={cn(
            "text-xs font-medium",
            appState.isPanModeActive ? "text-green-200" : "text-purple-300",
          )}
        >
          {appState.isPanModeActive
            ? "🖱️ Pan & Zoom Active: Drag to explore • Pinch/Scroll: Zoom • Card positions are fixed"
            : "✋ Card Mode: Drag Cards to Move • Click Hand Icon to Enable Pan/Zoom"}
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
            // Optimize for transform animations
            willChange:
              appState.isPanModeActive || appState.isDragging
                ? "transform"
                : "auto",
            backfaceVisibility: "hidden",
            perspective: 1000,
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
              onTouchStart={handleCardTouchStart}
            />
          ))}
        </div>
      </ViewportLayer>
    </div>
  );
}
