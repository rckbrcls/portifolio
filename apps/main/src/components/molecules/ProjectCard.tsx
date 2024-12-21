import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Route } from "next";
import { IProject } from "@/interface/IProject";
import SubTitle from "../atoms/SubTitle";
import { techStackIcons } from "../../../public/data/techStackIcons";
import Text from "@/components/atoms/Text";

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard = ({ project }: IProjectCardProps) => {
  const linkUrl = `project/${project.slug}` as Route;

  const renderTechStack = () => {
    return (
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <div
            key={tech}
            className="glass-dark flex items-center gap-2 rounded-lg px-4 py-1"
          >
            {techStackIcons[tech as keyof typeof techStackIcons]}
            <p className="text-sm font-bold">{tech}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderImage = () => {
    if (!project.coverImage) return null;

    return (
      <Image
        className="select-none"
        src={project.coverImage}
        alt="Project Cover"
        fill
        style={{ objectFit: "cover" }}
        quality={100}
        loading="lazy"
      />
    );
  };

  return (
    <Link href={linkUrl}>
      <div
        className={`group flex h-full transform-gpu cursor-pointer select-none flex-col justify-between rounded-lg border border-zinc-800 bg-zinc-950/5 delay-75 duration-500 hover:scale-[1.02] active:scale-[1.02] md:flex-row md:pl-2 md:pt-2`}
      >
        {project.microRoute && (
          <div className="absolute -right-2 -top-2 z-20 rounded-full bg-purple-500 px-4 py-1">
            <p className="text-sm font-bold">Microfrontend</p>
          </div>
        )}

        <div className="flex w-full select-none flex-col gap-2 p-5 text-left md:w-1/2">
          <SubTitle>{project.name}</SubTitle>

          <div className="glass-dark mt-4 flex w-full items-center justify-between gap-2 rounded-lg bg-transparent p-4 text-center">
            <Text className="font-bold">Members</Text>
            <div className="flex flex-wrap justify-end gap-2">
              {project?.members.map((member, index) => (
                <div
                  key={index}
                  className="glass-dark flex items-center rounded-lg px-4"
                >
                  <Text className="text-nowrap">{member}</Text>
                </div>
              ))}
            </div>
          </div>
          {renderTechStack()}
        </div>

        <div className="flex w-full md:w-1/2 md:items-end md:justify-end md:overflow-hidden">
          <div className="relative h-80 w-full overflow-hidden rounded-lg delay-75 duration-500 group-hover:scale-[1.01] group-active:scale-[1.01] md:left-4 md:top-10 md:group-hover:-translate-x-2 md:group-hover:-translate-y-6 md:group-active:-translate-x-2 md:group-active:-translate-y-6">
            {renderImage()}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
