import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IProject } from "@/interface/IProject";
import SubTitle from "../atoms/SubTitle";
import TechStackIcon from "../atoms/TechStackIcon";
import { Text } from "@/components/atoms/Text";
import { AiFillGithub } from "react-icons/ai";
import { BiSolidComponent } from "react-icons/bi";
import { FaPager } from "react-icons/fa";
import { TypeTechStack } from "../../../public/data/techStack";

interface IProjectCardProps {
  project: IProject;
}

const ProjectCard = ({ project }: IProjectCardProps) => {
  const renderImage = () => {
    if (!project.coverImage) {
      // Placeholder quando não há imagem
      return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-700">
              <svg
                className="h-8 w-8 text-zinc-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <Text className="text-sm text-zinc-400">No preview available</Text>
          </div>
        </div>
      );
    }

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
                className="glass-dark flex items-center gap-2 rounded-full px-4 py-1"
              >
                <TechStackIcon tech={tech as TypeTechStack} />
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
                className="glass-dark flex items-center rounded-full px-4 py-1"
              >
                <Text className="text-nowrap">{member}</Text>
              </div>
            ))}
          </div>

          <hr className="my-3 w-full border-t border-zinc-700/30" />

          <div className="flex gap-2">
            {project?.gitLink && (
              <a
                className="glass-dark flex w-full items-center justify-center gap-3 text-nowrap rounded-lg px-8 py-4 text-lg font-bold transition duration-300 hover:border-purple-400/40"
                href={project.gitLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub className="text-2xl" />
                <Text className="max-sm:hidden">Repository</Text>
              </a>
            )}
            {project?.microRoute && (
              <Link
                href={`/microfrontend/${project.slug}`}
                className="glass-dark flex w-full items-center justify-center gap-3 text-nowrap rounded-lg px-8 py-4 text-lg font-bold transition duration-300 hover:border-purple-400/40"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem(
                      "projectsScroll",
                      window.scrollY.toString(),
                    );
                  }
                }}
              >
                <BiSolidComponent className="text-2xl" />
                <Text className="max-sm:hidden">Microfrontend</Text>
              </Link>
            )}
            {project?.link && (
              <a
                href={project.link}
                className="glass-dark flex w-full items-center justify-center gap-3 text-nowrap rounded-lg px-8 py-4 text-lg font-bold transition duration-300 hover:border-purple-400/40"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPager className="text-2xl" />
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
