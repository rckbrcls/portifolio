import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

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
  const loadTimeoutRef = useRef<number>();
  const readyStateCheckRef = useRef<number>();
  const hasNotifiedLoadRef = useRef(false);
  const loadStartTimeRef = useRef<number>();

  const clearLoadGuards = useCallback(() => {
    if (typeof window === "undefined") return;

    if (typeof loadTimeoutRef.current === "number") {
      window.clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = undefined;
    }
    if (typeof readyStateCheckRef.current === "number") {
      window.clearInterval(readyStateCheckRef.current);
      readyStateCheckRef.current = undefined;
    }
  }, []);

  const parsedSrc = useMemo(() => {
    if (!src) return null;
    try {
      return new URL(src);
    } catch (error) {
      return null;
    }
  }, [src]);

  const markIframeAsLoaded = useCallback(() => {
    clearLoadGuards();
    setIsLoaded((prev) => (prev ? prev : true));
    loadStartTimeRef.current = undefined;

    if (!hasNotifiedLoadRef.current) {
      hasNotifiedLoadRef.current = true;
      onLoad?.();
    }
  }, [clearLoadGuards, onLoad]);

  useEffect(() => {
    return () => {
      clearLoadGuards();
    };
  }, [clearLoadGuards]);

  useEffect(() => {
    // Reset loading state quando src mudar
    setIsLoaded(false);
    hasNotifiedLoadRef.current = false;
    loadStartTimeRef.current = Date.now();
  }, [src]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    clearLoadGuards();

    if (!parsedSrc) return;

    // Detect iframe readiness proactively so the loading overlay cannot get stuck when the load event is flaky.
    const attemptReadyStateCheck = () => {
      const iframe = iframeRef.current;
      if (!iframe) return false;

      try {
        const doc = iframe.contentDocument ?? iframe.contentWindow?.document;
        if (!doc) return false;
        const startedAt = loadStartTimeRef.current;
        const elapsed = startedAt ? Date.now() - startedAt : undefined;
        const hasWaitedLongEnough = elapsed === undefined || elapsed >= 800;
        const hasBodyContent = Boolean(
          doc.body &&
            (doc.body.childElementCount > 0 ||
              doc.body.textContent?.trim().length),
        );

        if (
          hasWaitedLongEnough &&
          hasBodyContent &&
          (doc.readyState === "complete" || doc.readyState === "interactive")
        ) {
          markIframeAsLoaded();
          return true;
        }
      } catch (error) {
        // Cross-origin frames will throw; rely on load event or timeout fallback.
      }

      return false;
    };

    if (attemptReadyStateCheck()) {
      return () => {
        clearLoadGuards();
      };
    }

    readyStateCheckRef.current = window.setInterval(() => {
      if (attemptReadyStateCheck()) {
        clearLoadGuards();
      }
    }, 500);

    loadTimeoutRef.current = window.setTimeout(() => {
      markIframeAsLoaded();
    }, 12000);

    return () => {
      clearLoadGuards();
    };
  }, [parsedSrc, clearLoadGuards, markIframeAsLoaded]);

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
      if (!parsedSrc) return;

      if (event.origin !== parsedSrc.origin) return;

      if (event.data?.type === "LOADED") {
        markIframeAsLoaded();
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
      markIframeAsLoaded();
    };

    iframe.addEventListener("load", handleIframeLoad);
    window.addEventListener("message", handleMessage);

    return () => {
      iframe.removeEventListener("load", handleIframeLoad);
      window.removeEventListener("message", handleMessage);
    };
  }, [parsedSrc, autoResize, markIframeAsLoaded]);

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
    background: "#0f0f0f",
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

  const loadingOverlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    background:
      "radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.08), rgba(0, 0, 0, 0.65))",
    backdropFilter: "blur(8px)",
    color: "#f8f9fa",
    pointerEvents: "none",
    zIndex: 10,
  };

  const loadingCardStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderRadius: "28px",
    padding: "12px 24px",
    background: "rgba(15, 15, 15, 0.8)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)",
  };

  const spinnerStyle: React.CSSProperties = {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255, 255, 255, 0.25)",
    borderTop: "2px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

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
  } else if (!parsedSrc) {
    validationError = {
      heading: "Error: Invalid URL",
    };
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
            <div style={loadingOverlayStyle}>
              <div style={loadingCardStyle}>
                <div style={spinnerStyle} />
                <span>Loading {title}...</span>
              </div>
            </div>
          )}

          <div style={iframeWrapperStyle}>
            <iframe
              ref={iframeRef}
              src={src}
              title={title}
              onLoad={markIframeAsLoaded}
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
          background: #0f0f0f;
          border-radius: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SmartIframe;
