import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import SubTitle from "../atoms/SubTitle";
import ProjectCard from "../molecules/ProjectCard";
import { IProject } from "@/interface/IProject";
import { MdDesignServices } from "react-icons/md";
import { IoCodeWorking } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import Title from "../atoms/Title";

interface ProjectAccordionProps {
  projects: IProject[];
}

// TODO: otimizar isso
export const iconsGroup: Record<string, React.ReactNode> = {
  // Languages
  designing: React.createElement(MdDesignServices),
  working: React.createElement(IoCodeWorking),
  finished: React.createElement(FaCheck),
};

export default function ProjectAccordion({ projects }: ProjectAccordionProps) {
  const groupedProjects = projects.reduce<Record<string, IProject[]>>(
    (acc, project) => {
      acc[project.status as keyof typeof acc].push(project);
      return acc;
    },
    { finished: [], working: [], designing: [] },
  );

  return (
    <Accordion
      defaultValue={["finished", "working", "designing"]}
      type="multiple"
    >
      {Object.entries(groupedProjects).map(
        ([status, projects]) =>
          projects.length > 0 && (
            <AccordionItem
              key={status}
              value={status}
              className="border-zinc-700/30"
            >
              <AccordionTrigger>
                <Title
                  type="blur"
                  word={status.charAt(0).toUpperCase() + status.slice(1)}
                  className="my-10 flex items-center gap-4"
                />
              </AccordionTrigger>
              <AccordionContent className="overflow-visible">
                <div className="flex w-full flex-col gap-14 p-4">
                  {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ),
      )}
    </Accordion>
  );
}
