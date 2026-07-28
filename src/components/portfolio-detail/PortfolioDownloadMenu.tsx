"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  Apple,
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  Download,
  Github,
  Play,
  Terminal,
} from "lucide-react";

import type { PortfolioDownloadOption } from "@/components/portfolio-detail/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type CopyStatus = "idle" | "copied" | "error";

const COPY_STATUS_RESET_DELAY_MS = 2000;

const triggerClassName = cn(
  "inline-flex items-center justify-center gap-1.5 rounded-[var(--portfolio-radius-md)] border px-2.5 py-1.5 font-mono text-[0.68rem] font-semibold uppercase leading-none tracking-normal no-underline transition-[background-color,border-color,box-shadow,color,transform] duration-portfolio-180 ease-portfolio-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent active:scale-[0.97] active:[box-shadow:none] motion-reduce:transform-none motion-reduce:transition-none motion-reduce:active:transform-none",
  "border-[color:var(--portfolio-action-border)] bg-portfolio-accent text-white [box-shadow:var(--portfolio-floating-shadow)] hover:border-[color:var(--portfolio-action-border-hover)] hover:bg-portfolio-accent-hover focus-visible:border-[color:var(--portfolio-action-border-hover)] focus-visible:bg-portfolio-accent-hover",
  "cursor-pointer data-[state=open]:border-[color:var(--portfolio-action-border-hover)] data-[state=open]:bg-portfolio-accent-hover",
);

type PortfolioDownloadMenuProps = {
  options: readonly PortfolioDownloadOption[];
  /** Accessible name for the trigger when more context is needed. */
  label?: string;
};

function optionIcon(option: PortfolioDownloadOption) {
  const className = "size-3.5 shrink-0 text-portfolio-secondary";

  switch (option.kind) {
    case "command":
      return <Terminal aria-hidden="true" className={className} />;
    case "github-release":
      return <Github aria-hidden="true" className={className} />;
    case "app-store":
      return <Apple aria-hidden="true" className={className} />;
    case "play-store":
      return <Play aria-hidden="true" className={className} />;
    case "link":
      return <ArrowUpRight aria-hidden="true" className={className} />;
  }
}

function CommandOptionRow({ option }: { option: PortfolioDownloadOption & { kind: "command" } }) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const resetTimeoutRef = useRef<number | null>(null);
  const statusId = useId();

  useEffect(
    () => () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    },
    [],
  );

  const updateCopyStatus = (status: CopyStatus) => {
    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    setCopyStatus(status);

    if (status !== "idle") {
      resetTimeoutRef.current = window.setTimeout(() => {
        setCopyStatus("idle");
        resetTimeoutRef.current = null;
      }, COPY_STATUS_RESET_DELAY_MS);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(option.command);
      updateCopyStatus("copied");
    } catch {
      updateCopyStatus("error");
    }
  };

  const actionLabel =
    copyStatus === "copied"
      ? "Copied"
      : copyStatus === "error"
        ? "Copy failed. Try again."
        : "Copy command";
  const statusMessage =
    copyStatus === "copied"
      ? "Copied"
      : copyStatus === "error"
        ? "Copy failed"
        : "";

  return (
    <div className="grid gap-1.5">
      <div className="flex min-w-0 items-center gap-2 px-0.5">
        <div className="flex min-w-0 items-center gap-1.5">
          {optionIcon(option)}
          <span className="font-mono text-[0.68rem] font-semibold uppercase leading-none tracking-normal text-portfolio-secondary">
            {option.label}
          </span>
        </div>
        {option.description ? (
          <span className="ml-auto shrink-0 text-right text-[0.68rem] leading-none text-portfolio-secondary">
            {option.description}
          </span>
        ) : null}
      </div>
      <div className="flex min-w-0 items-stretch rounded-[var(--portfolio-radius-md)] border border-portfolio-border bg-transparent">
        <pre className="min-w-0 flex-1 overflow-x-auto rounded-l-[var(--portfolio-radius-md)] bg-transparent px-2.5 py-2">
          <code className="border-0 bg-transparent p-0 font-mono text-[0.72rem] leading-[1.5] text-portfolio-primary">
            {option.command}
          </code>
        </pre>
        <button
          type="button"
          aria-label={actionLabel}
          aria-describedby={statusId}
          title={actionLabel}
          onClick={handleCopy}
          className="inline-flex min-h-10 min-w-10 shrink-0 cursor-pointer items-center justify-center rounded-l-none rounded-r-[var(--portfolio-radius-md)] border-0 border-l border-portfolio-border bg-portfolio-surface-alt text-portfolio-secondary transition-[background-color,color,transform] duration-150 ease-portfolio focus-visible:bg-portfolio-border focus-visible:text-portfolio-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-portfolio-accent active:scale-[0.97] motion-reduce:transform-none motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:hover:bg-portfolio-border [@media(hover:hover)_and_(pointer:fine)]:hover:text-portfolio-accent"
        >
          {copyStatus === "copied" ? (
            <Check aria-hidden="true" className="size-3.5" />
          ) : (
            <Copy aria-hidden="true" className="size-3.5" />
          )}
          <span id={statusId} className="sr-only" aria-live="polite">
            {statusMessage}
          </span>
        </button>
      </div>
    </div>
  );
}

function LinkOptionRow({
  option,
}: {
  option: PortfolioDownloadOption & {
    kind: "github-release" | "app-store" | "play-store" | "link";
  };
}) {
  return (
    <a
      href={option.href}
      target="_blank"
      rel="noreferrer noopener"
      className="flex items-center gap-2 rounded-[var(--portfolio-radius-md)] border border-transparent px-2 py-2 text-portfolio-primary no-underline transition-[background-color,color] duration-150 ease-portfolio focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent [@media(hover:hover)_and_(pointer:fine)]:hover:bg-portfolio-surface-alt"
    >
      {optionIcon(option)}
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[0.75rem] font-semibold leading-[1.2] tracking-normal">
          {option.label}
        </span>
        {option.description ? (
          <span className="mt-0.5 block text-[0.72rem] leading-[1.35] text-portfolio-secondary">
            {option.description}
          </span>
        ) : null}
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 shrink-0 text-portfolio-secondary"
      />
    </a>
  );
}

/**
 * Modular download / install menu for detail-page Download actions.
 * Supports shell one-liners (with copy), GitHub Releases, App Store,
 * Play Store, and generic external links. Extensible via option `kind`.
 */
export function PortfolioDownloadMenu({
  options,
  label = "Download",
}: PortfolioDownloadMenuProps) {
  if (options.length === 0) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className={triggerClassName} aria-label={label}>
          {label}
          <Download aria-hidden="true" className="size-3.5 shrink-0" />
          <ChevronDown
            aria-hidden="true"
            className="size-3 shrink-0 opacity-90"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        className={cn(
          // Mobile: nearly full viewport. sm/md: wider fixed panels, still capped by viewport.
          "portfolio-floating-card w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] sm:w-[28rem] md:w-[32rem] gap-0 p-2 text-portfolio-primary shadow-[var(--portfolio-floating-shadow)]",
          "border-portfolio-border bg-portfolio-surface",
        )}
      >
        <div className="grid gap-2">
          {options.map((option, index) => {
            const key =
              option.kind === "command"
                ? `command-${option.command}`
                : `${option.kind}-${option.href}`;

            return (
              <div key={key} className="grid gap-2">
                {index > 0 ? (
                  <div
                    role="separator"
                    className="h-px bg-portfolio-border"
                  />
                ) : null}
                {option.kind === "command" ? (
                  <CommandOptionRow option={option} />
                ) : (
                  <LinkOptionRow option={option} />
                )}
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
