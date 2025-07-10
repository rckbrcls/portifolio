"use client";

import { RefObject, useEffect, useId, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>; // Container ref
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false, // Include the reverse prop
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Calculate the gradient coordinates based on the reverse prop
  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();

        // Calculate element centers relative to container
        const centerA = {
          x: rectA.left - containerRect.left + rectA.width / 2,
          y: rectA.top - containerRect.top + rectA.height / 2,
        };
        const centerB = {
          x: rectB.left - containerRect.left + rectB.width / 2,
          y: rectB.top - containerRect.top + rectB.height / 2,
        };

        // Function to get intersection point with rectangle edge
        const getEdgePoint = (
          center: { x: number; y: number },
          target: { x: number; y: number },
          rect: DOMRect,
          containerRect: DOMRect,
        ) => {
          const dx = target.x - center.x;
          const dy = target.y - center.y;

          const rectLeft = rect.left - containerRect.left;
          const rectTop = rect.top - containerRect.top;
          const rectRight = rectLeft + rect.width;
          const rectBottom = rectTop + rect.height;

          // Calculate intersection with rectangle edges
          let intersectionX = center.x;
          let intersectionY = center.y;

          if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal direction is dominant
            if (dx > 0) {
              // Going right
              intersectionX = rectRight;
              intersectionY = center.y + (dy * (rectRight - center.x)) / dx;
            } else {
              // Going left
              intersectionX = rectLeft;
              intersectionY = center.y + (dy * (rectLeft - center.x)) / dx;
            }
          } else {
            // Vertical direction is dominant
            if (dy > 0) {
              // Going down
              intersectionY = rectBottom;
              intersectionX = center.x + (dx * (rectBottom - center.y)) / dy;
            } else {
              // Going up
              intersectionY = rectTop;
              intersectionX = center.x + (dx * (rectTop - center.y)) / dy;
            }
          }

          return { x: intersectionX, y: intersectionY };
        };

        // Get edge connection points
        const startPoint = getEdgePoint(centerA, centerB, rectA, containerRect);
        const endPoint = getEdgePoint(centerB, centerA, rectB, containerRect);

        const startX = startPoint.x + startXOffset;
        const startY = startPoint.y + startYOffset;
        const endX = endPoint.x + endXOffset;
        const endY = endPoint.y + endYOffset;

        // Use container dimensions as SVG dimensions
        const svgWidth = containerRect.width;
        const svgHeight = containerRect.height;

        setSvgDimensions({ width: svgWidth, height: svgHeight });

        // Create path with edge connection points
        const controlY = startY - curvature;
        const d = `M ${startX},${startY} Q ${
          (startX + endX) / 2
        },${controlY} ${endX},${endY}`;
        setPathD(d);
      }
    };

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      // For all entries, recalculate the path
      for (let entry of entries) {
        updatePath();
      }
    });

    // Observe the container element
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Call the updatePath initially to set the initial path
    updatePath();

    // Clean up the observer on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
        className,
      )}
      style={{
        overflow: "visible",
      }}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeOpacity="1"
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          className="transform-gpu"
          id={id}
          gradientUnits={"userSpaceOnUse"}
          initial={{
            x1: "0%",
            x2: "0%",
            y1: "0%",
            y2: "0%",
          }}
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
            repeat: Infinity,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
          <stop stopColor={gradientStartColor}></stop>
          <stop offset="32.5%" stopColor={gradientStopColor}></stop>
          <stop
            offset="100%"
            stopColor={gradientStopColor}
            stopOpacity="0"
          ></stop>
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
