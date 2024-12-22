import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Route } from "next";
import { IProject } from "@/interface/IProject";
import SubTitle from "../atoms/SubTitle";
import { techStackIcons } from "../../../public/data/techStackIcons";
import Text from "@/components/atoms/Text";
import { AiFillGithub } from "react-icons/ai";
import { BiSolidComponent } from "react-icons/bi";
import { FaPager } from "react-icons/fa6";

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
    <div
      className={`glass-dark group flex h-full transform-gpu select-none flex-col justify-between rounded-lg delay-75 duration-500 hover:scale-[1.02] active:scale-[1.02] md:flex-row md:pl-2 md:pt-2`}
    >
      {project.microRoute && (
        <div className="absolute -right-2 -top-2 z-20 rounded-full bg-purple-500 px-4 py-1">
          <p className="text-sm font-bold">Microfrontend</p>
        </div>
      )}

      <div className="flex w-full select-none flex-col gap-2 p-5 text-left md:w-2/3">
        <SubTitle className="mb-4">{project.name}</SubTitle>

        <Text className="w-full text-start">{project?.description}</Text>

        <hr className="my-4 w-full border-t border-zinc-700/30" />

        <div className="flex w-full items-start justify-between gap-4">
          <Text className="text-nowrap font-bold">Tech Stack</Text>
          <div className="flex flex-wrap justify-end gap-2">
            {project?.techStack?.map((tech, index) => (
              <div
                key={index}
                className="glass-dark flex items-center gap-2 rounded-lg px-4"
              >
                {techStackIcons[tech as keyof typeof techStackIcons]}
                <Text>{tech}</Text>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-4 w-full border-t border-zinc-700/30" />

        <div className="flex w-full items-start justify-between gap-4">
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

        <hr className="my-4 w-full border-t border-zinc-700/30" />

        <div className="flex gap-2">
          {project?.gitLink && (
            <a
              className="glass-dark flex w-full items-center justify-center gap-2 rounded-lg py-2 duration-500 hover:scale-[1.02] hover:bg-zinc-900 active:scale-95 active:bg-zinc-900"
              href={project.gitLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AiFillGithub size={28} />
              <Text className="max-sm:hidden">Repository</Text>
            </a>
          )}
          {project?.microRoute && (
            <Link
              href={`/microfrontend/${project.slug}`}
              className="glass-dark flex w-full items-center justify-center gap-2 rounded-lg py-2 duration-500 hover:scale-[1.02] hover:bg-zinc-900 active:scale-95 active:bg-zinc-900"
            >
              <BiSolidComponent size={28} />
              <Text className="max-sm:hidden">Microfrontend</Text>
            </Link>
          )}
          {project?.link && (
            <a
              href={project.link}
              className="glass-dark flex w-full items-center justify-center gap-2 rounded-lg py-2 duration-500 hover:scale-[1.02] hover:bg-zinc-900 active:scale-95 active:bg-zinc-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPager size={28} />
              <Text className="max-sm:hidden">Project</Text>
            </a>
          )}
        </div>
      </div>

      <div className="flex w-full md:w-1/2 md:items-end md:justify-end md:overflow-hidden">
        <div className="relative h-full w-full overflow-hidden rounded-lg delay-75 duration-500 group-hover:scale-[1.02] group-active:scale-[1.01] max-md:h-60 md:left-4 md:top-10 md:group-hover:-translate-x-2 md:group-hover:-translate-y-6 md:group-active:-translate-x-2 md:group-active:-translate-y-6">
          {renderImage()}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
