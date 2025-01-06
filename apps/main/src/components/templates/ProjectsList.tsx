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
import { Label } from "../ui/label";
import SubTitle from "../atoms/SubTitle";

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
      <div className="flex h-svh w-11/12 flex-col items-center justify-center gap-4 md:w-2/3">
        <Title className="md:text-9xl" word="Projects" type="blur" gradient />
        <SubTitle className="text-center max-md:text-xl">
          Here you can explore some of my personal, professional, and academic
          projects. You can filter them by the technologies used in each one.
        </SubTitle>
        <DownButton text="See my projects" />
      </div>
      <div className="max-md:scrollbar-hidden grid w-full grid-cols-2 gap-2 pt-24 max-md:flex max-md:overflow-x-scroll max-md:px-4 max-md:pb-4 md:w-11/12">
        <div>
          <Label htmlFor="frameworks">Frameworks</Label>
          <MultiSelect
            id="frameworks"
            className="min-w-60 rounded-lg"
            options={frameworksList}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder="Select frameworks"
            maxCount={maxCount}
          />
        </div>
        <div>
          <Label htmlFor="languages">Languages</Label>
          <MultiSelect
            id="languages"
            className="min-w-60 rounded-lg"
            options={frameworksList}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder="Select frameworks"
            maxCount={maxCount}
          />
        </div>
        <div>
          <Label htmlFor="databases">Data Bases</Label>
          <MultiSelect
            id="databases"
            className="min-w-60 rounded-lg"
            options={frameworksList}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder="Select frameworks"
            maxCount={maxCount}
          />
        </div>
        <div>
          <Label htmlFor="tools">Tools</Label>
          <MultiSelect
            id="tools"
            className="min-w-60 rounded-lg"
            options={frameworksList}
            onValueChange={setSelectedFrameworks}
            defaultValue={selectedFrameworks}
            placeholder="Select frameworks"
            maxCount={maxCount}
          />
        </div>
      </div>
      <div className="mt-20 w-11/12">
        <ProjectAccordion projects={filteredProjects} />
      </div>
    </div>
  );
}
