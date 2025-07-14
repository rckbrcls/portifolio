// Opções de filtro lazy-loaded
export const getFilterOptions = () => ({
  // Apenas as opções mais usadas primeiro
  frameworks: [
    { value: "react", label: "React" },
    { value: "next.js", label: "Next.js" },
    { value: "typescript", label: "TypeScript" },
  ],

  languages: [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
  ],

  databases: [
    { value: "mongodb", label: "MongoDB" },
    { value: "postgresql", label: "PostgreSQL" },
  ],

  tools: [
    { value: "tailwind", label: "Tailwind" },
    { value: "node.js", label: "Node.js" },
    { value: "webpack", label: "Webpack" },
  ],
});

export const getAllFilterOptions = async () => {
  // Carrega as opções completas sob demanda
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    frameworks: [
      { value: "react", label: "React" },
      { value: "react-native", label: "React Native" },
      { value: "next.js", label: "Next.js" },
      { value: "express", label: "Express" },
      { value: "solid.js", label: "Solid.js" },
      { value: "flask", label: "Flask" },
    ],

    languages: [
      { value: "javascript", label: "JavaScript" },
      { value: "typescript", label: "TypeScript" },
      { value: "python", label: "Python" },
    ],

    databases: [
      { value: "mongodb", label: "MongoDB" },
      { value: "postgresql", label: "PostgreSQL" },
      { value: "redis", label: "Redis" },
    ],

    tools: [
      { value: "tailwind", label: "Tailwind" },
      { value: "node.js", label: "Node.js" },
      { value: "webpack", label: "Webpack" },
      { value: "aws", label: "AWS" },
    ],
  };
};
