"use client";

import React, { useState, useMemo, useEffect } from "react";
import { MdComputer, MdOutlineWebAsset } from "react-icons/md";
import Title from "../atoms/Title";
import { MultiSelect } from "../ui/multi-select";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import { DirectionAwareTabs } from "@/components/ui/direction-aware-tabs";
import ProjectCard from "../molecules/ProjectCard";
import { getFilterOptions } from "../../utils/filterOptionsOptimized";
import { microfrontendProjects } from "../../../public/data/projects/projects";
import { cn } from "@/lib/utils";
import { Computer, Trash } from "lucide-react";
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

export default function MicroList() {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [maxCount, setMaxCount] = useState(0);
  const [localServer, setLocalServer] = useState(false);
  const [activeTabId, setActiveTabId] = useState<number>(0);
  const filterOptions = getFilterOptions();

  const resetFilter = () => {
    setFilters(initialFilterState);
    setLocalServer(false);
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
    let projectsToFilter = microfrontendProjects;

    if (activeFilters.length > 0) {
      projectsToFilter = projectsToFilter.filter((project) => {
        const lowerTechs = project.techStack.map((t) =>
          t.toLowerCase().replace(/\s+/g, "-"),
        );
        return lowerTechs.some((tech) => activeFilters.includes(tech));
      });
    }

    if (localServer && activeTabId === 1) {
      projectsToFilter = projectsToFilter.filter((project) =>
        Boolean((project as any).localServer),
      );
    }

    return projectsToFilter;
  }, [activeFilters, localServer, activeTabId]);

  // Tabs para DirectionAwareTabs
  const tabs = [
    {
      id: 0,
      label: "Documentation",
      content: <></>,
    },
    {
      id: 1,
      label: "Projects",
      content: (
        <div>
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
            className="max-md:scrollbar-hidden flex w-full items-end gap-2 max-md:overflow-x-scroll max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] max-sm:px-4"
          >
            <button
              type="button"
              aria-pressed={localServer}
              onClick={() => setLocalServer(!localServer)}
              className={cn(
                "glass-dark flex h-12 w-min items-center justify-center gap-2 whitespace-nowrap rounded-3xl border px-6 py-2 font-semibold transition duration-500 max-sm:h-10",
                "transform-gpu transition-colors ease-in-out hover:scale-[1.01] active:scale-95",
                localServer
                  ? "border-white/30 bg-purple-500 bg-gradient-to-r text-white shadow-md"
                  : "text-purple-300 hover:bg-purple-500/50",
              )}
            >
              <MdComputer className="h-5 w-5" />
              Server
            </button>
            <div className="flex w-full flex-col gap-2">
              <Label
                htmlFor="frameworks"
                className="font-semibold text-purple-400"
              >
                Frameworks
              </Label>
              <MultiSelect
                id="frameworks"
                className="min-w-56 font-medium text-gray-200 max-sm:h-10"
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
              <Label
                htmlFor="languages"
                className="font-semibold text-purple-400"
              >
                Languages
              </Label>
              <MultiSelect
                id="languages"
                className="min-w-56 font-medium text-gray-200 max-sm:h-10"
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
              <Label
                htmlFor="databases"
                className="font-semibold text-purple-400"
              >
                Databases
              </Label>
              <MultiSelect
                id="databases"
                className="min-w-56 font-medium text-gray-200 max-sm:h-10"
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
                className="min-w-56 font-medium text-gray-200 max-sm:h-10"
                options={filterOptions.tools}
                onValueChange={(selected) =>
                  handleFilterChange("tools", selected)
                }
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

          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-gradient-to-tr from-pink-400 to-purple-400">
                <MdOutlineWebAsset className="h-7 w-7 text-white" />
              </div>
              <span className="text-lg font-semibold text-pink-400 drop-shadow">
                No microfrontends found!
              </span>
              <span className="mt-2 text-xs text-pink-300">
                Try adjusting your filters!
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pt-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      ),
    },
  ];

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
        className="flex w-full flex-col items-end border-b border-zinc-700/30 px-4 text-end max-sm:px-2"
      >
        <Title word="Architecture" type="blur" gradient />
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
        className="flex w-11/12 flex-col max-sm:w-full"
      >
        <DirectionAwareTabs
          tabs={tabs}
          onTabChange={(id) => setActiveTabId(id)}
        />
      </motion.div>
    </div>
  );
}
