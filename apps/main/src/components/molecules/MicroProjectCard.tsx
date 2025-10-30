import React from "react";
import Link from "next/link";
import { IProject } from "@/interface/IProject";
import SubTitle from "../atoms/SubTitle";
import TechStackIcon from "../atoms/TechStackIcon";
import { Text } from "@/components/atoms/Text";
import { AiFillGithub } from "react-icons/ai";
import { FaExpand } from "react-icons/fa";
import { TypeTechStack } from "../../../public/data/techStack";
import SmartIframe from "../SmartIframe";

interface IMicroProjectCardProps {
  project: IProject;
}

const MicroProjectCard = ({ project }: IMicroProjectCardProps) => {
  const iframeHeight = "50vh";
  const iframeWidth = `min(100%, calc(${iframeHeight} * (16 / 9)))`;

  return (
    <>
      <div
        className={`glass-dark group flex h-full transform-gpu select-none flex-col justify-start overflow-hidden rounded-3xl delay-75 duration-500 hover:-translate-y-1`}
        style={{ width: iframeWidth, marginLeft: "auto" }}
      >
        <div className="flex flex-col">
          <div className="flex justify-between gap-2 border-b border-zinc-700/30 bg-zinc-950 p-4">
            {project?.microRoute && (
              <Link
                href={`/microfrontend/${project.slug}`}
                className="glass-dark flex w-min items-center justify-center gap-3 text-nowrap rounded-full p-2 text-lg font-bold transition duration-300 hover:border-purple-400/40"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    sessionStorage.setItem(
                      "projectsScroll",
                      window.scrollY.toString(),
                    );
                  }
                }}
              >
                <FaExpand className="md:text-lg" />
              </Link>
            )}

            <div className="glass-dark flex items-center rounded-lg p-2 px-4 text-sm font-bold">
              <p className="text-nowrap">{project.microRoute}</p>
            </div>

            {project?.gitLink && (
              <a
                className="glass-dark flex w-min items-center justify-center gap-3 text-nowrap rounded-full p-2 text-lg font-bold transition duration-300 hover:border-purple-400/40"
                href={project.gitLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub className="md:text-lg" />
              </a>
            )}
          </div>

          <SmartIframe
            src={project.microRoute ?? ""}
            title={project.name || project.slug}
            className="project-iframe"
            height={iframeHeight}
            width="100%"
            aspectRatio="16 / 9"
            targetViewportWidth={1280}
            autoResize={false}
          />
        </div>

        <div className="flex w-full select-none flex-col gap-2 p-6 text-left">
          <p className="mb-1 text-2xl font-bold">{project.name}</p>
          <p className="w-full text-start">{project?.description}</p>

          <hr className="my-1 w-full border-t border-zinc-700/30" />

          <div className="flex w-full flex-wrap items-start justify-end gap-2">
            <p className="flex-1 text-nowrap text-sm font-bold">Members</p>
            {project?.members.map((member, index) => (
              <div
                key={index}
                className="glass-dark flex items-center rounded-full px-4 py-1"
              >
                <p className="text-nowrap text-sm">{member}</p>
              </div>
            ))}
          </div>

          <hr className="my-1 w-full border-t border-zinc-700/30" />

          <div className="flex w-full flex-wrap items-start justify-end gap-2">
            <p className="flex-1 text-nowrap text-sm font-bold">Tech Stack</p>
            {project?.techStack?.map((tech, index) => (
              <div
                key={index}
                className="glass-dark flex items-center gap-2 rounded-full px-2 py-1"
              >
                <TechStackIcon tech={tech as TypeTechStack} />
                <p className="text-xs">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .project-iframe {
          margin-left: auto;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          overflow: hidden;
          background: white;
        }
      `}</style>
    </>
  );
};

export default MicroProjectCard;
