"use client";

import { useRef, useEffect, useState } from "react";

interface UseDraggableOptions {
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDrag?: (x: number, y: number) => void;
}

export const useDraggable = (options: UseDraggableOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    startElementX: 0,
    startElementY: 0,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();

      const rect = element.getBoundingClientRect();
      dragState.current = {
        isDragging: true,
        startX: e.clientX,
        startY: e.clientY,
        startElementX: rect.left,
        startElementY: rect.top,
      };

      setIsDragging(true);
      options.onDragStart?.();

      // Adicionar classe visual
      element.style.cursor = "grabbing";
      element.style.zIndex = "1000";
      element.style.transform =
        element.style.transform || "translate(0px, 0px)";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragState.current.isDragging) return;

      const deltaX = e.clientX - dragState.current.startX;
      const deltaY = e.clientY - dragState.current.startY;

      const newPosition = { x: deltaX, y: deltaY };
      setPosition(newPosition);

      // Atualizar posição do elemento imediatamente
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

      options.onDrag?.(deltaX, deltaY);
    };

    const handleMouseUp = () => {
      if (!dragState.current.isDragging) return;

      dragState.current.isDragging = false;
      setIsDragging(false);
      options.onDragEnd?.();

      // Restaurar cursor
      element.style.cursor = "grab";
      element.style.zIndex = "";
    };

    // Touch events para dispositivos móveis
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = element.getBoundingClientRect();

      dragState.current = {
        isDragging: true,
        startX: touch.clientX,
        startY: touch.clientY,
        startElementX: rect.left,
        startElementY: rect.top,
      };

      setIsDragging(true);
      options.onDragStart?.();
      element.style.zIndex = "1000";
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!dragState.current.isDragging) return;
      e.preventDefault();

      const touch = e.touches[0];
      const deltaX = touch.clientX - dragState.current.startX;
      const deltaY = touch.clientY - dragState.current.startY;

      const newPosition = { x: deltaX, y: deltaY };
      setPosition(newPosition);

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      options.onDrag?.(deltaX, deltaY);
    };

    const handleTouchEnd = () => {
      if (!dragState.current.isDragging) return;

      dragState.current.isDragging = false;
      setIsDragging(false);
      options.onDragEnd?.();
      element.style.zIndex = "";
    };

    // Configurar elemento como draggável
    element.style.cursor = "grab";
    element.style.userSelect = "none";
    element.setAttribute("data-draggable", "true");

    // Adicionar event listeners
    element.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    element.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      element.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [options]);

  return {
    ref: elementRef,
    isDragging,
    position,
  };
};
