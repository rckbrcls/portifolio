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
            className="glass-dark rounded-lg flex gap-2 items-center px-4 py-1"
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
        className={`group cursor-pointer border border-zinc-800 rounded-lg md:pt-2 md:pl-2 hover:scale-[1.02]
       delay-75 duration-500 transform-gpu justify-between flex bg-zinc-950/5
     md:flex-row flex-col h-full active:scale-[1.02] select-none`}
      >
        {project.microRoute && (
          <div className="bg-purple-500 absolute -right-2 -top-2 rounded-full px-4 py-1 z-20">
            <p className="text-sm font-bold">Microfrontend</p>
          </div>
        )}

        <div className="p-5 text-left md:w-1/2 w-full flex flex-col gap-2 select-none">
          <SubTitle>{project.name}</SubTitle>

          <div
            className="flex mt-4 items-center bg-transparent text-center 
          glass-dark p-4 rounded-lg w-full justify-between gap-2"
          >
            <Text className="font-bold">Members</Text>
            <div className="flex flex-wrap gap-2 justify-end">
              {project?.members.map((member, index) => (
                <div
                  key={index}
                  className="glass-dark rounded-lg px-4 flex items-center"
                >
                  <Text className="text-nowrap">{member}</Text>
                </div>
              ))}
            </div>
          </div>
          {renderTechStack()}
        </div>

        <div className="md:w-1/2 w-full flex md:justify-end md:items-end md:overflow-hidden">
          <div
            className="w-full h-80 md:top-10 md:left-4 relative 
            group-hover:scale-[1.01] group-active:scale-[1.01]
      md:group-hover:-translate-y-10 md:group-hover:-translate-x-4
      md:group-active:-translate-y-10 md:group-active:-translate-x-4
      duration-500 delay-75 rounded-lg overflow-hidden"
          >
            {renderImage()}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
