import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
  "group h-full min-h-0 border border-portfolio-border bg-portfolio-surface p-portfolio-lg text-inherit no-underline shadow-portfolio-card transition-[transform,border-color,box-shadow,background-color,color] duration-300 ease-portfolio hover:z-[1] hover:-translate-y-[3px] hover:scale-[1.01] hover:border-portfolio-accent-border hover:bg-portfolio-highlight hover:shadow-portfolio-card-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent";

const editorialListItemClassName =
  "group grid min-h-0 content-start gap-portfolio-lg rounded-[var(--portfolio-radius-lg)] border border-portfolio-neutral bg-portfolio-neutral p-portfolio-lg text-inherit no-underline shadow-none transition-[background-color,border-color,box-shadow,color] duration-300 ease-portfolio hover:border-[color:var(--portfolio-floating-border)] hover:bg-portfolio-surface hover:[box-shadow:var(--portfolio-floating-shadow)] focus-visible:border-[color:var(--portfolio-floating-border)] focus-visible:bg-portfolio-surface focus-visible:[box-shadow:var(--portfolio-floating-shadow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent max-md:p-portfolio-md";

const previewCardClassName = `${editorialCardClassName} grid content-start gap-portfolio-md`;

const workItemCardClassName = editorialListItemClassName;

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
        <h3 className={projectTitleClassName}>{item.name}</h3>
        <p className={projectSummaryClassName}>{item.description}</p>
      </div>

      <div className={rowMetaClassName}>
        <p className={projectMetaClassName}>{item.meta}</p>
        <span className={cardActionClassName}>
          Open work
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-portfolio group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
        <p className={kickerClassName}>
          {previewNumber} / {categoryLabel}
        </p>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-portfolio-lg max-[900px]:grid-cols-1">
          <div className={projectCopyClassName}>
            <h2
              className={`${projectTitleClassName} group-focus-visible:text-portfolio-accent`}
            >
              {item.name}
            </h2>
            <p className={projectSummaryClassName}>{item.description}</p>
          </div>

          <span
            className={`${cardActionClassName} justify-self-end group-focus-visible:text-portfolio-accent max-[900px]:justify-self-start`}
          >
            Read
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-portfolio group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none" />
          </span>
        </div>
      </Link>
    </article>
  );
}
