"use client";

import { RefObject, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface NativeDragLineProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  color?: string;
  thickness?: number;
}

export const NativeDragLine: React.FC<NativeDragLineProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  color = "#9c40ff",
  thickness = 2,
}) => {
  const [pathData, setPathData] = useState<{
    path: string;
    svgBounds: { x: number; y: number; width: number; height: number };
  } | null>(null);

  const updateLine = useCallback(() => {
    if (!containerRef.current || !fromRef.current || !toRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const fromRect = fromRef.current.getBoundingClientRect();
    const toRect = toRef.current.getBoundingClientRect();

    // Calcular pontos de conexão nas bordas
    const getEdgePoint = (
      elementRect: DOMRect,
      targetCenterX: number,
      targetCenterY: number,
    ) => {
      const elementCenterX =
        elementRect.left - containerRect.left + elementRect.width / 2;
      const elementCenterY =
        elementRect.top - containerRect.top + elementRect.height / 2;

      const dx = targetCenterX - elementCenterX;
      const dy = targetCenterY - elementCenterY;

      const absX = Math.abs(dx);
      const absY = Math.abs(dy);

      // Determinar qual borda será atingida
      if (absX * elementRect.height > absY * elementRect.width) {
        // Conecta na borda esquerda ou direita
        const x =
          elementRect.left -
          containerRect.left +
          (dx > 0 ? elementRect.width : 0);
        const y = elementCenterY;
        return { x, y };
      } else {
        // Conecta na borda superior ou inferior
        const x = elementCenterX;
        const y =
          elementRect.top -
          containerRect.top +
          (dy > 0 ? elementRect.height : 0);
        return { x, y };
      }
    };

    const fromCenterX = fromRect.left - containerRect.left + fromRect.width / 2;
    const fromCenterY = fromRect.top - containerRect.top + fromRect.height / 2;
    const toCenterX = toRect.left - containerRect.left + toRect.width / 2;
    const toCenterY = toRect.top - containerRect.top + toRect.height / 2;

    const startPoint = getEdgePoint(fromRect, toCenterX, toCenterY);
    const endPoint = getEdgePoint(toRect, fromCenterX, fromCenterY);

    // Criar linha reta
    const pathString = `M ${startPoint.x} ${startPoint.y} L ${endPoint.x} ${endPoint.y}`;

    // Calcular bounds
    const minX = Math.min(startPoint.x, endPoint.x) - 5;
    const minY = Math.min(startPoint.y, endPoint.y) - 5;
    const maxX = Math.max(startPoint.x, endPoint.x) + 5;
    const maxY = Math.max(startPoint.y, endPoint.y) + 5;

    setPathData({
      path: pathString,
      svgBounds: {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      },
    });
  }, [containerRef, fromRef, toRef]);

  useEffect(() => {
    updateLine();

    // Observer para mudanças de tamanho
    const resizeObserver = new ResizeObserver(updateLine);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Listener para eventos de drag em tempo real
    const handleMouseMove = () => {
      requestAnimationFrame(updateLine);
    };

    const handleTouchMove = () => {
      requestAnimationFrame(updateLine);
    };

    // Adicionar listeners globais para capturar todos os movimentos
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);

    // Observer para mudanças na DOM (útil para outras atualizações)
    const mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(updateLine);
    });

    if (containerRef.current) {
      mutationObserver.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [updateLine]);

  if (!pathData) return null;

  return (
    <div className={cn("pointer-events-none absolute inset-0 z-10", className)}>
      <svg
        style={{
          position: "absolute",
          left: pathData.svgBounds.x,
          top: pathData.svgBounds.y,
          width: pathData.svgBounds.width,
          height: pathData.svgBounds.height,
          overflow: "visible",
        }}
        viewBox={`0 0 ${pathData.svgBounds.width} ${pathData.svgBounds.height}`}
      >
        <path
          d={pathData.path}
          stroke={color}
          strokeWidth={thickness}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`translate(${-pathData.svgBounds.x}, ${-pathData.svgBounds.y})`}
        />
      </svg>
    </div>
  );
};
