import React, { useRef, useEffect, useState } from "react";

interface SmartIframeProps {
  src: string;
  title: string;
  onLoad?: () => void;
  className?: string;
}

const SmartIframe: React.FC<SmartIframeProps> = ({
  src,
  title,
  onLoad,
  className,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(600);
  const [isLoaded, setIsLoaded] = useState(false);

  // Validar URL antes de renderizar
  if (!src) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          border: "2px dashed #f87171",
          borderRadius: "8px",
          backgroundColor: "#fef2f2",
        }}
      >
        <h3 style={{ color: "#dc2626" }}>Error: No URL provided</h3>
        <p>SmartIframe component requires a valid URL.</p>
      </div>
    );
  }

  // Verificar se a URL é válida
  try {
    new URL(src);
  } catch (error) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          border: "2px dashed #f87171",
          borderRadius: "8px",
          backgroundColor: "#fef2f2",
        }}
      >
        <h3 style={{ color: "#dc2626" }}>Error: Invalid URL</h3>
        <p>The URL "{src}" is not valid.</p>
      </div>
    );
  }

  useEffect(() => {
    // Reset loading state quando src mudar
    setIsLoaded(false);
  }, [src]);

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

      if (event.data.type === "RESIZE") {
        setHeight(event.data.height);
      }

      if (event.data.type === "LOADED") {
        setIsLoaded(true);
        onLoad?.();
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
  }, [src, onLoad]);

  return (
    <div className={`smart-iframe-container ${className || ""}`}>
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
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

      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          borderRadius: "0",
          boxShadow: "none",
          opacity: isLoaded ? 1 : 0.3,
          transition: "opacity 0.3s ease",
        }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        loading="lazy"
      />

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
          height: 100vh;
          background: #f8f9fa;
          border-radius: 0;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SmartIframe;
