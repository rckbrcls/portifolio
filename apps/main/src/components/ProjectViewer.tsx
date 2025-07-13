import React from "react";
import SmartIframe from "./SmartIframe";

interface ProjectViewerProps {
  slug: string;
  name?: string;
  microRoute?: string;
}

const ProjectViewer: React.FC<ProjectViewerProps> = ({
  slug,
  name,
  microRoute = "",
}) => {
  // Se microRoute existe e não está vazio, usar ele diretamente
  if (microRoute && microRoute.trim() !== "") {
    const fullUrl = microRoute;

    return (
      <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        {/* Badge de projeto */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "#10b981",
            color: "white",
            padding: "8px 16px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "600",
            zIndex: 100,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          🚀 {name || slug}
        </div>

        <SmartIframe
          src={fullUrl}
          title={name || slug}
          onLoad={() => console.log(`✅ ${slug} carregado`)}
          className="project-iframe"
        />

        <style jsx>{`
          .project-iframe {
            width: 100% !important;
            height: 100vh !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            overflow: hidden;
            background: white;
          }
        `}</style>
      </div>
    );
  }

  // Fallback se microRoute não existir
  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        border: "2px dashed #ddd",
        borderRadius: "8px",
      }}
    >
      <h3>Projeto não disponível como microfrontend</h3>
      <p>O projeto "{slug}" não tem uma URL de microfrontend configurada.</p>
    </div>
  );
};

export default ProjectViewer;
