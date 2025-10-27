"use client";

import React, { useState, useMemo, useEffect } from "react";
import { MdOutlineWebAsset } from "react-icons/md";
import Title from "../atoms/Title";
import { MultiSelect } from "../ui/multi-select";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import ProjectCard from "../molecules/ProjectCard";
import { getFilterOptions } from "../../utils/filterOptionsOptimized";
import { projects } from "../../../public/data/projects/projects";
import { FaBroom } from "react-icons/fa";

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
  const [maxCount, setMaxCount] = useState(0);
  const filterOptions = getFilterOptions();

  const resetFilter = () => {
    setFilters(initialFilterState);
  };

  const handleFilterChange = (
    category: keyof FilterState,
    selected: string[],
  ) => {
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

  const filteredProjects = useMemo(() => {
    let projectsToFilter = projects;

    if (activeFilters.length > 0) {
      projectsToFilter = projectsToFilter.filter((project) => {
        const lowerTechs = project.techStack.map((t) =>
          t.toLowerCase().replace(/\s+/g, "-"),
        );
        return lowerTechs.some((tech) => activeFilters.includes(tech));
      });
    }

    return projectsToFilter;
  }, [activeFilters]);

  // Ajuste do maxCount conforme a largura de tela
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMaxCount(0);
    }
  }, []);

  return (
    <div className="flex flex-col items-end justify-end gap-4 max-sm:pb-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 18,
          duration: 0.9,
        }}
        className="mb-5 flex w-full flex-col items-end border-b border-zinc-700/30 px-4 text-end max-sm:px-2"
      >
        <Title word="Projects" type="blur" gradient />
      </motion.div>

      {/* Seção de Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 18,
          duration: 0.7,
        }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-md:scrollbar-hidden flex w-11/12 items-end gap-2 max-md:overflow-x-scroll max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] max-sm:px-4"
      >
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="frameworks" className="font-semibold text-purple-400">
            Frameworks
          </Label>
          <MultiSelect
            id="frameworks"
            className="min-w-60 font-medium text-gray-200 max-sm:h-10"
            options={filterOptions.frameworks}
            onValueChange={(selected) =>
              handleFilterChange("frameworks", selected)
            }
            defaultValue={filters.frameworks}
            placeholder="Select frameworks"
            maxCount={maxCount}
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="languages" className="font-semibold text-purple-400">
            Languages
          </Label>
          <MultiSelect
            id="languages"
            className="min-w-60 font-medium text-gray-200 max-sm:h-10"
            options={filterOptions.languages}
            onValueChange={(selected) =>
              handleFilterChange("languages", selected)
            }
            defaultValue={filters.languages}
            placeholder="Select languages"
            maxCount={maxCount}
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="databases" className="font-semibold text-purple-400">
            Databases
          </Label>
          <MultiSelect
            id="databases"
            className="min-w-60 font-medium text-gray-200 max-sm:h-10"
            options={filterOptions.databases}
            onValueChange={(selected) =>
              handleFilterChange("databases", selected)
            }
            defaultValue={filters.databases}
            placeholder="Select databases"
            maxCount={maxCount}
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="tools" className="font-semibold text-purple-400">
            Tools &amp; Libraries
          </Label>
          <MultiSelect
            id="tools"
            className="min-w-60 font-medium text-gray-200 max-sm:h-10"
            options={filterOptions.tools}
            onValueChange={(selected) => handleFilterChange("tools", selected)}
            defaultValue={filters.tools}
            placeholder="Select tools"
            maxCount={maxCount}
          />
        </div>
        <button
          onClick={resetFilter}
          className="flex h-12 w-min items-center justify-center gap-2 text-nowrap rounded-3xl border border-zinc-700/30 bg-zinc-950 px-6 py-2 font-semibold text-purple-300 transition duration-700 hover:scale-[1.01] hover:bg-zinc-800 active:scale-95 active:bg-zinc-800 max-sm:h-10"
        >
          <FaBroom className="h-5 w-5" />
        </button>
      </motion.div>

      {/* Tabs de projetos */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 18,
          duration: 0.7,
        }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex w-11/12 flex-col gap-10 max-sm:w-full"
      >
        {filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4 flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-gradient-to-tr from-purple-400 to-purple-700">
              <MdOutlineWebAsset className="h-7 w-7 text-white" />
            </div>
            <span className="text-lg font-semibold text-purple-400 drop-shadow">
              Oops! No projects here yet.
            </span>
            <span className="mt-2 text-xs text-purple-300">
              Try changing your filters!
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
