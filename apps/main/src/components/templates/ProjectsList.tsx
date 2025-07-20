"use client";

import React, { useState, useMemo, useEffect, lazy, Suspense } from "react";
import Title from "../atoms/Title";
import SubTitle from "../atoms/SubTitle";
import { DownButton } from "../atoms/DownButton";
import { MultiSelect } from "../ui/multi-select";
import { Label } from "../ui/label";
import { motion } from "framer-motion";

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
  const [displayedProjects, setDisplayedProjects] = useState<IProject[]>([]);
  const [projectsPerBatch] = useState(6);
  const [currentBatch, setCurrentBatch] = useState(1);

  // State para opções de filtro
  const [filterOptions, setFilterOptions] = useState(getFilterOptions());
  const [filterOptionsLoaded, setFilterOptionsLoaded] = useState(false);

  // Carregamento das opções de filtro completas
  useEffect(() => {
    const loadAllOptions = async () => {
      if (!filterOptionsLoaded) {
        const allOptions = await getAllFilterOptions();
        setFilterOptions(allOptions);
        setFilterOptionsLoaded(true);
      }
    };

    // Carrega as opções completas após um delay
    setTimeout(loadAllOptions, 1500);
  }, [filterOptionsLoaded]);

  // Carregamento inicial dos projetos com ultra compressão
  useEffect(() => {
    const loadProjectsData = async () => {
      try {
        // Carrega primeiro os dados comprimidos (menor bundle)
        const featuredProjects = await loadFeaturedProjects();
        setProjectsData(featuredProjects);
        setDisplayedProjects(featuredProjects);
        setLoading(false);

        // Carrega o restante em background após 500ms
        setTimeout(async () => {
          const allProjects = await loadAllProjectsAfterInitial();
          setProjectsData(allProjects);

          // Verifica se não há filtros ativos (todos os arrays estão vazios)
          const hasActiveFilters =
            filters.frameworks.length > 0 ||
            filters.languages.length > 0 ||
            filters.databases.length > 0 ||
            filters.tools.length > 0;

          // Se não há filtros ativos, atualiza os projetos exibidos também
          if (!hasActiveFilters) {
            setDisplayedProjects(
              allProjects.slice(0, currentBatch * projectsPerBatch),
            );
          }
        }, 500);
      } catch (error) {
        console.error("Error loading projects:", error);
        setLoading(false);
      }
    };

    loadProjectsData();
  }, [projectsPerBatch]); // Removeu activeFilters e currentBatch da dependência

  // Função de reset de filtros (torna tudo vazio)
  const resetFilter = () => {
    setFilters(initialFilterState);
  };

  // Handler genérico para atualizar um tipo de filtro
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

  // Lógica de filtragem - agora aplica sobre displayedProjects se não há filtros ativos
  const filteredProjects = useMemo(() => {
    const sourceProjects =
      activeFilters.length === 0 ? displayedProjects : projectsData;

    // Se não houver nenhum filtro selecionado, retorne os projetos exibidos atualmente
    if (activeFilters.length === 0) {
      return sourceProjects;
    }

    // Caso existam filtros selecionados, retornamos projetos que tenham
    // pelo menos um dos filtros no techStack (lógica de OR).
    return sourceProjects.filter((project) => {
      // Normaliza o techStack do projeto para letras minúsculas
      const lowerTechs = project.techStack.map((t) =>
        t.toLowerCase().replace(/\s+/g, "-"),
      );

      // Verifica se pelo menos uma das techs selecionadas está presente
      return lowerTechs.some((tech) => activeFilters.includes(tech));
    });
  }, [activeFilters, projectsData, displayedProjects]);

  // Função para carregar mais projetos
  const loadMoreProjects = () => {
    if (displayedProjects.length < projectsData.length) {
      const nextBatch = currentBatch + 1;
      const endIndex = nextBatch * projectsPerBatch;
      const newDisplayedProjects = projectsData.slice(0, endIndex);
      setDisplayedProjects(newDisplayedProjects);
      setCurrentBatch(nextBatch);
    }
  };

  // Ajuste do maxCount conforme a largura de tela
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setMaxCount(0); // exibe todas as opções no dropdown sem resumo
      } else {
        setMaxCount(2);
      }
    }
  }, []);

  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex w-full flex-col items-center justify-center gap-8 px-4 py-24 text-center"
      >
        <Title className="md:text-9xl" word="Projects" type="blur" gradient />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl"
        >
          <SubTitle className="text-center text-xl md:text-3xl">
            Here you can explore some of my personal, professional, and academic
            projects. You can filter them by the technologies used in each one.
          </SubTitle>
        </motion.div>
      </motion.div>

      {/* Seção de Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-md:scrollbar-hidden mx-auto grid w-11/12 grid-cols-2 items-end gap-4 pb-12 max-md:w-full max-md:grid-cols-1 max-md:overflow-x-scroll max-md:px-4"
      >
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="frameworks">Frameworks</Label>
          <MultiSelect
            id="frameworks"
            className="min-w-60 rounded-lg"
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
          <Label htmlFor="languages">Languages</Label>
          <MultiSelect
            id="languages"
            className="min-w-60 rounded-lg"
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
          <Label htmlFor="databases">Databases</Label>
          <MultiSelect
            id="databases"
            className="min-w-60 rounded-lg"
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
          <Label htmlFor="tools">Tools &amp; Libraries</Label>
          <MultiSelect
            id="tools"
            className="min-w-60 rounded-lg"
            options={filterOptions.tools}
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
      </motion.div>

      {/* Lista de Projetos Filtrados */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-14 mt-10 flex w-11/12 flex-col gap-10"
      >
        {loading ? (
          // Loading skeleton com o estilo original
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="glass-dark h-96 w-full animate-pulse rounded-lg"
            />
          ))
        ) : (
          <Suspense fallback={<div>Loading projects...</div>}>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Suspense>
        )}

        {/* Botão Load More - só aparece se não há filtros ativos e há mais projetos para carregar */}
        {!loading &&
          activeFilters.length === 0 &&
          displayedProjects.length < projectsData.length && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={loadMoreProjects}
                className="glass-dark flex items-center justify-center gap-2 text-nowrap rounded-lg px-8 py-3 transition duration-700 hover:scale-[1.01] hover:bg-zinc-800 active:scale-95 active:bg-zinc-800"
              >
                Load More Projects (
                {projectsData.length - displayedProjects.length} remaining)
              </button>
            </div>
          )}
      </motion.div>
    </div>
  );
}
