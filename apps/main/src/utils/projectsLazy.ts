import { IProject } from "@/interface/IProject";

// Função para carregar projetos dinamicamente (todos os dados)
export const loadProjects = async (): Promise<IProject[]> => {
  const { projects } = await import("../../public/data/projects/projects");
  return projects;
};

// Carregar apenas os projetos essenciais primeiro
export const loadFeaturedProjects = async (): Promise<IProject[]> => {
  const { projects } = await import("../../public/data/projects/projects");
  // Retorna apenas os primeiros projetos para carregamento inicial rápido
  return projects.slice(0, 3);
};

// Carregar todos os projetos após o carregamento inicial com delay ainda maior
export const loadAllProjectsAfterInitial = async (): Promise<IProject[]> => {
  // Delay maior para otimizar o carregamento inicial
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return loadProjects();
};

// Carregar projetos por batch para melhor performance
export const loadProjectsBatch = async (
  start: number = 0,
  limit: number = 6,
): Promise<IProject[]> => {
  const allProjects = await loadProjects();
  return allProjects.slice(start, start + limit);
};

// Carregar projeto específico por slug com fallback otimizado
export const loadProjectBySlug = async (
  slug: string,
): Promise<IProject | undefined> => {
  // Primeiro tenta nos projetos comprimidos (mais rápido)
  const featuredProjects = await loadFeaturedProjects();
  const featuredProject = featuredProjects.find(
    (project) => project.slug === slug,
  );

  if (featuredProject) {
    return featuredProject;
  }

  // Se não encontrar, carrega todos os projetos
  const allProjects = await loadProjects();
  return allProjects.find((project) => project.slug === slug);
};
