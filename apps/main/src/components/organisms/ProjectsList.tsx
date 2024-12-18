"use client";

import React, { useState, useMemo } from "react";
import Title from "../atoms/Title";
import SubTitle from "../atoms/SubTitle";
import Card from "@/components/molecules/Card";
import { projects } from "../../../public/data/projects/projects";
import {
  Language,
  Framework,
  Database,
  ToolOrLibrary,
  languages,
  frameworks,
  databases,
  toolsAndLibraries,
} from "../../../public/data/techStack";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { IProject } from "@/interface/IProject";

// Helper types
type TechItem<T> = { name: T; active: boolean };
type ProjectGroups = {
  finished: IProject[];
  working: IProject[];
  designing: IProject[];
};

// Component styles
const styles = {
  buttonBase:
    "glass-dark px-4 py-1 rounded-full active:scale-95 duration-500 select-none",
  filterButton: (active: boolean) =>
    `${styles.buttonBase} ${
      active
        ? "bg-blue-500 hover:bg-blue-800 active:bg-blue-800 font-bold"
        : "hover:bg-zinc-900 active:bg-zinc-900"
    }`,
  header: "flex flex-col text-center py-20 w-11/12 mx-auto",
};

// Utility functions
const createTechItem = <T,>(name: T): TechItem<T> => ({ name, active: false });

const initializeFilters = <T,>(items: T[]): TechItem<T>[] =>
  items.map(createTechItem);

// Reusable filter component
const FilterSection = <T,>({
  title,
  filter,
  setFilter,
}: {
  title: string;
  filter: TechItem<T>[];
  setFilter: React.Dispatch<React.SetStateAction<TechItem<T>[]>>;
}) => {
  const handleSelect = (index: number) => {
    setFilter((prevFilter) =>
      prevFilter.map((item, i) =>
        i === index ? { ...item, active: !item.active } : item
      )
    );
  };

  return (
    <div className="flex items-start justify-start rounded-xl glass-dark p-4 gap-2 flex-wrap">
      <p className="text-start font-bold text-xl mr-2">{title}</p>
      {filter.map((item, index) => (
        <button
          key={item.name as string}
          className={styles.filterButton(item.active)}
          onClick={() => handleSelect(index)}
        >
          <p className="text-sm font-bold">{String(item.name)}</p>
        </button>
      ))}
    </div>
  );
};

// Main component
export default function ProjectsList() {
  // Initial filter states
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

  // Reset filters
  const resetFilter = () => {
    setLanguageFilter(initializeFilters(languages));
    setFrameworkFilter(initializeFilters(frameworks));
    setDatabaseFilter(initializeFilters(databases));
    setToolOrLibraryFilter(initializeFilters(toolsAndLibraries));
  };

  // Active filters
  const activeFilters = [
    ...languageFilter,
    ...frameworkFilter,
    ...databaseFilter,
    ...toolOrLibraryFilter,
  ].filter((item) => item.active);

  // Filtered projects
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

  // Grouped projects by status
  const groupedProjects = useMemo<ProjectGroups>(() => {
    return filteredProjects.reduce<ProjectGroups>(
      (acc, project) => {
        acc[project.status as keyof ProjectGroups].push(project);
        return acc;
      },
      { finished: [], working: [], designing: [] }
    );
  }, [filteredProjects]);

  return (
    <div className={styles.header}>
      <div className="md:h-[85svh] flex flex-col justify-center items-center pt-8 mb-20 pb-20">
        <Title word="Projects" type="blur" gradient />
        <div className="lg:mt-10 mb-4 flex justify-between items-center w-full">
          <SubTitle className="text-start font-bold">Filter</SubTitle>
          <button
            className={`${styles.buttonBase} bg-zinc-500 hover:bg-zinc-800 active:bg-zinc-800`}
            onClick={resetFilter}
          >
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
      <Accordion type="single">
        {Object.entries(groupedProjects).map(
          ([status, projects]) =>
            projects.length > 0 && (
              <AccordionItem
                className="border mb-2 glass-dark rounded-xl px-4 lg:px-10"
                key={status}
                value={status}
              >
                <AccordionTrigger>
                  <SubTitle className="text-start">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SubTitle>
                </AccordionTrigger>
                <AccordionContent className="transition duration-700 py-10">
                  <div className="grid lg:grid-cols-2 md:auto-rows-fr gap-14 w-full p-4">
                    {projects.map((project) => (
                      <Card
                        key={project.slug + project.name}
                        project={project}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
        )}
      </Accordion>
    </div>
  );
}
