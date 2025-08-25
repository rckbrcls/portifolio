"use client";

import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import { MdOutlineWebAsset } from "react-icons/md";
import Title from "../atoms/Title";
import { Text } from "../atoms/Text";
import { MultiSelect } from "../ui/multi-select";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import { DirectionAwareTabs } from "@/components/ui/direction-aware-tabs";

// Simplified imports - only what's actually used
import {
  loadFeaturedProjects,
  loadAllProjectsAfterInitial,
} from "../../utils/projectsLazy";

import {
  getFilterOptions,
  getAllFilterOptions,
} from "../../utils/filterOptionsOptimized";
import { IProject } from "@/interface/IProject";

// Lazy load the ProjectCard component
const ProjectCard = lazy(() => import("../molecules/ProjectCard"));

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
  const [projectsData, setProjectsData] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [localServer, setLocalServer] = useState(false);
  const [activeTabId, setActiveTabId] = useState<number>(0);
  const [filterOptions, setFilterOptions] = useState(getFilterOptions());
  const [filterOptionsLoaded, setFilterOptionsLoaded] = useState(false);

  useEffect(() => {
    const loadAllOptions = async () => {
      if (!filterOptionsLoaded) {
        const allOptions = await getAllFilterOptions();
        setFilterOptions(allOptions);
        setFilterOptionsLoaded(true);
      }
    };

    loadAllOptions();
  }, [filterOptionsLoaded]);

  // Carregamento inicial dos projetos com ultra compressão
  useEffect(() => {
    const loadProjectsData = async () => {
      try {
        const featuredProjects = await loadFeaturedProjects();
        setProjectsData(featuredProjects);
        setLoading(false);

        const allProjects = await loadAllProjectsAfterInitial();
        setProjectsData(allProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
        setLoading(false);
      }
    };

    loadProjectsData();
  }, []);

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
    let projectsToFilter = projectsData;

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
  }, [activeFilters, projectsData, localServer, activeTabId]);

  const normalProjects = useMemo(
    () => filteredProjects.filter((p) => !p.microRoute),
    [filteredProjects],
  );
  const microfrontendProjects = useMemo(
    () => filteredProjects.filter((p) => p.microRoute),
    [filteredProjects],
  );

  // Tabs para DirectionAwareTabs
  const tabs = [
    {
      id: 0,
      label: "Projects",
      content: (
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 h-10 w-10 animate-spin rounded-full border-t-4 border-solid border-purple-400"></div>
              <span className="text-lg font-semibold text-purple-400 drop-shadow">
                Loading projects...
              </span>
              <span className="mt-2 text-xs text-purple-300">
                Please wait while we fetch your awesome projects!
              </span>
            </div>
          }
        >
          {normalProjects.length === 0 ? (
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
              {normalProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </Suspense>
      ),
    },
    {
      id: 1,
      label: "Microfrontend",
      content: (
        <>
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center py-12">
                <div className="mb-4 h-10 w-10 animate-spin rounded-full border-t-4 border-solid border-pink-400"></div>
                <span className="text-lg font-semibold text-pink-400 drop-shadow">
                  Loading microfrontends...
                </span>
                <span className="mt-2 text-xs text-pink-300">
                  Please wait while we fetch your microfrontend projects!
                </span>
              </div>
            }
          >
            {microfrontendProjects.length === 0 ? (
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
              <div className="flex flex-col gap-4">
                {microfrontendProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            )}
          </Suspense>
          {/* removed load-more functionality: all microfrontends are now loaded into projectsData
                  and filtering determines what's shown */}
        </>
      ),
    },
  ];

  // Ajuste do maxCount conforme a largura de tela
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setMaxCount(0); // exibe todas as opções no dropdown sem resumo
      } else {
        setMaxCount(0);
      }
    }
  }, []);

  return (
    <div className="mx-auto flex flex-col items-center justify-center gap-4 pb-20 pt-24">
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
        className="mb-10 flex w-full flex-col items-center justify-center gap-8 border-b border-zinc-700/30 px-4 pb-10 text-center"
      >
        <Title word="Projects" type="blur" gradient />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 18,
            duration: 0.7,
            delay: 0.3,
          }}
          className="max-w-4xl"
        >
          <Text className="text-center leading-relaxed">
            Here you can explore some of my personal, professional, and academic
            projects. You can filter them by the technologies used in each one.
          </Text>
        </motion.div>
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
        className="max-md:scrollbar-hidden mx-auto flex w-11/12 items-end gap-4 max-md:w-full max-md:overflow-x-scroll max-md:px-4"
      >
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="frameworks" className="font-semibold text-purple-400">
            Frameworks
          </Label>
          <MultiSelect
            id="frameworks"
            className="min-w-60 rounded-lg font-medium text-gray-200"
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
            className="min-w-60 rounded-lg font-medium text-gray-200"
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
            className="min-w-60 rounded-lg font-medium text-gray-200"
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
            className="min-w-60 rounded-lg font-medium text-gray-200"
            options={filterOptions.tools}
            onValueChange={(selected) => handleFilterChange("tools", selected)}
            defaultValue={filters.tools}
            placeholder="Select tools"
            maxCount={maxCount}
          />
        </div>
        <button
          onClick={resetFilter}
          className="glass-dark flex h-12 w-min items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-2 font-semibold text-purple-300 transition duration-700 hover:scale-[1.01] hover:bg-zinc-800 active:scale-95 active:bg-zinc-800"
        >
          reset filter
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
        className="flex w-11/12 flex-col gap-10"
      >
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="glass-dark h-96 w-full animate-pulse rounded-xl border-2 border-purple-900/20"
            />
          ))
        ) : (
          <DirectionAwareTabs
            tabs={tabs}
            onLocalServerChange={(v) => setLocalServer(v)}
            onTabChange={(id) => setActiveTabId(id)}
          />
        )}
      </motion.div>
    </div>
  );
}
