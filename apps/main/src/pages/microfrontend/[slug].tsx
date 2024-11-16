"use client";

import React from "react";
import MicroLayout from "@/components/MicroLayout";
import { projects } from "../../../public/data/projects/projects";
import { useRouter } from "next/router";

const ProjectMicrofrontend: React.FC = () => {
  const router = useRouter();
  const project = projects.find(
    (project) => project.slug === router.query.slug
  );
  return (
    <MicroLayout
      projectGitRoute={project?.gitLink as string}
      projectHomeRoute={`/project/${project?.slug}`}
    >
      <iframe
        src={`${project?.microRoute ?? ""}`}
        style={{ height: "100vh", width: "100vw", border: "none" }}
        title={`${project?.name ?? "N/A"}`}
      />
    </MicroLayout>
  );
};

export default ProjectMicrofrontend;
