"use client";

import React, { useState, useMemo, useEffect } from "react";
import Title from "../atoms/Title";
import SubTitle from "../atoms/SubTitle";
import { DownButton } from "../atoms/DownButton";
import { MultiSelect } from "../ui/multi-select";
import { Label } from "../ui/label";

import {
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiExpress,
  SiSolid,
  SiFlask,
  SiSwift,
  SiSvelte,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiDart,
  SiGo,
  SiRust,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiNodedotjs,
  SiWebpack,
  SiBun,
  SiDeno,
} from "react-icons/si";

import { projects } from "../../../public/data/projects/projects";
import ProjectCard from "../molecules/ProjectCard";

// Definições de opções para cada categoria
const frameworksList = [
  { value: "react", label: "React", icon: SiReact },
  { value: "react-native", label: "React Native", icon: SiReact },
  { value: "next.js", label: "Next.js", icon: SiNextdotjs },
  { value: "express", label: "Express", icon: SiExpress },
  { value: "solid.js", label: "Solid.js", icon: SiSolid },
  { value: "flask", label: "Flask", icon: SiFlask },
  // { value: "flutter", label: "Flutter", icon: SiFlutter },
  // { value: "swift", label: "Swift", icon: SiSwift },
  // { value: "svelte", label: "Svelte", icon: SiSvelte },
];

const languagesList = [
  { value: "javascript", label: "JavaScript", icon: SiJavascript },
  { value: "typescript", label: "TypeScript", icon: SiTypescript },
  { value: "python", label: "Python", icon: SiPython },
  // { value: "dart", label: "Dart", icon: SiDart },
  // { value: "go", label: "Go", icon: SiGo },
  // { value: "rust", label: "Rust", icon: SiRust },
];

const databasesList = [
  { value: "mongodb", label: "MongoDB", icon: SiMongodb },
  { value: "postgresql", label: "PostgreSQL", icon: SiPostgresql },
];

const toolsAndLibrariesList = [
  { value: "tailwind", label: "Tailwind", icon: SiTailwindcss },
  { value: "node.js", label: "Node.js", icon: SiNodedotjs },
  { value: "webpack", label: "Webpack", icon: SiWebpack },
  // { value: "bun", label: "Bun", icon: SiBun },
  // { value: "deno", label: "Deno", icon: SiDeno },
];

// Estado centralizado para filtros
type FilterState = {
  frameworks: string[];
  languages: string[];
  databases: string[];
  tools: string[];
};

// Estado inicial (tudo vazio)
const initialFilterState: FilterState = {
  frameworks: [],
  languages: [],
  databases: [],
  tools: [],
};

export default function ProjectsList() {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [maxCount, setMaxCount] = useState(3);

  // Função de reset de filtros (torna tudo vazio)
  const resetFilter = () => {
    setFilters(initialFilterState);
  };

  // Handler genérico para atualizar um tipo de filtro
  const handleFilterChange = (
    category: keyof FilterState,
    selected: string[],
  ) => {
    console.log(filters, selected);
    setFilters((prev) => ({ ...prev, [category]: selected }));
  };

  // Converte as seleções do usuário em um único array de tecnologias ativas
  const activeFilters = useMemo(() => {
    return [
      ...filters.frameworks,
      ...filters.languages,
      ...filters.databases,
      ...filters.tools,
    ];
  }, [filters]);

  // Lógica de filtragem
  const filteredProjects = useMemo(() => {
    // Se não houver nenhum filtro selecionado, retorne todos os projetos
    if (activeFilters.length === 0) {
      return projects;
    }

    // Caso existam filtros selecionados, retornamos projetos que tenham
    // pelo menos um dos filtros no techStack (lógica de OR).
    return projects.filter((project) => {
      // Normaliza o techStack do projeto para letras minúsculas
      const lowerTechs = project.techStack.map((t) =>
        t.toLowerCase().replace(/\s+/g, "-"),
      );

      console.log(lowerTechs);
      // Verifica se pelo menos uma das techs selecionadas está presente
      return lowerTechs.some((tech) => activeFilters.includes(tech));
    });
  }, [activeFilters]);

  // Ajuste do maxCount conforme a largura de tela
  useEffect(() => {
    if (window.innerWidth < 768) {
      setMaxCount(0); // exibe todas as opções no dropdown sem resumo
    } else {
      setMaxCount(8);
    }
  }, []);

  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <div className="flex h-svh w-11/12 flex-col items-center justify-center gap-4 md:w-2/3">
        <Title className="md:text-9xl" word="Projects" type="blur" gradient />
        <SubTitle className="text-center text-xl md:text-3xl">
          Here you can explore some of my personal, professional, and academic
          projects. You can filter them by the technologies used in each one.
        </SubTitle>
        <DownButton text="See my projects" />
      </div>

      {/* Seção de Filtros */}
      <div className="max-md:scrollbar-hidden mx-auto flex w-11/12 items-end gap-4 pt-24 max-md:w-full max-md:overflow-x-scroll max-md:px-4">
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="frameworks">Frameworks</Label>
          <MultiSelect
            id="frameworks"
            className="min-w-60 rounded-lg"
            options={frameworksList}
            onValueChange={(selected) =>
              handleFilterChange("frameworks", selected)
            }
            defaultValue={filters.frameworks}
            placeholder="Select frameworks"
            maxCount={maxCount}
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="languages">Languages</Label>
          <MultiSelect
            id="languages"
            className="min-w-60 rounded-lg"
            options={languagesList}
            onValueChange={(selected) =>
              handleFilterChange("languages", selected)
            }
            defaultValue={filters.languages}
            placeholder="Select languages"
            maxCount={maxCount}
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="databases">Databases</Label>
          <MultiSelect
            id="databases"
            className="min-w-60 rounded-lg"
            options={databasesList}
            onValueChange={(selected) =>
              handleFilterChange("databases", selected)
            }
            defaultValue={filters.databases}
            placeholder="Select databases"
            maxCount={maxCount}
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="tools">Tools &amp; Libraries</Label>
          <MultiSelect
            id="tools"
            className="min-w-60 rounded-lg"
            options={toolsAndLibrariesList}
            onValueChange={(selected) => handleFilterChange("tools", selected)}
            defaultValue={filters.tools}
            placeholder="Select tools"
            maxCount={maxCount}
          />
        </div>
        <button
          onClick={resetFilter}
          className="glass-dark flex h-12 w-min items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-2 transition duration-700 hover:scale-[1.01] hover:bg-zinc-800 active:scale-95 active:bg-zinc-800"
        >
          reset filter
        </button>
      </div>

      {/* Lista de Projetos Filtrados */}
      <div className="mb-14 mt-10 flex w-11/12 flex-col gap-10">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
