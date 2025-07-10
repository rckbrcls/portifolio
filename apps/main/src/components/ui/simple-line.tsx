"use client";

import { RefObject, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface SimpleLineProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  color?: string;
  thickness?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const SimpleLine: React.FC<SimpleLineProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  color = "#9c40ff",
  thickness = 2,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const [lineData, setLineData] = useState<{
    x: number;
    y: number;
    width: number;
    angle: number;
  } | null>(null);

  useEffect(() => {
    const updateLine = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const fromRect = fromRef.current.getBoundingClientRect();
        const toRect = toRef.current.getBoundingClientRect();

        // Função para pegar ponto de conexão na borda (igual Excalidraw)
        const getEdgePoint = (
          element: HTMLElement,
          targetX: number,
          targetY: number,
          xOffset: number = 0,
          yOffset: number = 0,
        ) => {
          const rect = element.getBoundingClientRect();

          // Posição do elemento com offset
          const elementLeft = rect.left - containerRect.left + xOffset;
          const elementTop = rect.top - containerRect.top + yOffset;
          const elementRight = elementLeft + rect.width;
          const elementBottom = elementTop + rect.height;
          const elementCenterX = elementLeft + rect.width / 2;
          const elementCenterY = elementTop + rect.height / 2;

          // Direção para o target
          const dx = targetX - elementCenterX;
          const dy = targetY - elementCenterY;

          // Proporção como no Excalidraw
          const absX = Math.abs(dx);
          const absY = Math.abs(dy);

          if (absX / rect.width > absY / rect.height) {
            // Conecta na borda esquerda ou direita
            const x = dx > 0 ? elementRight : elementLeft;
            const y = elementCenterY;
            return { x, y };
          } else {
            // Conecta na borda superior ou inferior
            const x = elementCenterX;
            const y = dy > 0 ? elementBottom : elementTop;
            return { x, y };
          }
        };

        // Centros dos elementos com offset
        const fromCenterX =
          fromRect.left -
          containerRect.left +
          fromRect.width / 2 +
          startXOffset;
        const fromCenterY =
          fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
        const toCenterX =
          toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
        const toCenterY =
          toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

        // Pontos de conexão nas bordas
        const startPoint = getEdgePoint(
          fromRef.current,
          toCenterX,
          toCenterY,
          startXOffset,
          startYOffset,
        );
        const endPoint = getEdgePoint(
          toRef.current,
          fromCenterX,
          fromCenterY,
          endXOffset,
          endYOffset,
        );

        // Calcular propriedades da linha
        const deltaX = endPoint.x - startPoint.x;
        const deltaY = endPoint.y - startPoint.y;
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        setLineData({
          x: startPoint.x,
          y: startPoint.y,
          width: length,
          angle,
        });
      }
    };

    updateLine();

    const resizeObserver = new ResizeObserver(updateLine);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [
    containerRef,
    fromRef,
    toRef,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  if (!lineData) return null;

  return (
    <div
      className={cn("pointer-events-none absolute", className)}
      style={{
        left: lineData.x,
        top: lineData.y - thickness / 2,
        width: lineData.width,
        height: thickness,
        backgroundColor: color,
        transformOrigin: "0 50%",
        transform: `rotate(${lineData.angle}deg)`,
        borderRadius: thickness / 2,
      }}
    />
  );
};
