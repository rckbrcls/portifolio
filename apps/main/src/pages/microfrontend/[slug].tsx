"use client";

import React from "react";
import MicroLayout from "@/components/MicroLayout";
import ProjectViewer from "@/components/ProjectViewer";
import { useRouter } from "next/router";
import Head from "next/head";
import { loadProjects } from "../../utils/projectsLazy";

const ProjectMicrofrontend: React.FC = () => {
  const router = useRouter();
  const [project, setProject] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadProject = async () => {
      if (router.query.slug) {
        try {
          const projects = await loadProjects();
          const foundProject = projects.find(
            (project) => project.slug === router.query.slug,
          );
          setProject(foundProject);
        } catch (error) {
          console.error("Error loading project data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadProject();
  }, [router.query.slug]);

  if (isLoading) {
    return (
      <MicroLayout projectGitRoute="" projectHomeRoute="/projects">
        <Head>
          <title>Carregando... | rckbrcls</title>
        </Head>
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
            <p>Carregando projeto...</p>
          </div>
        </div>
      </MicroLayout>
    );
  }

  if (!project) {
    return (
      <MicroLayout projectGitRoute="" projectHomeRoute="/projects">
        <Head>
          <title>Projeto não encontrado | rckbrcls</title>
        </Head>
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Projeto não encontrado
            </h1>
            <p className="mb-6 text-gray-600">
              O projeto "{router.query.slug}" não foi encontrado.
            </p>
            <a
              href="/projects"
              className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
            >
              Ver todos os projetos
            </a>
          </div>
        </div>
      </MicroLayout>
    );
  }

  return (
    <div className="microfrontend-page">
      <MicroLayout
        projectGitRoute={project?.gitLink as string}
        projectHomeRoute={`/project/${project?.slug}`}
      >
        <Head>
          <title>Micro {project?.name} | rckbrcls</title>
          <meta name="description" content={project?.description} />
        </Head>

        <ProjectViewer
          slug={project.slug}
          name={project?.name}
          microRoute={project?.microRoute}
        />
      </MicroLayout>
    </div>
  );
};

export default ProjectMicrofrontend;
