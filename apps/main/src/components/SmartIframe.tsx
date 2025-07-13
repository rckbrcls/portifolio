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
        <h3 style={{ color: "#dc2626" }}>Erro: URL não fornecida</h3>
        <p>O componente SmartIframe precisa de uma URL válida.</p>
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
        <h3 style={{ color: "#dc2626" }}>Erro: URL inválida</h3>
        <p>A URL "{src}" não é válida.</p>
      </div>
    );
  }

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
        console.warn("URL inválida para validação de origem:", src);
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

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [src, onLoad]);

  return (
    <div className={`smart-iframe-container ${className || ""}`}>
      {/* Loading indicator */}
      {!isLoaded && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #3498db",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 10px",
              }}
            ></div>
            <p>Carregando {title}...</p>
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={src}
        title={title}
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
