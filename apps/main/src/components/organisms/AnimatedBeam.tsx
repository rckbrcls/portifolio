"use client";

import React, { forwardRef, useRef } from "react";
import { Text } from "../atoms/Text";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import {
  SiBun,
  SiFlask,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSolid,
  SiWebpack,
} from "react-icons/si";
import { Computer } from "lucide-react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "border-1 border-border z-10 flex size-12 items-center justify-center rounded-full border-zinc-500/30 bg-zinc-800 p-3",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function AnimatedBeamArchitecture({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const divRefComputer = useRef<HTMLDivElement>(null);
  const divRefFlask = useRef<HTMLDivElement>(null);
  const divRefNode = useRef<HTMLDivElement>(null);
  const divRefBun = useRef<HTMLDivElement>(null);
  const divRefSolid = useRef<HTMLDivElement>(null);
  const divRefReact = useRef<HTMLDivElement>(null);
  const divRefNextJS = useRef<HTMLDivElement>(null);
  const divRefWebpack = useRef<HTMLDivElement>(null);
  const divRefMain = useRef<HTMLDivElement>(null);
  const div9Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "bg-background relative flex w-full items-center justify-center",
        className,
      )}
      ref={containerRef}
    >
      <div className="flex size-full flex-row items-center justify-between gap-5 p-14 max-md:p-4">
        <div className="flex flex-col justify-center gap-20 max-md:gap-10">
          <Circle className="size-20 max-md:size-12" ref={divRefComputer}>
            <Computer size={50} />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-20 max-md:gap-10">
          <Circle className="size-20 max-md:size-12" ref={divRefFlask}>
            <SiFlask size={50} />
          </Circle>
          <Circle className="size-20 max-md:size-12" ref={divRefNode}>
            <SiNodedotjs size={50} />
          </Circle>
          <Circle className="size-20 max-md:size-12" ref={divRefBun}>
            <SiBun size={50} />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-20 max-md:gap-10">
          <Circle className="size-20 max-md:size-12" ref={divRefSolid}>
            <SiSolid size={50} />
          </Circle>
          <Circle className="size-20 max-md:size-12" ref={divRefReact}>
            <SiReact size={50} />
          </Circle>
          <Circle className="size-20 max-md:size-12" ref={divRefNextJS}>
            <SiNextdotjs size={50} />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle className="size-20 max-md:size-12" ref={divRefWebpack}>
            <SiWebpack size={50} />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle className="size-20 max-md:size-12" ref={divRefMain}>
            <Text className="font-bold max-md:text-xs">main</Text>
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefComputer}
        toRef={divRefFlask}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefComputer}
        toRef={divRefNode}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefComputer}
        toRef={divRefBun}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefFlask}
        toRef={divRefSolid}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefNode}
        toRef={divRefReact}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefBun}
        toRef={divRefNextJS}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefSolid}
        toRef={divRefWebpack}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefReact}
        toRef={divRefWebpack}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefNextJS}
        toRef={divRefWebpack}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={divRefWebpack}
        toRef={divRefMain}
      />
    </div>
  );
}
