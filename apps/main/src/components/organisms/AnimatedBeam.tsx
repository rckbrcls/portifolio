"use client";

import React, { useEffect, useRef, useState, RefObject } from "react";
import { Text } from "../atoms/Text";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

// Card component for architecture blocks
function ArchitectureCard({
  title,
  githubUrl,
  cardRef,
}: {
  title: string;
  githubUrl: string;
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
        <Text className="font-bold">{title}</Text>
        <a
          className="glass-dark flex w-full items-center justify-center gap-2 rounded-lg p-2 transition duration-500 hover:scale-105"
          href={githubUrl}
        >
          <GitHubLogoIcon />
          <Text className="w-full md:text-sm">Codebase</Text>
        </a>
      </div>
    </div>
  );
}

export function AnimatedBeamArchitecture({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const divRefSimpleStore = useRef<HTMLDivElement>(null);
  const divRefMain = useRef<HTMLDivElement>(null);
  const [curvature, setCurvature] = useState(170);

  useEffect(() => {
    const width = window.innerWidth;
    if (width > 1200) {
      setCurvature(170);
    } else if (width > 768) {
      setCurvature(120);
    } else {
      setCurvature(80);
    }
  }, []);

  return (
    <div
      className={cn(
        "bg-background relative flex w-11/12 items-center justify-center",
        className,
      )}
      ref={containerRef}
    >
      <div className="flex size-full flex-row items-center justify-between gap-2 max-md:p-4">
        <div className="flex flex-col justify-center gap-32 max-md:gap-10">
          <ArchitectureCard
            title="Simple Store"
            githubUrl="https://github.com/your-repo"
            cardRef={divRefSimpleStore}
          />
          <ArchitectureCard
            title="Main"
            githubUrl="https://github.com/your-repo"
            cardRef={divRefMain}
          />
        </div>
      </div>
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefSimpleStore}
        toRef={divRefMain}
        curvature={curvature}
      />
    </div>
  );
}
