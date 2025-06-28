"use client";

import React, { useEffect, useRef, useState, RefObject } from "react";
import { Text } from "../atoms/Text";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { BiSolidComponent } from "react-icons/bi";

// Card component for architecture blocks
function ArchitectureCard({
  title,
  githubUrl,
  microfrontendUrl,
  cardRef,
}: {
  title: string;
  githubUrl: string;
  microfrontendUrl?: string;
  cardRef: RefObject<HTMLDivElement>;
}) {
  return (
    <div
      className={
        "glass-dark z-10 flex items-center justify-center rounded-lg p-3"
      }
      ref={cardRef}
    >
      <div className="flex w-full flex-col items-center gap-2 p-2">
        <Text className="text-nowrap font-bold">{title}</Text>
        <a
          className="glass-dark flex w-full items-center justify-center gap-2 rounded-lg p-2 transition duration-500 hover:scale-105"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon />
          <Text className="w-full md:text-sm">Codebase</Text>
        </a>
        {microfrontendUrl && (
          <a
            className="glass-dark flex w-full items-center justify-center gap-2 rounded-lg p-2 transition duration-500 hover:scale-105"
            href={microfrontendUrl}
          >
            <BiSolidComponent />
            <Text className="w-full md:text-sm">Microfrontend</Text>
          </a>
        )}
      </div>
    </div>
  );
}

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

  return (
    <div
      className={cn(
        "bg-background relative mx-auto flex h-[600px] w-[600px] items-center justify-center",
        className,
      )}
      ref={containerRef}
      style={{ minHeight: 600, minWidth: 600 }}
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
          cardRef={blockRefs[mainIdx]}
        />
      </div>
      {/* Renderiza os blocos ao redor em formato retangular */}
      {outerBlocks.map((block, i) => {
        const angle = (2 * Math.PI * i) / outerBlocks.length;
        // Usa raio X para laterais e raio Y para topo/baixo
        const x = center + radiusX * Math.cos(angle) - 80;
        const y = center + radiusY * Math.sin(angle) - 80;
        // Descobre o índice real do bloco
        const realIdx = architectureBlocks.findIndex(
          (b) => b.title === block.title,
        );
        return (
          <div
            key={block.title}
            style={{
              position: "absolute",
              left: x,
              top: y,
              zIndex: 10,
            }}
          >
            <ArchitectureCard
              title={block.title}
              githubUrl={block.githubUrl}
              microfrontendUrl={block.microfrontendUrl}
              cardRef={blockRefs[realIdx]}
            />
          </div>
        );
      })}
      {/* Renderize AnimatedBeam de cada bloco para o central */}
      {outerBlocks.map((block, i) => {
        const realIdx = architectureBlocks.findIndex(
          (b) => b.title === block.title,
        );
        return (
          <AnimatedBeam
            key={block.title + "-beam"}
            containerRef={containerRef}
            fromRef={blockRefs[realIdx]}
            toRef={blockRefs[mainIdx]}
            curvature={curvature}
          />
        );
      })}
    </div>
  );
}
