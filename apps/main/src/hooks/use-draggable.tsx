"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface UseDraggableOptions {
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDrag?: (x: number, y: number) => void;
  onDrop?: (element: HTMLElement, dropZone: HTMLElement | null) => void;
  dropZoneSelector?: string; // Seletor CSS para drop zones
  snapToGrid?: number; // Snap to grid em pixels
  bounds?: {
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
  };
}

export const useDraggable = (options: UseDraggableOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Estado robusto para tracking absoluto da posição
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    offsetX: 0,
    offsetY: 0,
    startTime: 0,
    // Posição absoluta acumulada do elemento
    totalX: 0,
    totalY: 0,
    // Posição inicial do elemento no início do drag
    elementStartX: 0,
    elementStartY: 0,
  });

  // Função para prevenir seleção de texto durante drag
  const preventSelection = useCallback((e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleStart = (clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect();

      // Calcular offset do cursor em relação ao canto superior esquerdo do elemento
      const offsetX = clientX - rect.left;
      const offsetY = clientY - rect.top;

      // Capturar a posição atual do elemento (considerando qualquer transform existente)
      const computedStyle = window.getComputedStyle(element);
      const matrix = new DOMMatrix(computedStyle.transform);

      dragState.current = {
        isDragging: true,
        startX: clientX,
        startY: clientY,
        offsetX,
        offsetY,
        startTime: Date.now(),
        // Posição absoluta atual do elemento
        totalX: matrix.m41, // translateX
        totalY: matrix.m42, // translateY
        // Posição inicial para este drag
        elementStartX: matrix.m41,
        elementStartY: matrix.m42,
      };

      setIsDragging(true);
      options.onDragStart?.();

      // Configurar elemento para drag com máxima prioridade
      element.style.cursor = "grabbing !important";
      element.style.zIndex = "9999";
      element.style.userSelect = "none";
      element.style.webkitUserSelect = "none";
      element.style.pointerEvents = "none"; // Evita interferências

      // Prevenir seleção em toda a página
      document.body.style.userSelect = "none";
      document.body.style.webkitUserSelect = "none";
      document.addEventListener("selectstart", preventSelection, {
        capture: true,
      });
      document.addEventListener("dragstart", preventSelection, {
        capture: true,
      });
    };
    const handleMove = (clientX: number, clientY: number) => {
      if (!dragState.current.isDragging) return;

      // Calcular quanto o cursor moveu desde o início do drag
      const deltaX = clientX - dragState.current.startX;
      const deltaY = clientY - dragState.current.startY;

      // Calcular a nova posição absoluta
      let newX = dragState.current.elementStartX + deltaX;
      let newY = dragState.current.elementStartY + deltaY;

      // BOUNDS ULTRA ROBUSTOS - aplicar limites à posição final do elemento
      if (options.bounds) {
        // Debug logging (remover em produção)
        if (process.env.NODE_ENV === "development") {
          console.log(`Proposed position: (${newX}, ${newY})`);
          console.log(`Bounds:`, options.bounds);
        }

        // Aplicar bounds diretamente à posição de transform (não ao getBoundingClientRect)
        if (options.bounds.left !== undefined) {
          const limitedX = Math.max(options.bounds.left, newX);
          if (limitedX !== newX) {
            console.log(`Left bound applied: ${newX} -> ${limitedX}`);
          }
          newX = limitedX;
        }
        if (options.bounds.top !== undefined) {
          const limitedY = Math.max(options.bounds.top, newY);
          if (limitedY !== newY) {
            console.log(`Top bound applied: ${newY} -> ${limitedY}`);
          }
          newY = limitedY;
        }
        if (options.bounds.right !== undefined) {
          const limitedX = Math.min(options.bounds.right, newX);
          if (limitedX !== newX) {
            console.log(`Right bound applied: ${newX} -> ${limitedX}`);
          }
          newX = limitedX;
        }
        if (options.bounds.bottom !== undefined) {
          const limitedY = Math.min(options.bounds.bottom, newY);
          if (limitedY !== newY) {
            console.log(`Bottom bound applied: ${newY} -> ${limitedY}`);
          }
          newY = limitedY;
        }

        // Debug final position
        if (process.env.NODE_ENV === "development") {
          console.log(`Final position: (${newX}, ${newY})`);
        }
      }

      // Aplicar snap to grid se especificado
      if (options.snapToGrid) {
        newX = Math.round(newX / options.snapToGrid) * options.snapToGrid;
        newY = Math.round(newY / options.snapToGrid) * options.snapToGrid;
      }

      // Atualizar o estado total
      dragState.current.totalX = newX;
      dragState.current.totalY = newY;

      const newPosition = { x: newX, y: newY };
      setPosition(newPosition);

      // Aplicar transform absoluto
      element.style.transform = `translate(${newX}px, ${newY}px)`;
      element.style.willChange = "transform";

      // Detectar drop zones durante o movimento
      if (options.dropZoneSelector) {
        const dropZones = document.querySelectorAll(options.dropZoneSelector);
        const elementRect = element.getBoundingClientRect();
        const elementCenter = {
          x: elementRect.left + elementRect.width / 2,
          y: elementRect.top + elementRect.height / 2,
        };

        // Remover highlight de todas as drop zones
        dropZones.forEach((zone) => {
          zone.classList.remove("drag-over");
        });

        // Verificar se está sobre alguma drop zone
        dropZones.forEach((zone) => {
          const zoneRect = zone.getBoundingClientRect();
          if (
            elementCenter.x >= zoneRect.left &&
            elementCenter.x <= zoneRect.right &&
            elementCenter.y >= zoneRect.top &&
            elementCenter.y <= zoneRect.bottom
          ) {
            zone.classList.add("drag-over");
          }
        });
      }

      options.onDrag?.(newX, newY);
    };
    const handleEnd = () => {
      if (!dragState.current.isDragging) return;

      dragState.current.isDragging = false;
      setIsDragging(false);

      // Detectar drop zone final
      let dropZone: HTMLElement | null = null;
      if (options.dropZoneSelector) {
        const dropZones = document.querySelectorAll(options.dropZoneSelector);
        const elementRect = element.getBoundingClientRect();
        const elementCenter = {
          x: elementRect.left + elementRect.width / 2,
          y: elementRect.top + elementRect.height / 2,
        };

        // Encontrar a drop zone onde foi solto
        dropZones.forEach((zone) => {
          const zoneRect = zone.getBoundingClientRect();
          if (
            elementCenter.x >= zoneRect.left &&
            elementCenter.x <= zoneRect.right &&
            elementCenter.y >= zoneRect.top &&
            elementCenter.y <= zoneRect.bottom
          ) {
            dropZone = zone as HTMLElement;
          }
          // Remover highlight
          zone.classList.remove("drag-over");
        });
      }

      options.onDragEnd?.();
      options.onDrop?.(element, dropZone);

      // Restaurar propriedades do elemento
      element.style.cursor = "grab";
      element.style.zIndex = "";
      element.style.pointerEvents = "";
      element.style.willChange = "";

      // Restaurar seleção na página
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      document.removeEventListener("selectstart", preventSelection, {
        capture: true,
      });
      document.removeEventListener("dragstart", preventSelection, {
        capture: true,
      });
    };

    // Mouse events
    const handleMouseDown = (e: MouseEvent) => {
      // Só responder ao botão esquerdo
      if (e.button !== 0) return;

      // IMPORTANTE: Não bloquear cliques em links!
      const target = e.target as HTMLElement;
      const isLink = target.closest("a");
      if (isLink) {
        // Se clicou em um link, não iniciar o drag
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      handleStart(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.current.isDragging) return;

      e.preventDefault();
      e.stopPropagation();

      handleMove(e.clientX, e.clientY);
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!dragState.current.isDragging) return;

      e.preventDefault();
      e.stopPropagation();

      handleEnd();
    };

    // Touch events para dispositivos móveis
    const handleTouchStart = (e: TouchEvent) => {
      // Só responder ao primeiro toque
      if (e.touches.length !== 1) return;

      // IMPORTANTE: Não bloquear toques em links!
      const target = e.target as HTMLElement;
      const isLink = target.closest("a");
      if (isLink) {
        // Se tocou em um link, não iniciar o drag
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragState.current.isDragging || e.touches.length !== 1) return;

      e.preventDefault();
      e.stopPropagation();

      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!dragState.current.isDragging) return;

      e.preventDefault();
      e.stopPropagation();

      handleEnd();
    };

    // Prevenir context menu durante drag
    const handleContextMenu = (e: Event) => {
      if (dragState.current.isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Configurar elemento inicial
    element.style.cursor = "grab";
    element.style.userSelect = "none";
    element.style.webkitUserSelect = "none";
    element.style.touchAction = "none"; // Importante para touch
    element.setAttribute("data-draggable", "true");
    element.setAttribute("draggable", "false"); // Prevenir drag nativo

    // Event listeners com alta prioridade (capture: true)
    element.addEventListener("mousedown", handleMouseDown, {
      capture: true,
      passive: false,
    });

    document.addEventListener("mousemove", handleMouseMove, {
      passive: false,
    });

    document.addEventListener("mouseup", handleMouseUp, {
      capture: true,
      passive: false,
    });

    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
      capture: true,
    });

    document.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    document.addEventListener("touchend", handleTouchEnd, {
      capture: true,
      passive: false,
    });

    element.addEventListener("contextmenu", handleContextMenu, {
      capture: true,
      passive: false,
    });

    // Cleanup completo
    return () => {
      element.removeEventListener("mousedown", handleMouseDown, {
        capture: true,
      });
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp, { capture: true });

      element.removeEventListener("touchstart", handleTouchStart, {
        capture: true,
      });
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd, {
        capture: true,
      });

      element.removeEventListener("contextmenu", handleContextMenu, {
        capture: true,
      });

      document.removeEventListener("selectstart", preventSelection, {
        capture: true,
      });
      document.removeEventListener("dragstart", preventSelection, {
        capture: true,
      });

      // Restaurar estilos se necessário
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
    };
  }, [options, preventSelection]);

  return {
    ref: elementRef,
    isDragging,
    position,
    // Função para resetar a posição do elemento
    resetPosition: () => {
      if (elementRef.current) {
        elementRef.current.style.transform = "translate(0px, 0px)";
        dragState.current.totalX = 0;
        dragState.current.totalY = 0;
        setPosition({ x: 0, y: 0 });
      }
    },
    // Função para definir uma posição específica
    setPosition: (x: number, y: number) => {
      if (elementRef.current) {
        elementRef.current.style.transform = `translate(${x}px, ${y}px)`;
        dragState.current.totalX = x;
        dragState.current.totalY = y;
        setPosition({ x, y });
      }
    },
  };
};
