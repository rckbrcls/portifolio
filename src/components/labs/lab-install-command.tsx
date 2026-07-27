"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

type CopyStatus = "idle" | "copied" | "error";

interface LabInstallCommandProps {
  command: string;
}

const COPY_STATUS_RESET_DELAY_MS = 2000;

export function LabInstallCommand({ command }: LabInstallCommandProps) {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  const resetTimeoutRef = useRef<number | null>(null);

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
      await navigator.clipboard.writeText(command);
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
    <div className="portfolio-floating-card flex min-w-0 items-stretch overflow-hidden">
      <pre className="min-w-0 flex-1 overflow-x-auto bg-transparent px-[1.125rem] py-4">
        <code className="border-0 bg-inherit p-0 font-mono text-[0.88rem] leading-[1.7] text-portfolio-primary">
          {command}
        </code>
      </pre>

      <button
        type="button"
        aria-label={actionLabel}
        title={actionLabel}
        onClick={handleCopy}
        className="inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center border-0 border-l border-portfolio-border bg-transparent text-portfolio-secondary transition-[background-color,color,transform] duration-150 ease-portfolio focus-visible:bg-portfolio-surface-alt focus-visible:text-portfolio-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-portfolio-accent active:scale-[0.97] motion-reduce:transform-none motion-reduce:transition-none [@media(hover:hover)_and_(pointer:fine)]:hover:bg-portfolio-surface-alt [@media(hover:hover)_and_(pointer:fine)]:hover:text-portfolio-primary"
      >
        {copyStatus === "copied" ? (
          <Check aria-hidden="true" className="size-4" />
        ) : (
          <Copy aria-hidden="true" className="size-4" />
        )}
        <span className="sr-only" aria-live="polite">
          {statusMessage}
        </span>
      </button>
    </div>
  );
}
