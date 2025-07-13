import { IProject } from "@/interface/IProject";

// Função para carregar projetos dinamicamente
export const loadProjects = async (): Promise<IProject[]> => {
  const { projects } = await import("../../public/data/projects/projects");
  return projects;
};

// Carregar apenas os projetos essenciais inicialmente
export const loadFeaturedProjects = async (count: number = 6): Promise<IProject[]> => {
  const allProjects = await loadProjects();
  return allProjects.slice(0, count);
};
