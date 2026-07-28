import type { ReactNode } from "react";
import { ArrowUpRight, Download, Github } from "lucide-react";

import type { PortfolioDetailActionType } from "@/components/portfolio-detail/types";
import { cn } from "@/lib/utils";

type PortfolioDetailActionProps = {
  href: string;
  type: PortfolioDetailActionType;
};

const baseClassName =
  "inline-flex items-center justify-center gap-1.5 rounded-[var(--portfolio-radius-md)] border px-2.5 py-1.5 font-mono text-[0.68rem] font-semibold uppercase leading-none tracking-normal no-underline transition-[background-color,border-color,box-shadow,color,transform] duration-portfolio-180 ease-portfolio-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent active:scale-[0.97] active:[box-shadow:none] motion-reduce:transform-none motion-reduce:transition-none motion-reduce:active:transform-none";

const accentClassName =
  "border-[color:var(--portfolio-action-border)] bg-portfolio-accent text-white [box-shadow:var(--portfolio-floating-shadow)] hover:border-[color:var(--portfolio-action-border-hover)] hover:bg-portfolio-accent-hover focus-visible:border-[color:var(--portfolio-action-border-hover)] focus-visible:bg-portfolio-accent-hover";

const sourceClassName =
  "border-[#181717] bg-[#181717] text-white [box-shadow:var(--portfolio-floating-shadow)] hover:border-black hover:bg-black focus-visible:border-black focus-visible:bg-black dark:border-white dark:bg-white dark:text-[#181717] dark:hover:border-[#f0f6fc] dark:hover:bg-[#f0f6fc] dark:focus-visible:border-[#f0f6fc] dark:focus-visible:bg-[#f0f6fc]";

const ACTION_CONTENT: Record<
  PortfolioDetailActionType,
  { text: string; icon: ReactNode; iconFirst: boolean }
> = {
  source: {
    text: "Source",
    icon: <Github aria-hidden="true" className="size-3.5 shrink-0" />,
    iconFirst: true,
  },
  project: {
    text: "Project",
    icon: <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />,
    iconFirst: false,
  },
  download: {
    text: "Download",
    icon: <Download aria-hidden="true" className="size-3.5 shrink-0" />,
    iconFirst: false,
  },
};

export function PortfolioDetailAction({
  href,
  type,
}: PortfolioDetailActionProps) {
  const content = ACTION_CONTENT[type];
  const isSource = type === "source";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(baseClassName, isSource ? sourceClassName : accentClassName)}
    >
      {content.iconFirst ? (
        <>
          {content.icon}
          {content.text}
        </>
      ) : (
        <>
          {content.text}
          {content.icon}
        </>
      )}
    </a>
  );
}
