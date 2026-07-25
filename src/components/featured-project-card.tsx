import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  editorialListActionMotionClassName,
  editorialListArrowMotionClassName,
  editorialListItemClassName,
  editorialListTitleMotionClassName,
} from "@/components/editorial-list-motion";
import type { IProject } from "@/interface/IProject";
import {
  getProjectPrimaryLink,
  getProjectStackPreview,
  getProjectSummary,
} from "@/lib/portfolio-content";
import { getWorkCategoryLabel } from "@/lib/work-category";
import { cn } from "@/lib/utils";

interface FeaturedProjectCardProps {
  project: IProject;
  index: number;
}

interface WorkProjectCardProps {
  project: IProject;
  index: number;
}

interface ProjectCardFrameProps {
  projectLink: ProjectPrimaryLink;
  cardClassName?: string;
  surfaceVariant?: ProjectCardSurfaceVariant;
  children: ReactNode;
}

type ProjectPrimaryLink = ReturnType<typeof getProjectPrimaryLink>;
type ProjectCardSurfaceVariant = "card" | "editorial-list";

const editorialCardClassName =
  "group h-full min-h-0 border border-portfolio-border bg-portfolio-surface p-portfolio-lg text-inherit no-underline shadow-portfolio-card transition-[transform,border-color,box-shadow,background-color,color] duration-portfolio-300 ease-portfolio hover:z-[1] hover:-translate-y-[3px] hover:scale-[1.01] hover:border-portfolio-accent-border hover:bg-portfolio-highlight hover:shadow-portfolio-card-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent";

const previewCardClassName = "grid content-start gap-portfolio-md";

const rowMetaClassName = "flex flex-wrap items-center justify-between gap-4";

const projectCopyClassName = "grid gap-3";

const projectTitleClassName =
  "m-0 text-[1.65rem] font-semibold leading-[1.02] tracking-normal text-portfolio-primary md:text-2xl";

const projectSummaryClassName =
  "m-0 text-[0.96rem] leading-[1.7] text-portfolio-secondary";

const projectMetaClassName =
  "m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.2] tracking-normal text-portfolio-secondary";

const kickerClassName =
  "m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-secondary";

const cardActionBaseClassName =
  "inline-flex items-center gap-[0.55rem] font-mono text-[0.8125rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-primary";

const previewCardActionClassName = `${cardActionBaseClassName} transition-[color,transform] duration-portfolio-300 ease-portfolio group-hover:text-portfolio-accent`;

function ProjectCardFrame({
  projectLink,
  cardClassName,
  surfaceVariant = "card",
  children,
}: ProjectCardFrameProps) {
  const surfaceClassName =
    surfaceVariant === "editorial-list"
      ? `${editorialListItemClassName} gap-portfolio-lg p-portfolio-lg max-md:p-portfolio-md`
      : editorialCardClassName;

  return (
    <article className="relative z-0 min-w-0">
      {projectLink ? (
        projectLink.isExternal ? (
          <a
            data-portfolio-card-surface=""
            href={projectLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(surfaceClassName, cardClassName)}
          >
            {children}
          </a>
        ) : (
          <Link
            data-portfolio-card-surface=""
            href={projectLink.href}
            className={cn(surfaceClassName, cardClassName)}
          >
            {children}
          </Link>
        )
      ) : (
        <div
          data-portfolio-card-surface=""
          className={cn(surfaceClassName, cardClassName)}
        >
          {children}
        </div>
      )}
    </article>
  );
}

export function FeaturedProjectCard({
  project,
  index,
}: FeaturedProjectCardProps) {
  const projectLink = getProjectPrimaryLink(project);
  const previewNumber = String(index + 1).padStart(2, "0");
  const categoryLabel = getWorkCategoryLabel(project.workCategory);

  return (
    <ProjectCardFrame
      projectLink={projectLink}
      cardClassName={previewCardClassName}
    >
      <div className={rowMetaClassName}>
        <p className={kickerClassName}>
          {previewNumber} / {categoryLabel}
        </p>
      </div>

      <div className={projectCopyClassName}>
        <h3
          className={`${projectTitleClassName} group-hover:text-portfolio-accent`}
        >
          {project.name}
        </h3>
        <p className={projectSummaryClassName}>{getProjectSummary(project)}</p>
      </div>

      <div className={rowMetaClassName}>
        <p className={projectMetaClassName}>
          {getProjectStackPreview(project)}
        </p>

        {projectLink ? (
          <span className={previewCardActionClassName}>
            {projectLink.label}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-portfolio-300 ease-portfolio group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        ) : (
          <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-normal text-portfolio-secondary">
            No public link
          </span>
        )}
      </div>
    </ProjectCardFrame>
  );
}

export function WorkProjectCard({ project, index }: WorkProjectCardProps) {
  const projectLink = getProjectPrimaryLink(project);
  const previewNumber = String(index + 1).padStart(2, "0");
  const categoryLabel = getWorkCategoryLabel(project.workCategory);

  return (
    <ProjectCardFrame projectLink={projectLink} surfaceVariant="editorial-list">
      <div className={projectCopyClassName}>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-portfolio-lg max-[560px]:grid-cols-1">
          <h2
            className={`${projectTitleClassName} ${editorialListTitleMotionClassName}`}
          >
            {project.name}
          </h2>

          <p
            className={`${kickerClassName} justify-self-end text-right max-[560px]:hidden`}
          >
            {previewNumber} / {categoryLabel}
          </p>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-portfolio-lg max-[560px]:grid-cols-1">
          <p className={projectSummaryClassName}>
            {getProjectSummary(project)}
          </p>

          {projectLink ? (
            <span
              className={`${cardActionBaseClassName} ${editorialListActionMotionClassName} justify-self-end max-[560px]:hidden`}
            >
              Read
              <ArrowUpRight
                className={`h-4 w-4 ${editorialListArrowMotionClassName}`}
              />
            </span>
          ) : (
            <span className="justify-self-end font-mono text-[0.72rem] font-semibold uppercase tracking-normal text-portfolio-secondary max-[560px]:hidden">
              No public link
            </span>
          )}
        </div>
      </div>
    </ProjectCardFrame>
  );
}
