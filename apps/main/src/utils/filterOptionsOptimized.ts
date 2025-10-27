import { projects, microfrontendProjects } from "../../public/data/projects/projects";
import { frameworks, languages, databases, toolsAndLibraries } from "../../public/data/techStack";

type FilterOption = { value: string; label: string };

// Helper para extrair tech stacks únicas de um array de projetos
const extractUniqueTechStacks = (projectList: typeof projects | typeof microfrontendProjects) => {
  const allTechs = projectList.flatMap((project) => project.techStack);
  return Array.from(new Set(allTechs));
};

// Helper para categorizar tech stacks
const categorizeTechStacks = (techStacks: string[]) => {
  const categorized = {
    frameworks: [] as FilterOption[],
    languages: [] as FilterOption[],
    databases: [] as FilterOption[],
    tools: [] as FilterOption[],
  };

  techStacks.forEach((tech) => {
    const value = tech.toLowerCase().replace(/\s+/g, "-");
    const option = { value, label: tech };

    if (frameworks.includes(tech as any)) {
      categorized.frameworks.push(option);
    } else if (languages.includes(tech as any)) {
      categorized.languages.push(option);
    } else if (databases.includes(tech as any)) {
      categorized.databases.push(option);
    } else if (toolsAndLibraries.includes(tech as any)) {
      categorized.tools.push(option);
    }
  });

  return categorized;
};

// Opções de filtro para projetos regulares
export const getProjectsFilterOptions = () => {
  const uniqueTechs = extractUniqueTechStacks(projects);
  return categorizeTechStacks(uniqueTechs);
};

// Opções de filtro para microfrontends
export const getMicrofrontendsFilterOptions = () => {
  const uniqueTechs = extractUniqueTechStacks(microfrontendProjects);
  return categorizeTechStacks(uniqueTechs);
};

// Opções de filtro para todos os projetos (fallback/geral)
export const getFilterOptions = () => {
  const allProjects = [...projects, ...microfrontendProjects];
  const uniqueTechs = extractUniqueTechStacks(allProjects);
  return categorizeTechStacks(uniqueTechs);
};
