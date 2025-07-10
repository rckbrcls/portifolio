"use client";

import React, { useEffect, useRef, useState, RefObject } from "react";
import { Text } from "../atoms/Text";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { BiSolidComponent } from "react-icons/bi";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  useDraggable,
  DragOverlay,
  closestCenter,
} from "@dnd-kit/core";

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
        "glass-dark z-10 flex items-center justify-center rounded-lg p-3"
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

// Draggable wrapper for architecture cards
const DraggableArchitectureCard = React.forwardRef<
  HTMLDivElement,
  {
    id: string;
    title: string;
    githubUrl: string;
    microfrontendUrl?: string;
    position: { left: number; top: number };
    isDragging?: boolean;
  }
>(({ id, title, githubUrl, microfrontendUrl, position, isDragging }, ref) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: dndIsDragging,
  } = useDraggable({
    id,
  });

  const style = {
    position: "absolute" as const,
    left: position.left,
    top: position.top,
    zIndex: isDragging || dndIsDragging ? 30 : 10,
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        if (ref && typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "cursor-grab active:cursor-grabbing",
        isDragging || dndIsDragging ? "opacity-50" : "",
      )}
    >
      <ArchitectureCard
        title={title}
        githubUrl={githubUrl}
        microfrontendUrl={microfrontendUrl}
      />
    </div>
  );
});

DraggableArchitectureCard.displayName = "DraggableArchitectureCard";

// AnimatedBeam wrapper that handles drag offset
const AnimatedBeamWithDrag: React.FC<{
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature: number;
  blockTitle: string;
  activeId: string | null;
  dragOffset: { x: number; y: number };
}> = ({
  containerRef,
  fromRef,
  toRef,
  curvature,
  blockTitle,
  activeId,
  dragOffset,
}) => {
  const isDragging = activeId === `draggable-${blockTitle}`;

  return (
    <AnimatedBeam
      containerRef={containerRef}
      fromRef={fromRef}
      toRef={toRef}
      curvature={curvature}
      startXOffset={isDragging ? dragOffset.x : 0}
      startYOffset={isDragging ? dragOffset.y : 0}
      key={`${blockTitle}-beam-${isDragging ? "dragging" : "static"}`}
    />
  );
};

interface ArchitectureBlock {
  title: string;
  githubUrl: string;
  microfrontendUrl?: string;
}

interface BeamConnection {
  from: number; // índice do bloco origem
  to: number; // índice do bloco destino
}

export function AnimatedBeamArchitecture({
  className,
}: {
  className?: string;
}) {
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
      title: "Liga Acadêmica de Psiquiatria",
      githubUrl: "https://github.com/rckbrcls/academic-league-of-psychiatry",
      microfrontendUrl: "/microfrontend/liga-academica",
    },
    // Adicione mais blocos aqui conforme necessário
  ];

  // Encontre o índice do bloco central (Main)
  const mainIdx = architectureBlocks.findIndex((b) => b.title === "Main");
  const outerBlocks = architectureBlocks.filter((_, idx) => idx !== mainIdx);

  // Crie refs para todos os blocos
  const blockRefs = architectureBlocks.map(() => useRef<HTMLDivElement>(null));
  const containerRef = useRef<HTMLDivElement>(null);
  const [curvature, setCurvature] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Estado para armazenar as posições dos blocos
  const initialCardPositions = [
    { left: -150, top: 0 }, // Simple Store
    { left: -250, top: 200 }, // Video Project Manage
    { left: 550, top: 0 }, // Alan Turing
    { left: 600, top: 200 }, // Joystick
    { left: 550, top: 400 }, // Secret Santa
    { left: 200, top: 400 }, // Electoral System
    { left: -150, top: 400 }, // RGBWallet
    { left: 150, top: 0 }, // Liga Acadêmica de Psiquiatria
  ];

  const [cardPositions, setCardPositions] = useState(initialCardPositions);

  useEffect(() => {
    const width = window.innerWidth;
    if (width > 1200) {
      setCurvature(0);
    } else if (width > 768) {
      setCurvature(120);
    } else {
      setCurvature(80);
    }
  }, []);

  // Parâmetros do "retângulo polar"
  const radiusX = 380; // Largura do retângulo (lateral) - aumentado
  const radiusY = 240; // Altura do retângulo (topo/baixo) - aumentado
  const center = 300; // px (ajuste conforme necessário)

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const { delta } = event;
    if (delta) {
      setDragOffset({ x: delta.x, y: delta.y });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    if (active && delta) {
      const blockIndex = outerBlocks.findIndex(
        (block) => `draggable-${block.title}` === active.id,
      );

      if (blockIndex !== -1) {
        setCardPositions((prev) => {
          const newPositions = [...prev];
          newPositions[blockIndex] = {
            left: prev[blockIndex].left + delta.x,
            top: prev[blockIndex].top + delta.y,
          };
          return newPositions;
        });
      }
    }

    setActiveId(null);
    setDragOffset({ x: 0, y: 0 });
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      <div
        className={cn(
          "bg-background relative mx-auto flex h-[600px] w-[600px] items-center justify-center",
          className,
        )}
        ref={containerRef}
        style={{
          minHeight: 600,
          minWidth: 600,
        }}
      >
        {/* Renderiza o bloco central */}
        <div
          style={{
            position: "absolute",
            left: center - 80,
            top: center - 80,
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

        {/* Renderiza os blocos ao redor com drag and drop */}
        {outerBlocks.map((block, i) => {
          // Descobre o índice real do bloco
          const realIdx = architectureBlocks.findIndex(
            (b) => b.title === block.title,
          );
          const pos = cardPositions[i] || { left: 0, top: 0 };
          return (
            <DraggableArchitectureCard
              key={block.title}
              id={`draggable-${block.title}`}
              title={block.title}
              githubUrl={block.githubUrl}
              microfrontendUrl={block.microfrontendUrl}
              position={pos}
              isDragging={activeId === `draggable-${block.title}`}
              ref={blockRefs[realIdx]}
            />
          );
        })}

        {/* Renderize AnimatedBeam de cada bloco para o central */}
        {outerBlocks.map((block, i) => {
          const realIdx = architectureBlocks.findIndex(
            (b) => b.title === block.title,
          );
          return (
            <AnimatedBeamWithDrag
              key={block.title + "-beam"}
              containerRef={containerRef}
              fromRef={blockRefs[realIdx]}
              toRef={blockRefs[mainIdx]}
              curvature={curvature}
              blockTitle={block.title}
              activeId={activeId}
              dragOffset={dragOffset}
            />
          );
        })}

        {/* DragOverlay para mostrar o item sendo arrastado */}
        <DragOverlay>
          {activeId ? (
            <div className="opacity-75">
              {(() => {
                const draggedBlock = outerBlocks.find(
                  (block) => `draggable-${block.title}` === activeId,
                );
                return draggedBlock ? (
                  <ArchitectureCard
                    title={draggedBlock.title}
                    githubUrl={draggedBlock.githubUrl}
                    microfrontendUrl={draggedBlock.microfrontendUrl}
                  />
                ) : null;
              })()}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
