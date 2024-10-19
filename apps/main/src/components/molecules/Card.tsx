import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Route } from "next";
import { IProject } from "@/interface/IProject";
import Text from "../atoms/Text";
import SubTitle from "../atoms/SubTitle";

interface ICardProps {
  project: IProject;
}

const Card = ({ project }: ICardProps) => {
  const linkUrl = `project/${project.slug}` as Route;

  const renderTechStack = () => {
    return (
      <div className="flex flex-wrap gap-2 mt-6">
        {project.techStack.map((tech) => (
          <div key={tech} className="bg-blue-500 rounded-full px-4 py-1">
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
        priority
      />
    );
  };

  return (
    <Link href={linkUrl}>
      <div
        className={`group cursor-pointer border border-zinc-800 rounded-xl p-2 hover:scale-[1.02]
           delay-75 duration-500 transform-gpu justify-between flex bg-zinc-950/5
         md:flex-row flex-col h-full overflow-hidden active:scale-[1.02] select-none`}
      >
        <div className="md:p-10 p-5 text-left md:w-1/2 w-full select-none">
          <SubTitle>{project.name}</SubTitle>
          {renderTechStack()}
        </div>

        <div className="md:w-1/2 w-full flex md:justify-end md:items-end">
          <div
            className="w-full h-80 md:top-10 md:left-4 relative 
          group-hover:-translate-y-10 md:group-hover:-translate-x-4
          group-active:-translate-y-10 md:group-active:-translate-x-4
          duration-500 delay-75 rounded-xl overflow-hidden"
          >
            {renderImage()}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
