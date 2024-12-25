"use client";

import React from "react";
import MicroLayout from "@/components/MicroLayout";
import { projects } from "../../../public/data/projects/projects";
import { useRouter } from "next/router";
import Head from "next/head";

const ProjectMicrofrontend: React.FC = () => {
  const router = useRouter();
  const project = projects.find(
    (project) => project.slug === router.query.slug,
  );
  return (
    <MicroLayout
      projectGitRoute={project?.gitLink as string}
      projectHomeRoute={`/project/${project?.slug}`}
    >
      <Head>
        <title>Micro {project?.name} | rckbrcls</title>
      </Head>
      <iframe
        loading="lazy"
        src={`${project?.microRoute ?? ""}`}
        style={{ height: "100vh", width: "100vw", border: "none" }}
        title={`${project?.name ?? "N/A"}`}
      />
    </MicroLayout>
  );
};

export default ProjectMicrofrontend;
