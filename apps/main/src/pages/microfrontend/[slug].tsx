"use client";

import React from "react";
import MicroLayout from "@/components/MicroLayout";
import { useRouter } from "next/router";
import Head from "next/head";
import { loadProjects } from "../../utils/projectsLazy";

const ProjectMicrofrontend: React.FC = () => {
  const router = useRouter();
  const [project, setProject] = React.useState<any>(null);

  React.useEffect(() => {
    const loadProject = async () => {
      if (router.query.slug) {
        const projects = await loadProjects();
        const foundProject = projects.find(
          (project) => project.slug === router.query.slug,
        );
        setProject(foundProject);
      }
    };

    loadProject();
  }, [router.query.slug]);

  if (!project) {
    return <div>Loading...</div>;
  }
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
