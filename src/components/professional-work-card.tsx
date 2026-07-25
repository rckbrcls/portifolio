import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  editorialListActionMotionClassName,
  editorialListArrowMotionClassName,
  editorialListItemClassName,
  editorialListTitleMotionClassName,
} from "@/components/editorial-list-motion";
import type { IProfessionalWorkItem } from "@/interface/IProfessionalWorkItem";
import { getWorkCategoryLabel } from "@/lib/work-category";

interface ProfessionalWorkPreviewCardProps {
  item: IProfessionalWorkItem;
  index: number;
}

interface ProfessionalWorkCardProps {
  item: IProfessionalWorkItem;
  index: number;
}

const editorialCardClassName =
  "group h-full min-h-0 border border-portfolio-border bg-portfolio-surface p-portfolio-lg text-inherit no-underline shadow-portfolio-card transition-[transform,border-color,box-shadow,background-color,color] duration-portfolio-300 ease-portfolio hover:z-[1] hover:-translate-y-[3px] hover:scale-[1.01] hover:border-portfolio-accent-border hover:bg-portfolio-highlight hover:shadow-portfolio-card-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent";

const previewCardClassName = `${editorialCardClassName} grid content-start gap-portfolio-md`;

const workItemCardClassName = `${editorialListItemClassName} gap-portfolio-lg p-portfolio-lg max-md:p-portfolio-md`;

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

function PreviewCardFrame({ item, index }: ProfessionalWorkPreviewCardProps) {
  const previewNumber = String(index + 1).padStart(2, "0");
  const categoryLabel = getWorkCategoryLabel(item.workCategory);

  return (
    <Link
      data-portfolio-card-surface=""
      href={item.href ?? "/work"}
      className={previewCardClassName}
    >
      <div className={rowMetaClassName}>
        <p className={kickerClassName}>
          {previewNumber} / {categoryLabel}
        </p>
        <span className={projectMetaClassName}>{item.company}</span>
      </div>

      <div className={projectCopyClassName}>
        <h3
          className={`${projectTitleClassName} group-hover:text-portfolio-accent`}
        >
          {item.name}
        </h3>
        <p className={projectSummaryClassName}>{item.description}</p>
      </div>

      <div className={rowMetaClassName}>
        <p className={projectMetaClassName}>{item.meta}</p>
        <span className={previewCardActionClassName}>
          Open work
          <ArrowUpRight className="h-4 w-4 transition-transform duration-portfolio-300 ease-portfolio group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function ProfessionalWorkPreviewCard(
  props: ProfessionalWorkPreviewCardProps,
) {
  return (
    <article>
      <PreviewCardFrame {...props} />
    </article>
  );
}

export function ProfessionalWorkCard({
  item,
  index,
}: ProfessionalWorkCardProps) {
  const previewNumber = String(index + 1).padStart(2, "0");
  const categoryLabel = getWorkCategoryLabel(item.workCategory);

  return (
    <article>
      <Link
        data-portfolio-card-surface=""
        href={item.href ?? "/work"}
        className={workItemCardClassName}
      >
        <div className={projectCopyClassName}>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-portfolio-lg max-[560px]:grid-cols-1">
            <h2
              className={`${projectTitleClassName} ${editorialListTitleMotionClassName}`}
            >
              {item.name}
            </h2>

            <p
              className={`${kickerClassName} justify-self-end text-right max-[560px]:hidden`}
            >
              {previewNumber} / {categoryLabel}
            </p>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-portfolio-lg max-[560px]:grid-cols-1">
            <p className={projectSummaryClassName}>{item.description}</p>

            <span
              className={`${cardActionBaseClassName} ${editorialListActionMotionClassName} justify-self-end max-[560px]:hidden`}
            >
              Read
              <ArrowUpRight
                className={`h-4 w-4 ${editorialListArrowMotionClassName}`}
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
