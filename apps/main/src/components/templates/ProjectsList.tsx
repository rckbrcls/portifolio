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
    initializeFilters(languages)
  );
  const [frameworkFilter, setFrameworkFilter] = useState(
    initializeFilters(frameworks)
  );
  const [databaseFilter, setDatabaseFilter] = useState(
    initializeFilters(databases)
  );
  const [toolOrLibraryFilter, setToolOrLibraryFilter] = useState(
    initializeFilters(toolsAndLibraries)
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
          (tech) => tech.toLowerCase() === filter.name.toLowerCase()
        )
      )
    );
  }, [activeFilters]);

  return (
    <div className="flex flex-col text-center py-20 w-11/12 mx-auto">
      <div
        className="md:h-[85svh] flex flex-col justify-center items-center pt-8 
      mb-20 pb-20"
      >
        <Title word="Projects" type="blur" gradient />
        <div className="lg:mt-10 mb-4 flex justify-between items-center w-full">
          <SubTitle className="text-start font-bold">Filter</SubTitle>
          <button
            className="glass-dark flex items-center gap-2 px-4 py-1 rounded-full
             active:scale-95 duration-500 select-none bg-zinc-500
              hover:bg-zinc-800 active:bg-zinc-800"
            onClick={resetFilter}
          >
            <FaBroom />
            <p className="text-sm font-bold">Clear filter</p>
          </button>
        </div>
        <div className="grid md:grid-cols-2 w-full gap-2">
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
          className="animate-bounce max-md:mt-10 lg:bottom-10 md:absolute"
        />
      </div>
      <ProjectAccordion projects={filteredProjects} />
    </div>
  );
}
