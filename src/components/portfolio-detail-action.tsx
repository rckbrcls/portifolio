import type { ReactNode } from "react";
import { ArrowUpRight, Github } from "lucide-react";

import { cn } from "@/lib/utils";

export type PortfolioDetailActionVariant = "project" | "source" | "primary";

type PortfolioDetailActionProps = {
  href: string;
  variant: PortfolioDetailActionVariant;
  /** Required for `primary` actions with custom copy (e.g. Download, Play now). */
  label?: string;
};

const baseClassName =
  "inline-flex items-center justify-center gap-1.5 rounded-[var(--portfolio-radius-md)] border px-2.5 py-1.5 font-mono text-[0.68rem] font-semibold uppercase leading-none tracking-normal no-underline transition-[background-color,border-color,box-shadow,color,transform] duration-portfolio-180 ease-portfolio-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent active:scale-[0.97] active:[box-shadow:none] motion-reduce:transform-none motion-reduce:transition-none motion-reduce:active:transform-none";

const accentClassName =
  "border-[color:var(--portfolio-action-border)] bg-portfolio-accent text-white [box-shadow:var(--portfolio-floating-shadow)] hover:border-[color:var(--portfolio-action-border-hover)] hover:bg-portfolio-accent-hover focus-visible:border-[color:var(--portfolio-action-border-hover)] focus-visible:bg-portfolio-accent-hover";

const sourceClassName =
  "border-[#181717] bg-[#181717] text-white [box-shadow:var(--portfolio-floating-shadow)] hover:border-black hover:bg-black focus-visible:border-black focus-visible:bg-black dark:border-white dark:bg-white dark:text-[#181717] dark:hover:border-[#f0f6fc] dark:hover:bg-[#f0f6fc] dark:focus-visible:border-[#f0f6fc] dark:focus-visible:bg-[#f0f6fc]";

function resolveContent(
  variant: PortfolioDetailActionVariant,
  label?: string,
): { text: string; icon: ReactNode } {
  if (variant === "source") {
    return {
      text: "Source",
      icon: <Github aria-hidden="true" className="size-3.5 shrink-0" />,
    };
  }

  if (variant === "project") {
    return {
      text: "Project",
      icon: <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />,
    };
  }

  return {
    text: label ?? "Open",
    icon: <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />,
  };
}

export function PortfolioDetailAction({
  href,
  variant,
  label,
}: PortfolioDetailActionProps) {
  const content = resolveContent(variant, label);
  const isSource = variant === "source";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        baseClassName,
        isSource ? sourceClassName : accentClassName,
      )}
    >
      {isSource ? (
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
