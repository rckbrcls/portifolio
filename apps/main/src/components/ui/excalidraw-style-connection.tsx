"use client";

import { RefObject, useEffect, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface ExcalidrawStyleConnectionProps {
  className?: string;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  color?: string;
  thickness?: number;
  animated?: boolean;
  containerRef: RefObject<HTMLElement | null>;
}

interface Point {
  x: number;
  y: number;
}

interface ConnectionData {
  from: Point;
  to: Point;
  path: string;
}

// Sistema de coordenadas como o Excalidraw: sempre trabalhamos em coordenadas "canvas"
// independente das transformações visuais
const getCanvasCoordinates = (
  element: HTMLElement,
  containerElement: HTMLElement,
): { center: Point; bounds: { width: number; height: number } } => {
  // Pegar a posição absoluta do elemento no documento
  const elementRect = element.getBoundingClientRect();
  const containerRect = containerElement.getBoundingClientRect();

  // Converter para coordenadas do canvas (sem transformações)
  const center = {
    x: elementRect.left - containerRect.left + elementRect.width / 2,
    y: elementRect.top - containerRect.top + elementRect.height / 2,
  };

  const bounds = {
    width: elementRect.width,
    height: elementRect.height,
  };

  return { center, bounds };
};

// Algoritmo de conexão de bordas inspirado no Excalidraw
const getEdgeConnectionPoints = (
  fromElement: HTMLElement,
  toElement: HTMLElement,
  containerElement: HTMLElement,
): { from: Point; to: Point } => {
  const fromData = getCanvasCoordinates(fromElement, containerElement);
  const toData = getCanvasCoordinates(toElement, containerElement);

  const fromCenter = fromData.center;
  const toCenter = toData.center;

  // Calcular direção da conexão
  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;

  // Função para encontrar ponto de conexão na borda (algoritmo do Excalidraw)
  const getEdgePoint = (
    center: Point,
    bounds: { width: number; height: number },
    targetCenter: Point,
  ): Point => {
    const direction = {
      x: targetCenter.x - center.x,
      y: targetCenter.y - center.y,
    };

    // Normalizar direção
    const length = Math.sqrt(
      direction.x * direction.x + direction.y * direction.y,
    );
    if (length === 0) return center;

    const normalizedDirection = {
      x: direction.x / length,
      y: direction.y / length,
    };

    // Calcular intersecção com as bordas do retângulo
    const halfWidth = bounds.width / 2;
    const halfHeight = bounds.height / 2;

    // Determinar qual borda será atingida primeiro (ray casting)
    const timeToVerticalEdge =
      normalizedDirection.x !== 0
        ? halfWidth / Math.abs(normalizedDirection.x)
        : Infinity;
    const timeToHorizontalEdge =
      normalizedDirection.y !== 0
        ? halfHeight / Math.abs(normalizedDirection.y)
        : Infinity;

    let edgePoint: Point;

    if (timeToVerticalEdge < timeToHorizontalEdge) {
      // Atinge borda vertical primeiro
      const edgeX =
        center.x + (normalizedDirection.x > 0 ? halfWidth : -halfWidth);
      const edgeY = center.y + normalizedDirection.y * timeToVerticalEdge;
      edgePoint = { x: edgeX, y: edgeY };
    } else {
      // Atinge borda horizontal primeiro
      const edgeX = center.x + normalizedDirection.x * timeToHorizontalEdge;
      const edgeY =
        center.y + (normalizedDirection.y > 0 ? halfHeight : -halfHeight);
      edgePoint = { x: edgeX, y: edgeY };
    }

    return edgePoint;
  };

  const fromPoint = getEdgePoint(fromCenter, fromData.bounds, toCenter);
  const toPoint = getEdgePoint(toCenter, toData.bounds, fromCenter);

  return {
    from: fromPoint,
    to: toPoint,
  };
};

// Função para criar path SVG simples e eficiente
const createConnectionPath = (from: Point, to: Point): string => {
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
};

export const ExcalidrawStyleConnection: React.FC<
  ExcalidrawStyleConnectionProps
> = ({
  className,
  fromRef,
  toRef,
  color = "#9c40ff",
  thickness = 2,
  animated = false,
  containerRef,
}) => {
  const [connectionData, setConnectionData] = useState<ConnectionData | null>(
    null,
  );
  const [isVisible, setIsVisible] = useState(true);

  // Função de atualização otimizada que sempre usa coordenadas canvas
  const updateConnection = useCallback(() => {
    if (!fromRef.current || !toRef.current || !containerRef.current) {
      setIsVisible(false);
      return;
    }

    try {
      const points = getEdgeConnectionPoints(
        fromRef.current,
        toRef.current,
        containerRef.current,
      );

      const path = createConnectionPath(points.from, points.to);

      setConnectionData({
        from: points.from,
        to: points.to,
        path,
      });

      setIsVisible(true);
    } catch (error) {
      console.warn("Error updating connection:", error);
      setIsVisible(false);
    }
  }, [fromRef, toRef, containerRef]);

  // Sistema de atualização baseado em RAF como o Excalidraw
  const rafRef = useMemo(() => ({ id: 0 }), []);

  const scheduleUpdate = useCallback(() => {
    cancelAnimationFrame(rafRef.id);
    rafRef.id = requestAnimationFrame(updateConnection);
  }, [updateConnection, rafRef]);

  // Event listeners otimizados
  useEffect(() => {
    if (!containerRef.current) return;

    // Update inicial
    updateConnection();

    // Listener para eventos de drag
    const handleDragUpdate = () => scheduleUpdate();

    // Listener para eventos de transformação (zoom/pan)
    const handleTransformUpdate = () => scheduleUpdate();

    // Eventos principais
    document.addEventListener("connection-update", handleDragUpdate);
    document.addEventListener("architecture-transform", handleTransformUpdate);

    // Observer para mudanças de tamanho/posição
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    const mutationObserver = new MutationObserver(scheduleUpdate);

    // Observar o container principal
    resizeObserver.observe(containerRef.current);
    mutationObserver.observe(containerRef.current, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "transform"],
    });

    // Observar os elementos conectados
    if (fromRef.current) {
      resizeObserver.observe(fromRef.current);
      mutationObserver.observe(fromRef.current, {
        attributes: true,
        attributeFilter: ["style", "transform"],
      });
    }

    if (toRef.current) {
      resizeObserver.observe(toRef.current);
      mutationObserver.observe(toRef.current, {
        attributes: true,
        attributeFilter: ["style", "transform"],
      });
    }

    // Cleanup
    return () => {
      document.removeEventListener("connection-update", handleDragUpdate);
      document.removeEventListener(
        "architecture-transform",
        handleTransformUpdate,
      );
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      cancelAnimationFrame(rafRef.id);
    };
  }, [updateConnection, scheduleUpdate, containerRef, fromRef, toRef, rafRef]);

  if (!connectionData || !isVisible) return null;

  // Calcular bounds para o SVG
  const padding = 20;
  const minX = Math.min(connectionData.from.x, connectionData.to.x) - padding;
  const minY = Math.min(connectionData.from.y, connectionData.to.y) - padding;
  const maxX = Math.max(connectionData.from.x, connectionData.to.x) + padding;
  const maxY = Math.max(connectionData.from.y, connectionData.to.y) + padding;
  const width = maxX - minX;
  const height = maxY - minY;

  return (
    <svg
      className={cn("z-5 pointer-events-none absolute", className)}
      style={{
        left: minX,
        top: minY,
        width: width,
        height: height,
        overflow: "visible",
      }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        {animated && (
          <>
            <style>
              {`
                .excalidraw-connection-animated {
                  stroke-dasharray: 8, 4;
                  animation: excalidraw-connection-dash 2s linear infinite;
                }
                @keyframes excalidraw-connection-dash {
                  to {
                    stroke-dashoffset: -12;
                  }
                }
              `}
            </style>
            <linearGradient
              id={`excalidraw-gradient-${color.replace("#", "")}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="50%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.3" />
            </linearGradient>
          </>
        )}
      </defs>

      {/* Linha de fundo para melhor visibilidade */}
      <path
        d={connectionData.path}
        stroke={color}
        strokeWidth={thickness + 2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
        transform={`translate(${-minX}, ${-minY})`}
        style={{
          vectorEffect: "non-scaling-stroke",
        }}
      />

      {/* Linha principal */}
      <path
        d={connectionData.path}
        stroke={
          animated
            ? `url(#excalidraw-gradient-${color.replace("#", "")})`
            : color
        }
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "excalidraw-connection-animated" : ""}
        transform={`translate(${-minX}, ${-minY})`}
        style={{
          vectorEffect: "non-scaling-stroke",
          filter: animated ? "drop-shadow(0 0 4px currentColor)" : undefined,
        }}
      />
    </svg>
  );
};
