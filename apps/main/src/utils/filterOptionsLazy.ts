import {
  SiReact,
  SiNextdotjs,
  SiExpress,
  SiSolid,
  SiFlask,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiNodedotjs,
  SiWebpack,
} from "./iconsLazy";

// Listas de opções de filtro estáticas
export const frameworksList = [
  { value: "react", label: "React", icon: SiReact },
  { value: "react-native", label: "React Native", icon: SiReact },
  { value: "next.js", label: "Next.js", icon: SiNextdotjs },
  { value: "express", label: "Express", icon: SiExpress },
  { value: "solid.js", label: "Solid.js", icon: SiSolid },
  { value: "flask", label: "Flask", icon: SiFlask },
];

export const languagesList = [
  { value: "javascript", label: "JavaScript", icon: SiJavascript },
  { value: "typescript", label: "TypeScript", icon: SiTypescript },
  { value: "python", label: "Python", icon: SiPython },
];

export const databasesList = [
  { value: "mongodb", label: "MongoDB", icon: SiMongodb },
  { value: "postgresql", label: "PostgreSQL", icon: SiPostgresql },
];

export const toolsAndLibrariesList = [
  { value: "tailwind", label: "Tailwind", icon: SiTailwindcss },
  { value: "node.js", label: "Node.js", icon: SiNodedotjs },
  { value: "webpack", label: "Webpack", icon: SiWebpack },
];

// Carregamento dinâmico das listas de filtros (apenas se necessário)
export const loadFilterOptions = async () => {
  return {
    frameworksList,
    languagesList,
    databasesList,
    toolsAndLibrariesList,
  };
};
