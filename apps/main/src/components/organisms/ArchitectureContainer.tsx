"use client";

import React, { useRef, forwardRef, useState, useEffect } from "react";
import { Text } from "../atoms/Text";
import { cn } from "@/lib/utils";
import { NativeDragLine } from "@/components/ui/native-drag-line";
import { useDraggable } from "@/hooks/use-draggable";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { BiSolidComponent } from "react-icons/bi";

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
      // Dimensões estimadas do card baseadas no CSS
      const cardWidth = 170; // Aproximadamente com padding
      const cardHeight = 120; // Aproximadamente com padding

      return {
        left: -initialPosition.left, // Permite voltar à posição original
        top: -initialPosition.top, // Permite voltar à posição original
        right: containerSize.width - initialPosition.left - cardWidth,
        bottom: containerSize.height - initialPosition.top - cardHeight,
      };
    };

    const { ref, isDragging, position } = useDraggable({
      // Bounds dinâmicos calculados para cada card
      bounds: calculateBounds(),
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

  return (
    <div
      className={cn(
        "bg-background glass-dark relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-xl",
        className,
      )}
      ref={containerRef}
      style={{
        minWidth: 850, // Largura mínima para que não quebre muito pequeno
        minHeight: 620, // Altura mínima ajustada para melhor proporção
        height: "85vh", // Altura responsiva otimizada
        maxHeight: 720, // Altura máxima para controlar proporções
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

      {/* Renderize linhas nativas de cada bloco para o central */}
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
    </div>
  );
}
