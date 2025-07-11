"use client";

import { RefObject, useEffect, useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";

export interface ConnectionLineProps {
  className?: string;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  color?: string;
  thickness?: number;
  animated?: boolean;
}

interface Point {
  x: number;
  y: number;
}

interface LineData {
  from: Point;
  to: Point;
  path: string;
}

// Função para calcular pontos de conexão nas bordas dos elementos
const getConnectionPoints = (
  fromElement: HTMLElement,
  toElement: HTMLElement,
  containerElement: HTMLElement,
): { from: Point; to: Point } => {
  // Usar offsetLeft/offsetTop ao invés de getBoundingClientRect para melhor performance
  // e consistência com transforms CSS
  const fromRect = {
    left: fromElement.offsetLeft,
    top: fromElement.offsetTop,
    width: fromElement.offsetWidth,
    height: fromElement.offsetHeight,
  };

  const toRect = {
    left: toElement.offsetLeft,
    top: toElement.offsetTop,
    width: toElement.offsetWidth,
    height: toElement.offsetHeight,
  };

  // Calcular centros
  const fromCenter = {
    x: fromRect.left + fromRect.width / 2,
    y: fromRect.top + fromRect.height / 2,
  };

  const toCenter = {
    x: toRect.left + toRect.width / 2,
    y: toRect.top + toRect.height / 2,
  };

  // Calcular direção da conexão
  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;

  // Função para encontrar ponto de interseção na borda
  const getEdgePoint = (
    rect: typeof fromRect,
    targetCenter: Point,
    center: Point,
  ) => {
    const absX = Math.abs(targetCenter.x - center.x);
    const absY = Math.abs(targetCenter.y - center.y);

    // Determinar qual borda será atingida baseado na proporção
    if (absX / rect.width > absY / rect.height) {
      // Conecta na borda esquerda ou direita
      const x = rect.left + (targetCenter.x > center.x ? rect.width : 0);
      const y = center.y;
      return { x, y };
    } else {
      // Conecta na borda superior ou inferior
      const x = center.x;
      const y = rect.top + (targetCenter.y > center.y ? rect.height : 0);
      return { x, y };
    }
  };

  const fromPoint = getEdgePoint(fromRect, toCenter, fromCenter);
  const toPoint = getEdgePoint(toRect, fromCenter, toCenter);

  return {
    from: fromPoint,
    to: toPoint,
  };
};

// Função para criar path SVG otimizado
const createOptimizedPath = (from: Point, to: Point): string => {
  // Linha reta simples para melhor performance
  // Em softwares como Excalidraw, linhas curvas são calculadas apenas quando necessário
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
};

export const OptimizedConnectionLine: React.FC<ConnectionLineProps> = ({
  className,
  fromRef,
  toRef,
  color = "#9c40ff",
  thickness = 2,
  animated = false,
}) => {
  const [lineData, setLineData] = useState<LineData | null>(null);

  // Função de atualização otimizada com throttling
  const updateLine = useCallback(() => {
    if (!fromRef.current || !toRef.current) return;

    // Encontrar o container pai comum (o container com transformações)
    let containerElement = fromRef.current.offsetParent as HTMLElement;
    while (
      containerElement &&
      !containerElement.hasAttribute("data-connection-container")
    ) {
      containerElement = containerElement.offsetParent as HTMLElement;
    }

    if (!containerElement) {
      // Fallback para o container mais próximo
      containerElement = fromRef.current.closest(
        "[data-connection-container]",
      ) as HTMLElement;
    }

    if (!containerElement) return;

    const points = getConnectionPoints(
      fromRef.current,
      toRef.current,
      containerElement,
    );

    const path = createOptimizedPath(points.from, points.to);

    setLineData({
      from: points.from,
      to: points.to,
      path,
    });
  }, [fromRef, toRef]);

  // Throttled update para melhor performance
  const throttledUpdate = useMemo(() => {
    let timeoutId: NodeJS.Timeout;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateLine, 16); // ~60fps
    };
  }, [updateLine]);

  // Sistema de observação otimizado
  useEffect(() => {
    if (!fromRef.current || !toRef.current) return;

    // Update inicial
    updateLine();

    // Observer para mudanças de posição via MutationObserver (mais eficiente que ResizeObserver para transforms)
    const observer = new MutationObserver(() => {
      throttledUpdate();
    });

    // Observar mudanças de atributos style nos elementos (para capturar transforms)
    observer.observe(fromRef.current, {
      attributes: true,
      attributeFilter: ["style"],
    });

    observer.observe(toRef.current, {
      attributes: true,
      attributeFilter: ["style"],
    });

    // Event listeners para eventos de drag (mais direto que mutation observer)
    const handleDragUpdate = () => {
      requestAnimationFrame(updateLine);
    };

    // Listener para eventos customizados de drag
    document.addEventListener("connection-update", handleDragUpdate);

    return () => {
      observer.disconnect();
      document.removeEventListener("connection-update", handleDragUpdate);
    };
  }, [updateLine, throttledUpdate, fromRef, toRef]);

  if (!lineData) return null;

  // Calcular viewBox dinâmico baseado nos pontos
  const padding = 10;
  const minX = Math.min(lineData.from.x, lineData.to.x) - padding;
  const minY = Math.min(lineData.from.y, lineData.to.y) - padding;
  const maxX = Math.max(lineData.from.x, lineData.to.x) + padding;
  const maxY = Math.max(lineData.from.y, lineData.to.y) + padding;
  const width = maxX - minX;
  const height = maxY - minY;

  return (
    <svg
      className={cn("z-5 pointer-events-none absolute inset-0", className)}
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
          <style>
            {`
              .animated-line {
                stroke-dasharray: 5, 5;
                animation: dash 1s linear infinite;
              }
              @keyframes dash {
                to {
                  stroke-dashoffset: -10;
                }
              }
            `}
          </style>
        )}
      </defs>
      <path
        d={lineData.path}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "animated-line" : ""}
        transform={`translate(${-minX}, ${-minY})`}
        style={{
          vectorEffect: "non-scaling-stroke", // Mantém espessura constante durante zoom
        }}
      />
    </svg>
  );
};

// Hook personalizado para gerenciar múltiplas conexões de forma otimizada
export const useConnectionManager = (
  connections: Array<{
    id: string;
    fromRef: RefObject<HTMLElement>;
    toRef: RefObject<HTMLElement>;
    color?: string;
    thickness?: number;
  }>,
) => {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const triggerUpdate = useCallback(() => {
    setUpdateTrigger((prev) => prev + 1);
    // Dispatch event customizado para todas as linhas
    document.dispatchEvent(new CustomEvent("connection-update"));
  }, []);

  return {
    connections,
    triggerUpdate,
    updateTrigger,
  };
};
