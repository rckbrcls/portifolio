"use client";

import React, { useState, useMemo } from "react";
import Title from "../atoms/Title";
import SubTitle from "../atoms/SubTitle";
import FilterSection from "../molecules/FilterSection";
import { projects } from "../../../public/data/projects/projects";
import {
  languages,
  frameworks,
  databases,
  toolsAndLibraries,
} from "../../../public/data/techStack";
import ProjectAccordion from "../organisms/ProjectAccordion";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaBroom } from "react-icons/fa6";

// Helper types
type TechItem<T> = { name: T; active: boolean };

// Utility functions
const createTechItem = <T,>(name: T): TechItem<T> => ({ name, active: false });
const initializeFilters = <T,>(items: T[]): TechItem<T>[] =>
  items.map(createTechItem);

export default function ProjectsList() {
  const [languageFilter, setLanguageFilter] = useState(
    initializeFilters(languages),
  );
  const [frameworkFilter, setFrameworkFilter] = useState(
    initializeFilters(frameworks),
  );
  const [databaseFilter, setDatabaseFilter] = useState(
    initializeFilters(databases),
  );
  const [toolOrLibraryFilter, setToolOrLibraryFilter] = useState(
    initializeFilters(toolsAndLibraries),
  );

  const resetFilter = () => {
    setLanguageFilter(initializeFilters(languages));
    setFrameworkFilter(initializeFilters(frameworks));
    setDatabaseFilter(initializeFilters(databases));
    setToolOrLibraryFilter(initializeFilters(toolsAndLibraries));
  };

  const activeFilters = [
    ...languageFilter,
    ...frameworkFilter,
    ...databaseFilter,
    ...toolOrLibraryFilter,
  ].filter((item) => item.active);

  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) return projects;
    return projects.filter((project) =>
      activeFilters.some((filter) =>
        project.techStack.some(
          (tech) => tech.toLowerCase() === filter.name.toLowerCase(),
        ),
      ),
    );
  }, [activeFilters]);

  return (
    <div className="mx-auto flex w-11/12 flex-col py-20 text-center">
      <div className="mb-20 flex flex-col items-center justify-center pb-20 pt-8 md:h-[85svh]">
        <Title word="Projects" type="blur" gradient />
        <div className="mb-4 flex w-full items-center justify-between lg:mt-10">
          <SubTitle className="text-start font-bold">Filter</SubTitle>
          <button
            className="glass-dark flex select-none items-center gap-2 rounded-full bg-zinc-500 px-4 py-1 duration-500 hover:bg-zinc-800 active:scale-95 active:bg-zinc-800"
            onClick={resetFilter}
          >
            <FaBroom />
            <p className="text-sm font-bold">Clear filter</p>
          </button>
        </div>
        <div className="grid w-full gap-2 md:grid-cols-2">
          <FilterSection
            title="Languages"
            filter={languageFilter}
            setFilter={setLanguageFilter}
          />
          <FilterSection
            title="Frameworks"
            filter={frameworkFilter}
            setFilter={setFrameworkFilter}
          />
          <FilterSection
            title="Databases"
            filter={databaseFilter}
            setFilter={setDatabaseFilter}
          />
          <FilterSection
            title="Tools & Libraries"
            filter={toolOrLibraryFilter}
            setFilter={setToolOrLibraryFilter}
          />
        </div>
        <FaArrowAltCircleDown
          size={30}
          className="animate-bounce max-md:mt-10 md:absolute lg:bottom-10"
        />
      </div>
      <ProjectAccordion projects={filteredProjects} />
    </div>
  );
}
