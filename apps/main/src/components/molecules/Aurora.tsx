// @ts-nocheck
"use client";
import { useState, memo } from "react";
import { MeshGradientRenderer } from "@johnn-e/react-mesh-gradient";
import { twMerge } from "tailwind-merge";

interface IAuroraProps {
  dark?: boolean;
}

function Aurora({ dark = false }: IAuroraProps) {
  const palettes = dark
    ? ["#000", "#222", "#444", "#666", "#888"]
    : ["#d500f9", "#6366f1", "#ec4899", "#a855f7", "#3b82f6"];

  const position = dark ? "fixed" : "absolute";

  return (
    <div className={twMerge("left-0 top-0 -z-10 min-h-svh w-full", position)}>
      <MeshGradientRenderer
        className="h-full w-full"
        colors={palettes}
        speed={0.01}
        wireframe={dark}
        backgroundColor={"#000000"}
      />
    </div>
  );
}

export default memo(Aurora);
