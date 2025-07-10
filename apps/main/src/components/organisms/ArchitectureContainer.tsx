"use client";

import React, { useRef, forwardRef } from "react";
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

// Draggable wrapper usando nossa solução nativa
const DraggableArchitectureCard = forwardRef<
  HTMLDivElement,
  {
    title: string;
    githubUrl: string;
    microfrontendUrl?: string;
    initialPosition: { left: number; top: number };
  }
>(({ title, githubUrl, microfrontendUrl, initialPosition }, forwardedRef) => {
  const { ref, isDragging } = useDraggable();

  // Combinar refs
  const setRefs = (element: HTMLDivElement | null) => {
    if (typeof forwardedRef === "function") {
      forwardedRef(element);
    } else if (forwardedRef) {
      forwardedRef.current = element;
    }
    (ref as any).current = element;
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
});

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
  ];

  // Encontre o índice do bloco central (Main)
  const mainIdx = architectureBlocks.findIndex((b) => b.title === "Main");
  const outerBlocks = architectureBlocks.filter((_, idx) => idx !== mainIdx);

  // Crie refs para todos os blocos
  const blockRefs = architectureBlocks.map(() => useRef<HTMLDivElement>(null));
  const containerRef = useRef<HTMLDivElement>(null);

  // Posições iniciais dos cards em formato circular
  const initialCardPositions = [
    { left: 100, top: 50 }, // Simple Store
    { left: 50, top: 250 }, // Video Project Manage
    { left: 700, top: 50 }, // Alan Turing
    { left: 750, top: 250 }, // Joystick
    { left: 700, top: 450 }, // Secret Santa
    { left: 400, top: 500 }, // Electoral System
    { left: 100, top: 450 }, // RGBWallet
  ];

  const center = { left: 375, top: 275 }; // Posição do card central

  return (
    <div
      className={cn(
        "bg-background relative mx-auto flex h-[600px] w-[850px] items-center justify-center",
        className,
      )}
      ref={containerRef}
      style={{
        minHeight: 600,
        minWidth: 850,
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
            ref={blockRefs[realIdx]}
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
            thickness={2}
          />
        );
      })}
    </div>
  );
}
