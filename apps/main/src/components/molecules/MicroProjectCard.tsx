import React from "react";
import Link from "next/link";
import { IProject } from "@/interface/IProject";
import SubTitle from "../atoms/SubTitle";
import TechStackIcon from "../atoms/TechStackIcon";
import { Text } from "@/components/atoms/Text";
import { AiFillGithub } from "react-icons/ai";
import { BiSolidComponent } from "react-icons/bi";
import { FaPager } from "react-icons/fa";
import { TypeTechStack } from "../../../public/data/techStack";

interface IMicroProjectCardProps {
  project: IProject;
}

const MicroProjectCard = ({ project }: IMicroProjectCardProps) => {
  return (
    <div
      className={`glass-dark group flex transform-gpu select-none flex-col justify-between rounded-3xl delay-75 duration-500 hover:-translate-y-1`}
    >
      <div className="flex w-full flex-col">
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
                className="glass-dark flex w-full items-center justify-center gap-3 text-nowrap rounded-full px-8 py-4 text-lg font-bold transition duration-300 hover:border-purple-400/40"
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
                className="glass-dark flex w-full items-center justify-center gap-3 text-nowrap rounded-full px-8 py-4 text-lg font-bold transition duration-300 hover:border-purple-400/40"
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
                className="glass-dark flex w-full items-center justify-center gap-3 text-nowrap rounded-full px-8 py-4 text-lg font-bold transition duration-300 hover:border-purple-400/40"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPager className="text-2xl" />
                <Text className="max-sm:hidden">Project</Text>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicroProjectCard;
