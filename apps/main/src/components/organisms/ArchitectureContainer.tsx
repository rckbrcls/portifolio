"use client";

import React, {
  useRef,
  forwardRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Text } from "../atoms/Text";
import { cn } from "@/lib/utils";
import { NativeDragLine } from "@/components/ui/native-drag-line";
import { useDraggable } from "@/hooks/use-draggable";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { BiSolidComponent } from "react-icons/bi";
import { ZoomInIcon, ZoomOutIcon } from "@radix-ui/react-icons";

// Card component for architecture blocks
const ArchitectureCard = React.forwardRef<
  HTMLDivElement,
  {
    title: string;
    githubUrl: string;
    microfrontendUrl?: string;
  }
>(({ title, githubUrl, microfrontendUrl }, ref) => {
  return (
    <div
      className={
        "glass-dark z-20 flex items-center justify-center rounded-lg bg-zinc-950/50 p-3"
      }
      ref={ref}
    >
      <div className="flex w-full flex-col items-center gap-2 p-2">
        <Text className="text-nowrap font-bold">{title}</Text>
        <a
          className="glass-dark flex w-full items-center justify-center gap-2 rounded p-2 transition duration-500 hover:scale-105"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon />
          <Text className="w-full md:text-sm">Codebase</Text>
        </a>
        {microfrontendUrl && (
          <a
            className="glass-dark flex w-full items-center justify-center gap-2 rounded p-2 transition duration-500 hover:scale-105"
            href={microfrontendUrl}
          >
            <BiSolidComponent />
            <Text className="w-full md:text-sm">Microfrontend</Text>
          </a>
        )}
      </div>
    </div>
  );
});

ArchitectureCard.displayName = "ArchitectureCard";

// Draggable wrapper usando nossa solução nativa ultra robusta
const DraggableArchitectureCard = forwardRef<
  HTMLDivElement,
  {
    title: string;
    githubUrl: string;
    microfrontendUrl?: string;
    initialPosition: { left: number; top: number };
    containerRef: React.RefObject<HTMLDivElement>;
    onPositionChange?: (title: string, x: number, y: number) => void;
  }
>(
  (
    {
      title,
      githubUrl,
      microfrontendUrl,
      initialPosition,
      containerRef,
      onPositionChange,
    },
    forwardedRef,
  ) => {
    const [containerSize, setContainerSize] = useState({
      width: 850,
      height: 600,
    });

    // Monitorar mudanças no tamanho do container
    useEffect(() => {
      const updateContainerSize = () => {
        if (containerRef.current) {
          const { offsetWidth, offsetHeight } = containerRef.current;
          setContainerSize({ width: offsetWidth, height: offsetHeight });
        }
      };

      // Atualizar imediatamente
      updateContainerSize();

      // Observar mudanças de tamanho
      const resizeObserver = new ResizeObserver(updateContainerSize);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, [containerRef]);

    // Calcular bounds dinâmicos baseados no container REAL
    const calculateBounds = () => {
      // Remover bounds - permitir drag livre
      return undefined;
    };

    const { ref, isDragging, position } = useDraggable({
      // Sem bounds - drag livre
      bounds: undefined,
      onDragStart: () => {
        console.log(`Started dragging ${title}`);
      },
      onDrag: (x, y) => {
        // Atualizar a posição do card em tempo real
        if (onPositionChange) {
          onPositionChange(
            title,
            initialPosition.left + x,
            initialPosition.top + y,
          );
        }
      },
      onDragEnd: () => {
        const finalX = initialPosition.left + position.x;
        const finalY = initialPosition.top + position.y;
        console.log(`Stopped dragging ${title} at (${finalX}, ${finalY})`);

        // Atualizar a posição final
        if (onPositionChange) {
          onPositionChange(title, finalX, finalY);
        }
      },
    });

    // Combinar refs de forma robusta
    const setRefs = (element: HTMLDivElement | null) => {
      if (typeof forwardedRef === "function") {
        forwardedRef(element);
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }
      (ref as any).current = element;
    };

    const currentPosition = {
      x: initialPosition.left + position.x,
      y: initialPosition.top + position.y,
    };

    return (
      <div
        ref={setRefs}
        style={{
          position: "absolute",
          left: initialPosition.left,
          top: initialPosition.top,
          zIndex: isDragging ? 30 : 10,
        }}
        data-draggable="true"
        className={cn(
          "transition-shadow duration-200",
          isDragging ? "scale-105 shadow-xl" : "",
        )}
      >
        <ArchitectureCard
          title={title}
          githubUrl={githubUrl}
          microfrontendUrl={microfrontendUrl}
        />
      </div>
    );
  },
);

DraggableArchitectureCard.displayName = "DraggableArchitectureCard";

interface ArchitectureBlock {
  title: string;
  githubUrl: string;
  microfrontendUrl?: string;
}

export function ArchitectureContainer({ className }: { className?: string }) {
  // Estado para controle de zoom e pan
  const [isActive, setIsActive] = useState(false);
  const [scale, setScale] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

  // Defina os blocos da arquitetura aqui
  const architectureBlocks: ArchitectureBlock[] = [
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
      title: "Liga Acadêmica de Psicologia",
      githubUrl:
        "https://github.com/brcls/portifolio-monorepo/tree/main/apps/liga-academica-psicologia",
      microfrontendUrl: "/microfrontend/liga-academica-psicologia",
    },
  ];

  // Encontre o índice do bloco central (Main)
  const mainIdx = architectureBlocks.findIndex((b) => b.title === "Main");
  const outerBlocks = architectureBlocks.filter((_, idx) => idx !== mainIdx);

  // Crie refs para todos os blocos
  const blockRefs = architectureBlocks.map(() => useRef<HTMLDivElement>(null));
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({
    width: 850,
    height: 600,
  });

  // Estado para rastrear posições atuais de cada card (apenas para desenvolvimento)
  const [cardPositions, setCardPositions] = useState<
    Record<string, { x: number; y: number }>
  >({});

  // Monitorar mudanças no tamanho do container principal
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

  // Calcular posições dinâmicas baseadas no tamanho do container
  const calculateCenterAndPositions = () => {
    const centerX = containerSize.width / 2;
    const centerY = containerSize.height / 2;

    // Margens diferenciadas para topo e parte inferior
    const marginX = Math.max(20, containerSize.width * 0.02); // Mínimo 20px ou 3% da largura
    const marginTop = Math.max(20, containerSize.height * 0.03); // Margem menor no topo: 20px ou 3%
    const marginBottom = Math.max(40, containerSize.height * 0.09); // Margem maior na parte inferior: 40px ou 9%

    // Dimensões dos cards para cálculos precisos
    const cardWidth = 170;
    const cardHeight = 120;

    // Posições dinâmicas baseadas em proporções do container
    const dynamicPositions: Record<string, { x: number; y: number }> = {
      // Linha superior: 3 cards distribuídos horizontalmente (margem menor no topo)
      "Simple Store": {
        x: marginX,
        y: marginTop,
      },
      "Liga Acadêmica de Psicologia": {
        x: centerX - cardWidth / 1.05, // Centralizado horizontalmente
        y: marginTop,
      },
      "Alan Turing": {
        x: containerSize.width - marginX - cardWidth,
        y: marginTop,
      },

      // Linha do meio: 2 cards nas laterais
      RGBWallet: {
        x: marginX,
        y: centerY - cardHeight / 2, // Centralizado verticalmente
      },
      Joystick: {
        x: containerSize.width - marginX - cardWidth,
        y: centerY - cardHeight / 2,
      },

      // Linha inferior: 3 cards distribuídos horizontalmente (margem maior na parte inferior)
      "Electoral System": {
        x: marginX,
        y: containerSize.height - marginBottom - cardHeight,
      },
      "Video Project Manage": {
        x: centerX - cardWidth / 1.35, // Centralizado horizontalmente
        y: containerSize.height - marginBottom - cardHeight,
      },
      "Secret Santa": {
        x: containerSize.width - marginX - cardWidth,
        y: containerSize.height - marginBottom - cardHeight,
      },
    };

    // Usar posições dinâmicas para cada card
    const positions = outerBlocks.map((block) => {
      const dynamicPos = dynamicPositions[block.title];
      return { left: dynamicPos.x, top: dynamicPos.y };
    });

    return {
      center: { left: centerX - cardWidth / 2, top: centerY - cardHeight / 2 }, // Centralizar o card principal
      positions,
    };
  };

  const { center, positions: initialCardPositions } =
    calculateCenterAndPositions();

  // Handlers para zoom e pan
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isActive) return;

      e.preventDefault();
      e.stopPropagation();

      if (e.ctrlKey || e.metaKey) {
        // Zoom
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.max(0.3, Math.min(3, scale * delta));

        // Calcular zoom em relação ao cursor
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          // Ajustar pan offset para zoom no cursor
          const scaleDiff = newScale - scale;
          const newPanX =
            panOffset.x - ((mouseX - rect.width / 2) * scaleDiff) / scale;
          const newPanY =
            panOffset.y - ((mouseY - rect.height / 2) * scaleDiff) / scale;

          setPanOffset({ x: newPanX, y: newPanY });
        }

        setScale(newScale);
      } else {
        // Pan com scroll wheel
        setPanOffset((prev) => ({
          x: prev.x - e.deltaX,
          y: prev.y - e.deltaY,
        }));
      }
    },
    [isActive, scale, panOffset],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isActive || e.button !== 1) return; // Apenas botão do meio

      e.preventDefault();
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    },
    [isActive],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isPanning) return;

      e.preventDefault();
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;

      setPanOffset((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));

      setLastPanPoint({ x: e.clientX, y: e.clientY });
    },
    [isPanning, lastPanPoint],
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Event listeners para zoom e pan
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

  // Reset zoom e pan
  const resetView = () => {
    setScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Funções de zoom
  const zoomIn = () => {
    const newScale = Math.min(3, scale * 1.2);
    setScale(newScale);
  };

  const zoomOut = () => {
    const newScale = Math.max(0.3, scale * 0.8);
    setScale(newScale);
  };

  // Ref para o container que recebe as transformações
  const transformedContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "bg-background glass-dark relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-xl transition-all duration-200",
        isActive
          ? "border-2 border-purple-500/50 shadow-lg shadow-purple-500/20"
          : "border border-zinc-700/50",
        className,
      )}
      ref={containerRef}
      style={{
        minWidth: 850,
        minHeight: 620,
        height: "90vh",
        maxHeight: 720,
        cursor: isPanning ? "grabbing" : isActive ? "grab" : "default",
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => {
        setIsActive(false);
        setIsPanning(false);
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Indicador de estado ativo */}
      {isActive && (
        <div className="absolute left-2 top-2 z-50 flex items-center gap-2 rounded-lg border border-purple-500/50 bg-purple-500/20 px-3 py-1 backdrop-blur-sm">
          <div className="h-2 w-2 animate-pulse rounded-full bg-purple-500"></div>
          <Text className="text-xs font-medium text-purple-300">
            Zoom/Pan Ativo • Ctrl+Scroll para zoom • Scroll do meio para pan
          </Text>
          <button
            onClick={resetView}
            className="ml-2 text-purple-300 transition-colors hover:text-purple-100"
            title="Reset View"
          >
            <ZoomOutIcon className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Indicador de escala */}
      {isActive && scale !== 1 && (
        <div className="absolute right-2 top-2 z-50 rounded-lg border border-purple-500/50 bg-purple-500/20 px-2 py-1 backdrop-blur-sm">
          <Text className="font-mono text-xs text-purple-300">
            {Math.round(scale * 100)}%
          </Text>
        </div>
      )}

      {/* Controles de Zoom */}
      {isActive && (
        <div className="absolute bottom-4 right-4 z-50 flex flex-col gap-2">
          <button
            onClick={zoomIn}
            className="rounded-lg border border-purple-500/50 bg-purple-500/20 p-2 text-purple-300 backdrop-blur-sm transition-all duration-200 hover:bg-purple-500/30 hover:text-purple-100"
            title="Zoom In"
            disabled={scale >= 3}
          >
            <ZoomInIcon className="h-4 w-4" />
          </button>
          <button
            onClick={zoomOut}
            className="rounded-lg border border-purple-500/50 bg-purple-500/20 p-2 text-purple-300 backdrop-blur-sm transition-all duration-200 hover:bg-purple-500/30 hover:text-purple-100"
            title="Zoom Out"
            disabled={scale <= 0.3}
          >
            <ZoomOutIcon className="h-4 w-4" />
          </button>
          <button
            onClick={resetView}
            className="rounded-lg border border-purple-500/50 bg-purple-500/20 p-2 text-purple-300 backdrop-blur-sm transition-all duration-200 hover:bg-purple-500/30 hover:text-purple-100"
            title="Reset Zoom"
          >
            <div className="flex h-4 w-4 items-center justify-center">
              <Text className="text-xs font-bold">1:1</Text>
            </div>
          </button>
        </div>
      )}

      {/* Renderize linhas FORA do container transformado */}
      {outerBlocks.map((block, i) => {
        const realIdx = architectureBlocks.findIndex(
          (b) => b.title === block.title,
        );
        return (
          <NativeDragLine
            key={block.title + "-line"}
            containerRef={containerRef}
            fromRef={blockRefs[realIdx]}
            toRef={blockRefs[mainIdx]}
            color="#9c40ff"
            thickness={1}
          />
        );
      })}

      {/* Container com TUDO dentro - aplicando zoom/pan em volta de tudo */}
      <div
        ref={transformedContainerRef}
        style={{
          transform: `scale(${scale}) translate(${panOffset.x}px, ${panOffset.y}px)`,
          transformOrigin: "center center",
          transition: isPanning ? "none" : "transform 0.1s ease-out",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Renderiza o bloco central */}
        <div
          style={{
            position: "absolute",
            left: center.left,
            top: center.top,
            zIndex: 20,
          }}
        >
          <ArchitectureCard
            key={architectureBlocks[mainIdx].title}
            title={architectureBlocks[mainIdx].title}
            githubUrl={architectureBlocks[mainIdx].githubUrl}
            ref={blockRefs[mainIdx]}
          />
        </div>

        {/* Renderiza os blocos ao redor com drag and drop nativo */}
        {outerBlocks.map((block, i) => {
          const realIdx = architectureBlocks.findIndex(
            (b) => b.title === block.title,
          );
          const pos = initialCardPositions[i] || { left: 0, top: 0 };
          return (
            <DraggableArchitectureCard
              key={block.title}
              title={block.title}
              githubUrl={block.githubUrl}
              microfrontendUrl={block.microfrontendUrl}
              initialPosition={pos}
              containerRef={containerRef}
              ref={blockRefs[realIdx]}
              onPositionChange={(title, x, y) => {
                setCardPositions((prev) => ({
                  ...prev,
                  [title]: { x, y },
                }));
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
