import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IProject } from "@/interface/IProject";
import {
  getProjectPrimaryLink,
  getProjectStackPreview,
  getProjectSummary,
} from "@/lib/portfolio-content";
import { getWorkCategoryLabel } from "@/lib/work-category";

interface FeaturedProjectCardProps {
  project: IProject;
  index: number;
}

interface WorkProjectCardProps {
  project: IProject;
  index: number;
}

interface ProjectCardFrameProps {
  project: IProject;
  projectLink: ProjectPrimaryLink;
  cardClassName?: string;
  previewLabel: string;
  enableFloatingPreview?: boolean;
  surfaceVariant?: ProjectCardSurfaceVariant;
  children: ReactNode;
}

type ProjectPrimaryLink = ReturnType<typeof getProjectPrimaryLink>;
type ProjectCardSurfaceVariant = "card" | "editorial-list";

const PREVIEW_DELAY_MS = 200;
const PREVIEW_GUTTER_PX = 24;
const PREVIEW_OFFSET_X_PX = 28;
const PREVIEW_OFFSET_Y_PX = 20;
const PREVIEW_LERP = 0.16;
const DEFAULT_PREVIEW_WIDTH_PX = 224;
const DEFAULT_PREVIEW_HEIGHT_PX = 180;
const DESKTOP_PREVIEW_MIN_WIDTH_PX = 1080;

const editorialCardClassName =
  "group h-full min-h-0 border border-portfolio-border bg-portfolio-surface p-portfolio-lg text-inherit no-underline shadow-portfolio-card transition-[transform,border-color,box-shadow,background-color,color] duration-300 ease-portfolio hover:z-[1] hover:-translate-y-[3px] hover:scale-[1.01] hover:border-portfolio-accent-border hover:bg-portfolio-highlight hover:shadow-portfolio-card-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent";

const editorialListItemClassName =
  "group grid min-h-0 content-start gap-portfolio-lg rounded-[var(--portfolio-radius-lg)] border border-portfolio-neutral bg-portfolio-neutral p-portfolio-lg text-inherit no-underline shadow-none transition-[background-color,border-color,box-shadow,color] duration-300 ease-portfolio hover:border-[color:var(--portfolio-floating-border)] hover:bg-portfolio-surface hover:[box-shadow:var(--portfolio-floating-shadow)] focus-visible:border-[color:var(--portfolio-floating-border)] focus-visible:bg-portfolio-surface focus-visible:[box-shadow:var(--portfolio-floating-shadow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent max-md:p-portfolio-md";

const previewCardClassName = "grid content-start gap-portfolio-md";

const rowMetaClassName = "flex flex-wrap items-center justify-between gap-4";

const projectCopyClassName = "grid gap-3";

const projectTitleClassName =
  "m-0 text-[1.65rem] font-semibold leading-[1.02] tracking-normal text-portfolio-primary group-hover:text-portfolio-accent md:text-2xl";

const projectSummaryClassName =
  "m-0 text-[0.96rem] leading-[1.7] text-portfolio-secondary";

const projectMetaClassName =
  "m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.2] tracking-normal text-portfolio-secondary";

const kickerClassName =
  "m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-secondary";

const cardActionClassName =
  "inline-flex items-center gap-[0.55rem] font-mono text-[0.8125rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-primary transition-[color,transform] duration-300 ease-portfolio group-hover:text-portfolio-accent";

const projectPreviewPopoverClassName =
  "pointer-events-none invisible fixed left-0 top-0 z-[24] hidden w-[clamp(11.5rem,14vw,14rem)] overflow-hidden border border-portfolio-accent-border bg-portfolio-surface opacity-0 [--portfolio-preview-origin-x:left] [--portfolio-preview-origin-y:top] [--portfolio-preview-rotate-x:3deg] [--portfolio-preview-rotate-y:-6deg] [--portfolio-preview-scale:0.96] [--portfolio-preview-x:24px] [--portfolio-preview-y:24px] [backface-visibility:hidden] [transform-origin:var(--portfolio-preview-origin-x)_var(--portfolio-preview-origin-y)] [transform:translate3d(var(--portfolio-preview-x),var(--portfolio-preview-y),0)_perspective(1200px)_rotateX(var(--portfolio-preview-rotate-x))_rotateY(var(--portfolio-preview-rotate-y))_scale(var(--portfolio-preview-scale))] [will-change:transform,opacity] data-[horizontal=left]:[--portfolio-preview-origin-x:right] data-[horizontal=left]:[--portfolio-preview-rotate-y:6deg] data-[horizontal=right]:[--portfolio-preview-origin-x:left] data-[horizontal=right]:[--portfolio-preview-rotate-y:-6deg] data-[vertical=bottom]:[--portfolio-preview-origin-y:top] data-[vertical=bottom]:[--portfolio-preview-rotate-x:3deg] data-[vertical=top]:[--portfolio-preview-origin-y:bottom] data-[vertical=top]:[--portfolio-preview-rotate-x:-3deg] motion-reduce:transition-[opacity,visibility] motion-reduce:duration-150 min-[1080px]:grid transition-[opacity,transform,visibility] duration-200 ease-portfolio";

const projectPreviewVisibleClassName =
  "visible opacity-100 [--portfolio-preview-rotate-x:0deg] [--portfolio-preview-rotate-y:0deg] [--portfolio-preview-scale:1]";

type PreviewHorizontalSide = "left" | "right";
type PreviewVerticalSide = "top" | "bottom";

function ProjectCardFrame({
  project,
  projectLink,
  cardClassName,
  previewLabel,
  enableFloatingPreview = true,
  surfaceVariant = "card",
  children,
}: ProjectCardFrameProps) {
  const iframePreviewHref =
    project.previewMode === "iframe" && typeof project.link === "string"
      ? project.link
      : null;
  const showsIframePreview = Boolean(iframePreviewHref);
  const hasPreview =
    enableFloatingPreview &&
    (Boolean(project.coverImage) || showsIframePreview);
  const isLogoPreview =
    typeof project.coverImage === "string" &&
    project.coverImage.toLowerCase().endsWith(".svg");
  const surfaceClassName =
    surfaceVariant === "editorial-list"
      ? editorialListItemClassName
      : editorialCardClassName;
  const previewRef = useRef<HTMLDivElement | null>(null);
  const revealTimeoutRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const previewSizeRef = useRef({
    width: DEFAULT_PREVIEW_WIDTH_PX,
    height: DEFAULT_PREVIEW_HEIGHT_PX,
  });
  const currentPositionRef = useRef({
    x: PREVIEW_GUTTER_PX,
    y: PREVIEW_GUTTER_PX,
  });
  const targetPositionRef = useRef({
    x: PREVIEW_GUTTER_PX,
    y: PREVIEW_GUTTER_PX,
  });
  const orientationRef = useRef<{
    horizontal: PreviewHorizontalSide;
    vertical: PreviewVerticalSide;
  }>({
    horizontal: "right",
    vertical: "bottom",
  });
  const lastPointerRef = useRef({ x: 0, y: 0 });
  const isPointerInsideRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  function cancelRevealTimeout() {
    if (revealTimeoutRef.current !== null) {
      window.clearTimeout(revealTimeoutRef.current);
      revealTimeoutRef.current = null;
    }
  }

  function stopAnimationFrame() {
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }

  function canUseFloatingPreview() {
    if (typeof window === "undefined") {
      return false;
    }

    return (
      window.innerWidth >= DESKTOP_PREVIEW_MIN_WIDTH_PX &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }

  function measurePreviewSize() {
    const previewElement = previewRef.current;

    if (!previewElement) {
      return previewSizeRef.current;
    }

    const { width, height } = previewElement.getBoundingClientRect();

    if (width > 0 && height > 0) {
      previewSizeRef.current = { width, height };
    }

    return previewSizeRef.current;
  }

  function applyPreviewPosition(
    x: number,
    y: number,
    horizontal: PreviewHorizontalSide,
    vertical: PreviewVerticalSide,
  ) {
    const previewElement = previewRef.current;

    if (!previewElement) {
      return;
    }

    previewElement.style.setProperty("--portfolio-preview-x", `${x}px`);
    previewElement.style.setProperty("--portfolio-preview-y", `${y}px`);
    previewElement.dataset.horizontal = horizontal;
    previewElement.dataset.vertical = vertical;
  }

  function updateTargetPosition(clientX: number, clientY: number) {
    if (typeof window === "undefined") {
      return;
    }

    lastPointerRef.current = { x: clientX, y: clientY };

    const { width, height } = measurePreviewSize();
    const maxX = Math.max(
      PREVIEW_GUTTER_PX,
      window.innerWidth - width - PREVIEW_GUTTER_PX,
    );
    const maxY = Math.max(
      PREVIEW_GUTTER_PX,
      window.innerHeight - height - PREVIEW_GUTTER_PX,
    );

    let nextX = clientX + PREVIEW_OFFSET_X_PX;
    let nextY = clientY + PREVIEW_OFFSET_Y_PX;

    if (nextX + width + PREVIEW_GUTTER_PX > window.innerWidth) {
      nextX = clientX - width - PREVIEW_OFFSET_X_PX;
    }

    if (nextY + height + PREVIEW_GUTTER_PX > window.innerHeight) {
      nextY = clientY - height - PREVIEW_OFFSET_Y_PX;
    }

    nextX = Math.min(Math.max(nextX, PREVIEW_GUTTER_PX), maxX);
    nextY = Math.min(Math.max(nextY, PREVIEW_GUTTER_PX), maxY);

    const horizontal: PreviewHorizontalSide =
      nextX < clientX ? "left" : "right";
    const vertical: PreviewVerticalSide = nextY < clientY ? "top" : "bottom";

    targetPositionRef.current = { x: nextX, y: nextY };
    orientationRef.current = { horizontal, vertical };

    if (reduceMotionRef.current) {
      currentPositionRef.current = { x: nextX, y: nextY };
      applyPreviewPosition(nextX, nextY, horizontal, vertical);
    }
  }

  function animatePreview() {
    const { x: currentX, y: currentY } = currentPositionRef.current;
    const { x: targetX, y: targetY } = targetPositionRef.current;
    const nextX = currentX + (targetX - currentX) * PREVIEW_LERP;
    const nextY = currentY + (targetY - currentY) * PREVIEW_LERP;
    const { horizontal, vertical } = orientationRef.current;

    currentPositionRef.current = { x: nextX, y: nextY };
    applyPreviewPosition(nextX, nextY, horizontal, vertical);

    const isSettled =
      Math.abs(targetX - nextX) < 0.35 && Math.abs(targetY - nextY) < 0.35;

    if (isSettled) {
      animationFrameRef.current = null;
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(animatePreview);
  }

  function ensureAnimationFrame() {
    if (reduceMotionRef.current || animationFrameRef.current !== null) {
      return;
    }

    animationFrameRef.current = window.requestAnimationFrame(animatePreview);
  }

  function hidePreview() {
    cancelRevealTimeout();
    isPointerInsideRef.current = false;
    setIsPreviewVisible(false);
    stopAnimationFrame();
  }

  function handlePointerEnter(event: ReactPointerEvent<HTMLElement>) {
    if (!hasPreview || !canUseFloatingPreview()) {
      return;
    }

    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    isPointerInsideRef.current = true;

    updateTargetPosition(event.clientX, event.clientY);
    currentPositionRef.current = { ...targetPositionRef.current };
    applyPreviewPosition(
      currentPositionRef.current.x,
      currentPositionRef.current.y,
      orientationRef.current.horizontal,
      orientationRef.current.vertical,
    );

    cancelRevealTimeout();
    revealTimeoutRef.current = window.setTimeout(() => {
      if (!isPointerInsideRef.current) {
        return;
      }

      measurePreviewSize();
      updateTargetPosition(lastPointerRef.current.x, lastPointerRef.current.y);
      setIsPreviewVisible(true);
      ensureAnimationFrame();
    }, PREVIEW_DELAY_MS);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLElement>) {
    if (!hasPreview || !canUseFloatingPreview()) {
      return;
    }

    updateTargetPosition(event.clientX, event.clientY);
    ensureAnimationFrame();
  }

  useEffect(() => {
    return () => {
      cancelRevealTimeout();
      stopAnimationFrame();
    };
  }, []);

  return (
    <article
      className="relative z-0 min-w-0"
      onPointerEnter={hasPreview ? handlePointerEnter : undefined}
      onPointerMove={hasPreview ? handlePointerMove : undefined}
      onPointerLeave={hasPreview ? hidePreview : undefined}
      onPointerCancel={hasPreview ? hidePreview : undefined}
    >
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

      {hasPreview ? (
        <div
          ref={previewRef}
          aria-hidden="true"
          className={cn(
            projectPreviewPopoverClassName,
            isPreviewVisible && projectPreviewVisibleClassName,
          )}
        >
          <div
            className={cn(
              "relative aspect-[16/10] overflow-hidden border-b border-portfolio-border bg-portfolio-surface-alt",
              showsIframePreview && "bg-portfolio-neutral",
              isLogoPreview && !showsIframePreview && "p-[1.4rem]",
            )}
          >
            {showsIframePreview && isPreviewVisible ? (
              <iframe
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-[500%] w-[500%] origin-top-left scale-[0.2] select-none border-0 bg-portfolio-neutral"
                src={iframePreviewHref ?? undefined}
                tabIndex={-1}
                title={`${project.name} preview`}
                loading="eager"
                scrolling="no"
              />
            ) : null}

            {!showsIframePreview && project.coverImage ? (
              <Image
                src={project.coverImage}
                alt=""
                fill
                sizes="288px"
                className={cn(
                  "object-cover object-top",
                  isLogoPreview && "object-contain object-center",
                )}
              />
            ) : null}
          </div>
          <div className="flex items-center justify-between gap-[0.8rem] bg-portfolio-surface px-[0.9rem] pb-[0.74rem] pt-[0.78rem]">
            <span className="font-mono text-[0.66rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-secondary">
              Preview
            </span>
            <span className="text-right font-mono text-[0.66rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-primary">
              {previewLabel}
            </span>
          </div>
        </div>
      ) : null}
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
  const cardContent = (
    <>
      <div className={rowMetaClassName}>
        <p className={kickerClassName}>
          {previewNumber} / {categoryLabel}
        </p>
      </div>

      <div className={projectCopyClassName}>
        <h3 className={projectTitleClassName}>{project.name}</h3>
        <p className={projectSummaryClassName}>{getProjectSummary(project)}</p>
      </div>

      <div className={rowMetaClassName}>
        <p className={projectMetaClassName}>
          {getProjectStackPreview(project)}
        </p>

        {projectLink ? (
          <span className={cardActionClassName}>
            {projectLink.label}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-portfolio group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        ) : (
          <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-normal text-portfolio-secondary">
            No public link
          </span>
        )}
      </div>
    </>
  );

  return (
    <ProjectCardFrame
      project={project}
      projectLink={projectLink}
      cardClassName={previewCardClassName}
      previewLabel={`${previewNumber} / ${project.name}`}
    >
      {cardContent}
    </ProjectCardFrame>
  );
}

export function WorkProjectCard({ project, index }: WorkProjectCardProps) {
  const projectLink = getProjectPrimaryLink(project);
  const previewNumber = String(index + 1).padStart(2, "0");
  const categoryLabel = getWorkCategoryLabel(project.workCategory);
  const cardContent = (
    <>
      <div className={rowMetaClassName}>
        <p className={kickerClassName}>
          {previewNumber} / {categoryLabel}
        </p>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-portfolio-lg max-[900px]:grid-cols-1">
        <div className={projectCopyClassName}>
          <h2
            className={`${projectTitleClassName} group-focus-visible:text-portfolio-accent`}
          >
            {project.name}
          </h2>
          <p className={projectSummaryClassName}>
            {getProjectSummary(project)}
          </p>
        </div>

        <div className="grid justify-items-end gap-portfolio-md max-[900px]:justify-items-start">
          {projectLink ? (
            <span
              className={`${cardActionClassName} group-focus-visible:text-portfolio-accent`}
            >
              Read
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-portfolio group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none" />
            </span>
          ) : (
            <span className="font-mono text-[0.72rem] font-semibold uppercase tracking-normal text-portfolio-secondary">
              No public link
            </span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <ProjectCardFrame
      project={project}
      projectLink={projectLink}
      previewLabel={`${previewNumber} / ${project.name}`}
      enableFloatingPreview={false}
      surfaceVariant="editorial-list"
    >
      {cardContent}
    </ProjectCardFrame>
  );
}
