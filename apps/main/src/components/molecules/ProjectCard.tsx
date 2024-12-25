import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Route } from "next";
import { IProject } from "@/interface/IProject";
import SubTitle from "../atoms/SubTitle";
import { techStackIcons } from "../../../public/data/techStackIcons";
import { Text } from "@/components/atoms/Text";
import { AiFillGithub } from "react-icons/ai";
import { BiSolidComponent } from "react-icons/bi";
import { FaPager } from "react-icons/fa6";

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard = ({ project }: IProjectCardProps) => {
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
      className={`glass-dark group flex transform-gpu select-none justify-between rounded-lg delay-75 duration-500 hover:-translate-y-1`}
    >
      {project.microRoute && (
        <div className="absolute -right-2 -top-2 z-50 rounded-full bg-purple-500 px-4 py-1">
          <p className="text-sm font-bold">Microfrontend</p>
        </div>
      )}

      <div className="flex w-full flex-col-reverse md:flex-row">
        <div className="flex w-full select-none flex-col gap-2 p-10 text-left max-md:p-5 md:w-2/3">
          <SubTitle className="mb-3">{project.name}</SubTitle>

          <Text className="w-full text-start">{project?.description}</Text>

          <hr className="my-3 w-full border-t border-zinc-700/30" />

          <div className="flex w-full flex-wrap items-start justify-end gap-2">
            <Text className="flex-1 text-nowrap font-bold">Tech Stack</Text>
            {project?.techStack?.map((tech, index) => (
              <div
                key={index}
                className="md:glass-dark flex items-center gap-2 rounded-lg px-4 max-md:border max-md:border-zinc-700/30 max-md:bg-zinc-700/20"
              >
                {techStackIcons[tech as keyof typeof techStackIcons]}
                <Text>{tech}</Text>
              </div>
            ))}
          </div>

          <hr className="my-3 w-full border-t border-zinc-700/30" />

          <div className="flex w-full flex-wrap items-start justify-end gap-2">
            <Text className="flex-1 text-nowrap font-bold">Members</Text>
            {project?.members.map((member, index) => (
              <div
                key={index}
                className="md:glass-dark flex items-center rounded-lg px-4 max-md:border max-md:border-zinc-700/30 max-md:bg-zinc-700/20"
              >
                <Text className="text-nowrap">{member}</Text>
              </div>
            ))}
          </div>

          <hr className="my-3 w-full border-t border-zinc-700/30" />

          <div className="flex gap-2">
            {project?.gitLink && (
              <a
                className="md:glass-dark flex w-full items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-2 text-xl font-black transition duration-500 hover:scale-[1.01] hover:bg-zinc-900 active:scale-95 active:bg-zinc-900 max-md:border max-md:border-zinc-700/30 max-md:bg-zinc-700/20 md:h-16"
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
                className="md:glass-dark flex w-full items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-2 text-xl font-black transition duration-500 hover:scale-[1.01] hover:bg-zinc-900 active:scale-95 active:bg-zinc-900 max-md:border max-md:border-zinc-700/30 max-md:bg-zinc-700/20 md:h-16"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem(
                      "projectsScroll",
                      window.scrollY.toString(),
                    );
                  }
                }}
              >
                <BiSolidComponent size={28} />
                <Text className="max-sm:hidden">Microfrontend</Text>
              </Link>
            )}
            {project?.link && (
              <a
                href={project.link}
                className="md:glass-dark flex w-full items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-2 text-xl font-black transition duration-500 hover:scale-[1.01] hover:bg-zinc-900 active:scale-95 active:bg-zinc-900 max-md:border max-md:border-zinc-700/30 max-md:bg-zinc-700/20 md:h-16"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPager size={28} />
                <Text className="max-sm:hidden">Project</Text>
              </a>
            )}
          </div>
        </div>

        <div className="flex w-1/2 max-md:w-full max-md:px-4 max-md:pt-4 md:items-end md:justify-end md:overflow-hidden">
          <div className="relative h-full w-full overflow-hidden rounded-lg delay-75 duration-500 group-hover:scale-[1.01] group-active:scale-[1.01] max-md:h-60 md:left-4 md:top-10 md:group-hover:-translate-x-2 md:group-hover:-translate-y-6 md:group-active:-translate-x-2 md:group-active:-translate-y-6">
            {renderImage()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
