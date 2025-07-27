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
        <SmartIframe
          src={fullUrl}
          title={name || slug}
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
      <h3>Project not available as microfrontend</h3>
      <p>The project "{slug}" doesn't have a microfrontend URL configured.</p>
    </div>
  );
};

export default ProjectViewer;
