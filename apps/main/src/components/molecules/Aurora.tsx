// @ts-nocheck
"use client";
import { useState, memo, lazy, Suspense } from "react";
import { twMerge } from "tailwind-merge";

interface IAuroraProps {
  dark?: boolean;
}

// Lazy load the heavy MeshGradientRenderer
const MeshGradientRenderer = lazy(() =>
  import("@johnn-e/react-mesh-gradient").then((module) => ({
    default: module.MeshGradientRenderer,
  })),
);

// Fallback component while MeshGradient loads
const AuroraFallback = ({
  dark,
  position,
}: {
  dark: boolean;
  position: string;
}) => (
  <div className={twMerge("left-0 top-0 -z-10 min-h-svh w-full", position)}>
    <div
      className="h-full w-full"
      style={{
        background: dark
          ? "linear-gradient(45deg, #000, #222, #444)"
          : "linear-gradient(45deg, #d500f9, #6366f1, #ec4899, #a855f7, #3b82f6)",
      }}
    />
  </div>
);

function Aurora({ dark = false }: IAuroraProps) {
  const palettes = dark
    ? ["#000", "#222", "#444", "#666", "#888"]
    : ["#d500f9", "#6366f1", "#ec4899", "#a855f7", "#3b82f6"];

  const position = dark ? "fixed" : "absolute";

  return (
    <div className={twMerge("left-0 top-0 -z-10 h-screen w-full", position)}>
      <Suspense fallback={<AuroraFallback dark={dark} position={position} />}>
        <MeshGradientRenderer
          className="h-full w-full"
          colors={palettes}
          speed={0.01}
          wireframe={dark}
          backgroundColor={"#000000"}
        />
      </Suspense>
    </div>
  );
}

export default memo(Aurora);
