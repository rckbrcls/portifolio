"use client";

import React from "react";
import { projects } from "../../../public/data/projects/projects";
import Image from "next/image";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import Title from "@/components/atoms/Title";
import Text from "@/components/atoms/Text";
import SubTitle from "@/components/atoms/SubTitle";
import { useRouter } from "next/router";
import Alert from "@/components/molecules/Alert";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { BiSolidComponent } from "react-icons/bi";
import { FaPager } from "react-icons/fa";
import { techStackIcons } from "../../../public/data/techStackIcons";

export default function Project() {
  const router = useRouter();
  const project = projects.find(
    (project) => project.slug === router.query.slug,
  );

  return (
    <>
      <Alert />

      <Link
        href={"/projects"}
        className="glass-dark fixed z-10 m-10 flex size-10 items-center justify-center rounded-full"
      >
        <ChevronLeftIcon />
      </Link>
      <div className="mx-auto flex w-11/12 flex-col text-center md:w-3/4">
        <div className="flex h-[100svh] w-full flex-col items-center justify-center gap-4 text-center">
          <div className="flex w-full flex-col items-start justify-between md:flex-row md:items-end">
            <Title
              word={project?.name ?? ""}
              type="blur"
              gradient
              className="w-full text-start"
            />

            <div className="flex w-full flex-col gap-4 md:w-1/3">
              {project?.gitLink && (
                <a
                  className="glass-dark flex w-full items-center justify-center gap-2 rounded-lg px-10 py-4 duration-500 hover:scale-105 hover:bg-zinc-900 active:scale-95 active:bg-zinc-900"
                  href={project.gitLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillGithub size={30} />
                  <Text>Repository</Text>
                </a>
              )}
              {project?.microRoute && (
                <Link
                  href={`/microfrontend/${project.slug}`}
                  className="glass-dark flex w-full items-center justify-center gap-2 rounded-lg px-10 py-4 duration-500 hover:scale-105 hover:bg-zinc-900 active:scale-95 active:bg-zinc-900"
                >
                  <BiSolidComponent size={30} />
                  <Text>Microfrontend</Text>
                </Link>
              )}
              {project?.link && (
                <a
                  href={project.link}
                  className="glass-dark flex w-full items-center justify-center gap-2 rounded-lg px-10 py-4 duration-500 hover:scale-105 hover:bg-zinc-900 active:scale-95 active:bg-zinc-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaPager size={30} />
                  <Text>Project</Text>
                </a>
              )}
            </div>
          </div>

          <div className="flex w-full flex-col justify-between gap-10 md:flex-row">
            <div className="flex w-full flex-col flex-wrap items-start justify-start gap-4 text-start md:w-1/2">
              <div className="glass-dark flex w-full items-center justify-between gap-2 rounded-lg p-4 text-center">
                <Text className="font-bold">Tech Stack</Text>
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

              {project?.timeline && (
                <div className="glass-dark flex w-full items-center justify-between gap-2 rounded-lg p-4 text-center">
                  <Text className="font-bold">Timeline</Text>
                  <div className="glass-dark flex items-center rounded-lg px-4">
                    <Text>
                      {project?.timeline?.start} - {project?.timeline?.end}
                    </Text>
                  </div>
                </div>
              )}

              <div className="glass-dark flex w-full items-center justify-between gap-2 rounded-lg p-4 text-center">
                <Text className="font-bold">Members</Text>
                <div className="flex flex-wrap justify-end gap-2">
                  {project?.members.map((member, index) => (
                    <div
                      key={index}
                      className="glass-dark flex items-center rounded-lg px-4"
                    >
                      <Text>{member}</Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Text className="w-full text-start md:w-1/2">
              {project?.description}
            </Text>
          </div>
        </div>
        {project?.projectVisualization && (
          <div className="mb-10 flex flex-col flex-wrap items-center justify-between gap-16 md:flex-row">
            {project?.projectVisualization?.map((object, index) => (
              <div key={index} className="flex flex-col gap-2">
                <SubTitle className="md:text-start">{object.title}</SubTitle>
                <Text>{object.description}</Text>

                <div className="flex w-full flex-col flex-wrap items-center gap-4 md:flex-row">
                  {object.images?.map((image) => (
                    <Image
                      key={index}
                      alt="Example"
                      src={image ?? ""}
                      sizes="100vw"
                      style={{
                        width: "auto",
                        maxWidth: "90vw",
                        height: "90svh",
                        borderRadius: "10px",
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
