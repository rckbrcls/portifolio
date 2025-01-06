"use client";

import React, { useState, useMemo, useEffect } from "react";
import Title from "../atoms/Title";
import FilterSection from "../molecules/FilterSection";
import { projects } from "../../../public/data/projects/projects";
import ProjectAccordion from "../organisms/ProjectAccordion";
import { DownButton } from "../atoms/DownButton";
import SubTitle from "../atoms/SubTitle";
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

const frameworksList = [
  { value: "react", label: "React", icon: SiReact },
  { value: "react-native", label: "React Native", icon: SiReact },
  { value: "nextjs", label: "Next.js", icon: SiNextdotjs },
  { value: "flutter", label: "Flutter", icon: SiFlutter },
  { value: "express", label: "Express", icon: SiExpress },
  { value: "solidjs", label: "Solid.js", icon: SiSolid },
  { value: "flask", label: "Flask", icon: SiFlask },
  { value: "swift", label: "Swift", icon: SiSwift },
  { value: "svelte", label: "Svelte", icon: SiSvelte },
];

const languagesList = [
  { value: "javascript", label: "JavaScript", icon: SiJavascript },
  { value: "typescript", label: "TypeScript", icon: SiTypescript },
  { value: "python", label: "Python", icon: SiPython },
  { value: "dart", label: "Dart", icon: SiDart },
  { value: "go", label: "Go", icon: SiGo },
  { value: "rust", label: "Rust", icon: SiRust },
];

const databasesList = [
  { value: "mongodb", label: "MongoDB", icon: SiMongodb },
  { value: "postgresql", label: "PostgreSQL", icon: SiPostgresql },
];

const toolsAndLibrariesList = [
  { value: "tailwind", label: "Tailwind", icon: SiTailwindcss },
  { value: "nodejs", label: "Node.js", icon: SiNodedotjs },
  { value: "webpack", label: "Webpack", icon: SiWebpack },
  { value: "bun", label: "Bun", icon: SiBun },
  { value: "deno", label: "Deno", icon: SiDeno },
];

// Estado centralizado para filtros
type FilterState = {
  frameworks: string[];
  languages: string[];
  databases: string[];
  tools: string[];
};

// Estado inicial
const initialFilterState: FilterState = {
  frameworks: [],
  languages: [],
  databases: [],
  tools: [],
};

export default function ProjectsList() {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [maxCount, setMaxCount] = useState(3);

  // Reset geral de filtros
  const resetFilter = () => {
    setFilters(initialFilterState);
  };

  // Função genérica para atualizar filtros dinamicamente
  const handleFilterChange = (
    category: keyof FilterState,
    selected: string[],
  ) => {
    setFilters((prev) => ({ ...prev, [category]: selected }));
  };

  // Filtragem dinâmica de projetos
  const filteredProjects = useMemo(() => {
    if (
      !filters.frameworks.length &&
      !filters.languages.length &&
      !filters.databases.length &&
      !filters.tools.length
    ) {
      return projects;
    }

    return projects.filter((project) => {
      return (
        (filters.frameworks.length === 0 ||
          project.techStack.some((tech) =>
            filters.frameworks.includes(tech.toLowerCase()),
          )) &&
        (filters.languages.length === 0 ||
          project.techStack.some((tech) =>
            filters.languages.includes(tech.toLowerCase()),
          )) &&
        (filters.databases.length === 0 ||
          project.techStack.some((tech) =>
            filters.databases.includes(tech.toLowerCase()),
          )) &&
        (filters.tools.length === 0 ||
          project.techStack.some((tech) =>
            filters.tools.includes(tech.toLowerCase()),
          ))
      );
    });
  }, [filters]);

  // Adaptação do maxCount para mobile e desktop
  useEffect(() => {
    if (window.innerWidth < 768) {
      setMaxCount(0);
    } else {
      setMaxCount(6);
    }
  }, []);

  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <div className="flex h-svh w-11/12 flex-col items-center justify-center gap-4 md:w-2/3">
        <Title className="md:text-9xl" word="Projects" type="blur" gradient />
        <SubTitle className="text-center max-md:text-xl">
          Here you can explore some of my personal, professional, and academic
          projects. You can filter them by the technologies used in each one.
        </SubTitle>
        <DownButton text="See my projects" />
      </div>

      {/* Seção de Filtros */}
      <div className="max-md:scrollbar-hidden grid-cols-1s grid w-11/12 gap-2 pt-24 max-md:flex max-md:w-full max-md:overflow-x-scroll max-md:px-4 max-md:pb-4">
        <div>
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

        <div>
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

        <div>
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

        <div>
          <Label htmlFor="tools">Tools & Libraries</Label>
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
      </div>

      {/* Lista de Projetos Filtrados */}
      <div className="w-11/12 md:mt-10">
        <ProjectAccordion projects={filteredProjects} />
      </div>
    </div>
  );
}
