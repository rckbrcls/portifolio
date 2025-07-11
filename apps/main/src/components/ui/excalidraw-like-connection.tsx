"use client";

import { RefObject, useEffect, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface ExcalidrawLikeConnectionProps {
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
  bounds: { x: number; y: number; width: number; height: number };
}

// Função otimizada para calcular pontos de conexão usando coordenadas relativas
const calculateConnectionPoints = (
  fromElement: HTMLElement,
  toElement: HTMLElement,
  containerElement: HTMLElement,
): { from: Point; to: Point } => {
  // Usar coordenadas relativas ao container transformado para máxima precisão
  const containerRect = containerElement.getBoundingClientRect();
  const fromRect = fromElement.getBoundingClientRect();
  const toRect = toElement.getBoundingClientRect();

  // Converter para coordenadas relativas ao container
  const fromRelative = {
    left: fromRect.left - containerRect.left,
    top: fromRect.top - containerRect.top,
    width: fromRect.width,
    height: fromRect.height,
  };

  const toRelative = {
    left: toRect.left - containerRect.left,
    top: toRect.top - containerRect.top,
    width: toRect.width,
    height: toRect.height,
  };

  // Calcular centros
  const fromCenter = {
    x: fromRelative.left + fromRelative.width / 2,
    y: fromRelative.top + fromRelative.height / 2,
  };

  const toCenter = {
    x: toRelative.left + toRelative.width / 2,
    y: toRelative.top + toRelative.height / 2,
  };

  // Função para encontrar ponto de conexão na borda mais próxima
  const getEdgePoint = (
    rect: typeof fromRelative,
    targetCenter: Point,
    center: Point,
  ) => {
    const dx = targetCenter.x - center.x;
    const dy = targetCenter.y - center.y;

    // Normalizar direção
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return center;

    const normalizedDx = dx / length;
    const normalizedDy = dy / length;

    // Calcular interseção com as bordas do retângulo
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;

    // Determinar qual borda será atingida primeiro
    const timeToVerticalEdge =
      normalizedDx !== 0 ? halfWidth / Math.abs(normalizedDx) : Infinity;
    const timeToHorizontalEdge =
      normalizedDy !== 0 ? halfHeight / Math.abs(normalizedDy) : Infinity;

    let edgePoint: Point;

    if (timeToVerticalEdge < timeToHorizontalEdge) {
      // Atinge borda vertical primeiro
      const edgeX = center.x + (normalizedDx > 0 ? halfWidth : -halfWidth);
      const edgeY = center.y + normalizedDy * timeToVerticalEdge;
      edgePoint = { x: edgeX, y: edgeY };
    } else {
      // Atinge borda horizontal primeiro
      const edgeX = center.x + normalizedDx * timeToHorizontalEdge;
      const edgeY = center.y + (normalizedDy > 0 ? halfHeight : -halfHeight);
      edgePoint = { x: edgeX, y: edgeY };
    }

    return edgePoint;
  };

  const fromPoint = getEdgePoint(fromRelative, toCenter, fromCenter);
  const toPoint = getEdgePoint(toRelative, fromCenter, toCenter);

  return {
    from: fromPoint,
    to: toPoint,
  };
};

// Função para criar path SVG (com possibilidade de curvas no futuro)
const createConnectionPath = (
  from: Point,
  to: Point,
  curved: boolean = false,
): string => {
  if (!curved) {
    // Linha reta para melhor performance
    return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
  }

  // Curva suave (implementação futura para connections mais sofisticadas)
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Pontos de controle para curva bezier
  const curvature = Math.min(distance * 0.3, 100);
  const cp1x = from.x + (Math.abs(dx) > Math.abs(dy) ? curvature : 0);
  const cp1y = from.y + (Math.abs(dy) > Math.abs(dx) ? curvature : 0);
  const cp2x = to.x - (Math.abs(dx) > Math.abs(dy) ? curvature : 0);
  const cp2y = to.y - (Math.abs(dy) > Math.abs(dx) ? curvature : 0);

  return `M ${from.x} ${from.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${to.x} ${to.y}`;
};

export const ExcalidrawLikeConnection: React.FC<
  ExcalidrawLikeConnectionProps
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

  // Função de atualização otimizada
  const updateConnection = useCallback(() => {
    if (!fromRef.current || !toRef.current || !containerRef.current) {
      setIsVisible(false);
      return;
    }

    try {
      const points = calculateConnectionPoints(
        fromRef.current,
        toRef.current,
        containerRef.current,
      );

      const path = createConnectionPath(points.from, points.to);

      // Calcular bounds para o SVG
      const padding = 20;
      const minX = Math.min(points.from.x, points.to.x) - padding;
      const minY = Math.min(points.from.y, points.to.y) - padding;
      const maxX = Math.max(points.from.x, points.to.x) + padding;
      const maxY = Math.max(points.from.y, points.to.y) + padding;

      setConnectionData({
        from: points.from,
        to: points.to,
        path,
        bounds: {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY,
        },
      });

      setIsVisible(true);
    } catch (error) {
      console.warn("Error updating connection:", error);
      setIsVisible(false);
    }
  }, [fromRef, toRef, containerRef]);

  // Sistema de atualização baseado em RequestAnimationFrame para máxima suavidade
  const rafUpdate = useMemo(() => {
    let rafId: number;
    return () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateConnection);
    };
  }, [updateConnection]);

  // Event listeners otimizados
  useEffect(() => {
    if (!containerRef.current) return;

    // Update inicial
    updateConnection();

    // Listener para eventos customizados (drag, zoom, pan)
    const handleUpdate = () => rafUpdate();

    // Eventos de atualização
    document.addEventListener("connection-update", handleUpdate);
    document.addEventListener("architecture-transform", handleUpdate);

    // Observer para mudanças de tamanho do container
    const resizeObserver = new ResizeObserver(handleUpdate);
    resizeObserver.observe(containerRef.current);

    // Intersection Observer para pausar atualizações quando não visível
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
            handleUpdate();
          }
        });
      },
      { threshold: 0 },
    );

    if (containerRef.current) {
      intersectionObserver.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener("connection-update", handleUpdate);
      document.removeEventListener("architecture-transform", handleUpdate);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [rafUpdate, updateConnection, containerRef]);

  if (!connectionData || !isVisible) return null;

  return (
    <svg
      className={cn("z-5 pointer-events-none absolute", className)}
      style={{
        left: connectionData.bounds.x,
        top: connectionData.bounds.y,
        width: connectionData.bounds.width,
        height: connectionData.bounds.height,
        overflow: "visible",
      }}
      viewBox={`0 0 ${connectionData.bounds.width} ${connectionData.bounds.height}`}
    >
      <defs>
        {animated && (
          <>
            <style>
              {`
                .connection-animated {
                  stroke-dasharray: 8, 4;
                  animation: connection-dash 2s linear infinite;
                }
                @keyframes connection-dash {
                  to {
                    stroke-dashoffset: -12;
                  }
                }
              `}
            </style>
            {/* Gradient para efeito mais sofisticado */}
            <linearGradient
              id={`connection-gradient-${color.replace("#", "")}`}
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

      {/* Linha de fundo (mais espessa, transparente) para melhor visibilidade */}
      <path
        d={connectionData.path}
        stroke={color}
        strokeWidth={thickness + 2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
        transform={`translate(${-connectionData.bounds.x}, ${-connectionData.bounds.y})`}
        style={{
          vectorEffect: "non-scaling-stroke",
        }}
      />

      {/* Linha principal */}
      <path
        d={connectionData.path}
        stroke={
          animated
            ? `url(#connection-gradient-${color.replace("#", "")})`
            : color
        }
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "connection-animated" : ""}
        transform={`translate(${-connectionData.bounds.x}, ${-connectionData.bounds.y})`}
        style={{
          vectorEffect: "non-scaling-stroke",
          filter: animated ? "drop-shadow(0 0 4px currentColor)" : undefined,
        }}
      />
    </svg>
  );
};
