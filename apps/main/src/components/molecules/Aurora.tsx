// @ts-nocheck
"use client";
import { useState } from "react";
import { MeshGradientRenderer } from "@johnn-e/react-mesh-gradient";

interface IAuroraProps {
  dark?: boolean;
}

function Aurora({ dark = false }: IAuroraProps) {
  const palettes = dark
    ? ["#303030", "#303030", "#404040", "#505050", "#606060"]
    : ["#d500f9", "#6366f1", "#ec4899", "#a855f7", "#3b82f6"];

  return (
    <div className="fixed left-0 top-0 -z-10 min-h-screen w-full">
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

export default Aurora;
