import React, { useRef, useEffect, useState } from "react";

interface SmartIframeProps {
  src: string;
  title: string;
  onLoad?: () => void;
  className?: string;
  height?: number | string;
  autoResize?: boolean;
  width?: number | string;
  aspectRatio?: number | string;
  targetViewportWidth?: number;
}

const SmartIframe: React.FC<SmartIframeProps> = ({
  src,
  title,
  onLoad,
  className,
  height: heightProp = "100vh",
  autoResize = true,
  width: widthProp = "100%",
  aspectRatio,
  targetViewportWidth,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [computedHeight, setComputedHeight] = useState<number | string>(
    heightProp,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Reset loading state quando src mudar
    setIsLoaded(false);
  }, [src]);

  useEffect(() => {
    setComputedHeight(heightProp);
  }, [heightProp]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const node = containerRef.current;
    if (!node) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setContainerSize({ width, height });
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [targetViewportWidth]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // Comunicação inteligente para ajustar altura
    const handleMessage = (event: MessageEvent) => {
      // Validar URL antes de usar
      let originToCheck: string;
      try {
        originToCheck = new URL(src).origin;
      } catch (error) {
        console.warn("Invalid URL for origin validation:", src);
        return;
      }

      if (event.origin !== originToCheck) return;

      if (event.data?.type === "LOADED") {
        setIsLoaded(true);
        onLoad?.();
      }

      if (!autoResize) return;

      if (event.data?.type === "RESIZE") {
        const incomingHeight = event.data.height;
        if (
          typeof incomingHeight === "number" ||
          typeof incomingHeight === "string"
        ) {
          setComputedHeight(incomingHeight);
        }
      }
    };

    // Handler para quando o iframe carrega
    const handleIframeLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    iframe.addEventListener("load", handleIframeLoad);
    window.addEventListener("message", handleMessage);

    return () => {
      iframe.removeEventListener("load", handleIframeLoad);
      window.removeEventListener("message", handleMessage);
    };
  }, [src, onLoad, autoResize]);

  const resolvedHeight =
    typeof computedHeight === "number" ? `${computedHeight}px` : computedHeight;
  const resolvedWidth =
    typeof widthProp === "number" ? `${widthProp}px` : widthProp;
  const resolvedAspectRatio =
    typeof aspectRatio === "number" ? aspectRatio.toString() : aspectRatio;

  const parseAspectRatioValue = (ratio?: number | string) => {
    if (!ratio) return undefined;
    if (typeof ratio === "number") {
      return ratio;
    }

    const cleaned = ratio.replace(/\s/g, "");
    if (!cleaned) return undefined;

    if (cleaned.includes("/")) {
      const [numStr, denomStr] = cleaned.split("/");
      const numerator = Number(numStr);
      const denominator = Number(denomStr);
      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        return numerator / denominator;
      }
      return undefined;
    }

    const numeric = Number(cleaned);
    return Number.isFinite(numeric) ? numeric : undefined;
  };

  const aspectRatioValue = parseAspectRatioValue(resolvedAspectRatio);

  const baseViewportWidth = targetViewportWidth;
  const baseViewportHeight =
    baseViewportWidth && aspectRatioValue
      ? baseViewportWidth / aspectRatioValue
      : undefined;

  const scale =
    baseViewportWidth && containerSize.width
      ? Math.min(containerSize.width / baseViewportWidth, 1)
      : 1;

  const scaledHeight =
    baseViewportWidth && baseViewportHeight
      ? baseViewportHeight * scale
      : undefined;

  const containerStyle: React.CSSProperties = {
    width: resolvedWidth,
    overflow: "hidden",
  };

  if (scaledHeight !== undefined) {
    containerStyle.height = `${scaledHeight}px`;
    containerStyle.maxHeight = resolvedHeight;
  } else {
    containerStyle.height = resolvedHeight;
  }

  if (resolvedAspectRatio) {
    containerStyle.aspectRatio = resolvedAspectRatio;
  }

  const iframeWrapperStyle: React.CSSProperties = baseViewportWidth
    ? {
        width: `${baseViewportWidth}px`,
        height: baseViewportHeight ? `${baseViewportHeight}px` : "100%",
        transform: `scale(${scale})`,
        transformOrigin: "top left",
      }
    : {
        width: "100%",
        height: "100%",
      };

  const iframeStyle: React.CSSProperties = baseViewportWidth
    ? {
        width: `${baseViewportWidth}px`,
        height: baseViewportHeight ? `${baseViewportHeight}px` : "100%",
        border: "none",
        borderRadius: "0",
        boxShadow: "none",
        opacity: isLoaded ? 1 : 0.3,
        transition: "opacity 0.3s ease",
      }
    : {
        width: "100%",
        height: "100%",
        border: "none",
        borderRadius: "0",
        boxShadow: "none",
        opacity: isLoaded ? 1 : 0.3,
        transition: "opacity 0.3s ease",
      };

  const fallbackHeight =
    scaledHeight !== undefined ? `${scaledHeight}px` : resolvedHeight;

  const renderErrorState = (heading: string) => (
    <div
      style={{
        height: "100%",
        width: "100%",
        padding: "40px",
        textAlign: "center",
        border: "2px solid #202020",
        backgroundColor: "#101010",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        boxSizing: "border-box",
      }}
    >
      <p className="text-lg">{heading}</p>
    </div>
  );

  let validationError: { heading: string } | undefined;

  if (!src) {
    validationError = {
      heading: "Error: No URL provided",
    };
  } else {
    try {
      new URL(src);
    } catch (error) {
      validationError = {
        heading: "Error: Invalid URL",
      };
    }
  }

  return (
    <div
      className={`smart-iframe-container ${className || ""}`}
      ref={containerRef}
      style={{ ...containerStyle, minHeight: fallbackHeight }}
    >
      {validationError ? (
        renderErrorState(validationError.heading)
      ) : (
        <>
          {/* Loading indicator - menos obstrutivo */}
          {!isLoaded && (
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                zIndex: 10,
                background: "rgba(0, 0, 0, 0.8)",
                color: "white",
                padding: "8px 16px",
                borderRadius: "20px",
                fontSize: "14px",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
                <span>Loading {title}...</span>
              </div>
            </div>
          )}

          <div style={iframeWrapperStyle}>
            <iframe
              ref={iframeRef}
              src={src}
              title={title}
              onLoad={() => {
                setIsLoaded(true);
                onLoad?.();
              }}
              style={iframeStyle}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
              loading="lazy"
            />
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .smart-iframe-container {
          position: relative;
          width: 100%;
          height: 100%;
          background: #f8f9fa;
          border-radius: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SmartIframe;
