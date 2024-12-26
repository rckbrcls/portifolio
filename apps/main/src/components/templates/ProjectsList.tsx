"use client";

import React, { useState, useMemo, useEffect } from "react";
import Title from "../atoms/Title";

import FilterSection from "../molecules/FilterSection";
import { projects } from "../../../public/data/projects/projects";
import {
  languages,
  frameworks,
  databases,
  toolsAndLibraries,
} from "../../../public/data/techStack";
import ProjectAccordion from "../organisms/ProjectAccordion";
import { FaBroom } from "react-icons/fa6";
import { DownButton } from "../atoms/DownButton";
import { Text } from "../atoms/Text";
import { MultiSelect } from "../ui/multi-select";

// Helper types
type TechItem<T> = { name: T; active: boolean };

// Utility functions
const createTechItem = <T,>(name: T): TechItem<T> => ({ name, active: false });
const initializeFilters = <T,>(items: T[]): TechItem<T>[] =>
  items.map(createTechItem);

const frameworksList = [
  { value: "react", label: "React", icon: FaBroom },
  { value: "nextjs", label: "Nextjs", icon: FaBroom },
  { value: "vue", label: "Vue", icon: FaBroom },
  { value: "svelte", label: "Svelte", icon: FaBroom },
  { value: "ember", label: "Ember", icon: FaBroom },
];

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

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    "nextjs",
    "svelte",
  ]);

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

  const [maxCount, setMaxCount] = useState(3);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMaxCount(0);
    } else {
      setMaxCount(3);
    }
  }, []);

  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <div className="flex w-11/12 flex-col items-center justify-center max-md:pt-20 md:h-svh">
        <Title className="md:text-9xl" word="Projects" type="blur" gradient />
        {/* <div className="mt-10 grid w-full gap-2">
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
          <button
            className="glass-dark flex w-min select-none items-center gap-2 rounded-full bg-zinc-500 px-4 py-0.5 duration-500 hover:bg-zinc-800 active:scale-95 active:bg-zinc-800 md:py-1"
            onClick={resetFilter}
          >
            <FaBroom />
            <Text className="text-nowrap max-md:text-sm">Clear filter</Text>
          </button>
        </div>
        <DownButton /> */}
        <DownButton />
      </div>
      <div className="max-md:scrollbar-hidden grid w-full grid-cols-2 gap-4 max-md:flex max-md:overflow-x-scroll max-md:px-4 max-md:pb-4 max-md:pt-14 md:w-11/12">
        <MultiSelect
          className="rounded-lg max-md:min-w-60"
          options={frameworksList}
          onValueChange={setSelectedFrameworks}
          defaultValue={selectedFrameworks}
          placeholder="Select frameworks"
          maxCount={maxCount}
        />
        <MultiSelect
          className="rounded-lg max-md:min-w-60"
          options={frameworksList}
          onValueChange={setSelectedFrameworks}
          defaultValue={selectedFrameworks}
          placeholder="Select frameworks"
          maxCount={maxCount}
        />
        <MultiSelect
          className="rounded-lg max-md:min-w-60"
          options={frameworksList}
          onValueChange={setSelectedFrameworks}
          defaultValue={selectedFrameworks}
          placeholder="Select frameworks"
          maxCount={maxCount}
        />
        <MultiSelect
          className="rounded-lg max-md:min-w-60"
          options={frameworksList}
          onValueChange={setSelectedFrameworks}
          defaultValue={selectedFrameworks}
          placeholder="Select frameworks"
          maxCount={maxCount}
        />
      </div>
      <div className="w-11/12">
        <ProjectAccordion projects={filteredProjects} />
      </div>
    </div>
  );
}
