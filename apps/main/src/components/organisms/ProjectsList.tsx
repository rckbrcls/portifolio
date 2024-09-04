"use client";

import React, { useState, useMemo } from "react";
import Title from "../atoms/Title";
import Text from "../atoms/Text";
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
import SubTitle from "../atoms/SubTitle";
import { IProject } from "@/interface/IProject";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FaArrowAltCircleDown } from "react-icons/fa";

type TechItem<T> = {
  name: T;
  active: boolean;
};

type ProjectGroups = {
  finished: IProject[];
  working: IProject[];
  designing: IProject[];
};

export default function ProjectsList() {
  const createTechItem = <T,>(name: T): TechItem<T> => ({
    name,
    active: false,
  });

  const initialLanguageStack: TechItem<Language>[] =
    languages.map(createTechItem);
  const initialFrameworkStack: TechItem<Framework>[] =
    frameworks.map(createTechItem);
  const initialDatabaseStack: TechItem<Database>[] =
    databases.map(createTechItem);
  const initialToolOrLibraryStack: TechItem<ToolOrLibrary>[] =
    toolsAndLibraries.map(createTechItem);

  const [languageFilter, setLanguageFilter] =
    useState<TechItem<Language>[]>(initialLanguageStack);
  const [frameworkFilter, setFrameworkFilter] = useState<TechItem<Framework>[]>(
    initialFrameworkStack
  );
  const [databaseFilter, setDatabaseFilter] =
    useState<TechItem<Database>[]>(initialDatabaseStack);
  const [toolOrLibraryFilter, setToolOrLibraryFilter] = useState<
    TechItem<ToolOrLibrary>[]
  >(initialToolOrLibraryStack);

  const handleSelectFilter = <T,>(
    index: number,
    filter: TechItem<T>[],
    setFilter: React.Dispatch<React.SetStateAction<TechItem<T>[]>>
  ) => {
    setFilter((prevFilter) =>
      prevFilter.map((item, i) =>
        i === index ? { ...item, active: !item.active } : item
      )
    );
  };

  const resetFilter = () => {
    setLanguageFilter(initialLanguageStack);
    setFrameworkFilter(initialFrameworkStack);
    setDatabaseFilter(initialDatabaseStack);
    setToolOrLibraryFilter(initialToolOrLibraryStack);
  };

  const activeFilters = [
    ...languageFilter,
    ...frameworkFilter,
    ...databaseFilter,
    ...toolOrLibraryFilter,
  ].filter((item) => item.active);

  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) {
      return projects;
    }

    return projects.filter((project) =>
      activeFilters.some((key) =>
        project.techStack.some(
          (tech) => tech.toLowerCase() === key.name.toLowerCase()
        )
      )
    );
  }, [activeFilters]);

  const groupedProjects = useMemo<ProjectGroups>(() => {
    return filteredProjects.reduce<ProjectGroups>(
      (acc, project) => {
        acc[project.status as keyof ProjectGroups].push(project);
        return acc;
      },
      { finished: [], working: [], designing: [] }
    );
  }, [filteredProjects]);

  const buttonBaseStyle =
    "glass-dark px-4 rounded-full active:scale-95 hover:scale-110 duration-500 select-none";
  const filterButtonStyle = (active: boolean) =>
    `${buttonBaseStyle} hover:scale-110 duration-500 select-none ${
      active
        ? "bg-blue-500 hover:bg-blue-800 active:bg-blue-800 font-bold"
        : "hover:bg-zinc-900 active:bg-zinc-900"
    }`;

  const headerStyle = "flex flex-col text-center py-20 w-11/12 mx-auto";

  return (
    <div className={headerStyle}>
      <div className="h-[90svh] flex flex-col justify-center items-center mb-20 pb-20">
        <Title gradient>Projects</Title>
        <div className="mt-10 mb-4 flex justify-between items-center w-full">
          <SubTitle className="text-start font-bold">Filter</SubTitle>
          <button
            className={`${buttonBaseStyle} bg-zinc-500 text-nowrap
         hover:bg-zinc-800 active:bg-zinc-800`}
            onClick={resetFilter}
          >
            <Text>Clear filter</Text>
          </button>
        </div>
        <div className="grid md:grid-cols-2 divide-zinc-800 w-full gap-2">
          <div className="flex items-center justify-start rounded-xl glass-dark p-4 gap-2 flex-wrap">
            <p className="text-start font-bold text-xl mr-2">Languages</p>
            {languageFilter.map((item, index) => (
              <button
                key={item.name}
                className={filterButtonStyle(item.active)}
                onClick={() =>
                  handleSelectFilter(index, languageFilter, setLanguageFilter)
                }
              >
                <Text>{item.name}</Text>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-start rounded-xl glass-dark p-4 gap-2 flex-wrap">
            <p className="text-start font-bold text-xl mr-2">Frameworks</p>
            {frameworkFilter.map((item, index) => (
              <button
                key={item.name}
                className={filterButtonStyle(item.active)}
                onClick={() =>
                  handleSelectFilter(index, frameworkFilter, setFrameworkFilter)
                }
              >
                <Text>{item.name}</Text>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-start rounded-xl glass-dark p-4 gap-2 flex-wrap">
            <p className="text-start font-bold text-xl mr-2">Databases</p>
            {databaseFilter.map((item, index) => (
              <button
                key={item.name}
                className={filterButtonStyle(item.active)}
                onClick={() =>
                  handleSelectFilter(index, databaseFilter, setDatabaseFilter)
                }
              >
                <Text>{item.name}</Text>
              </button>
            ))}
          </div>
          <div className="flex items-center justify-start rounded-xl glass-dark p-4 gap-2 flex-wrap">
            <p className="text-start font-bold text-xl mr-2">
              Tools & Libraries
            </p>
            {toolOrLibraryFilter.map((item, index) => (
              <button
                key={item.name}
                className={filterButtonStyle(item.active)}
                onClick={() =>
                  handleSelectFilter(
                    index,
                    toolOrLibraryFilter,
                    setToolOrLibraryFilter
                  )
                }
              >
                <Text>{item.name}</Text>
              </button>
            ))}
          </div>
        </div>
        <FaArrowAltCircleDown
          size={30}
          className="animate-bounce lg:bottom-10 bottom-5 absolute"
        />
      </div>
      <Accordion
        type="multiple"
        defaultValue={["finished", "working", "designing"]}
      >
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
                <AccordionContent className="lg:py-10 py-4">
                  <div className="grid lg:grid-cols-2 md:auto-rows-fr gap-4 lg:gap-10 w-full">
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
