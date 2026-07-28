import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";

import { cn } from "@/lib/utils";

type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
};

const proseHeadingClassName = "tracking-normal text-portfolio-primary";

const proseLargeHeadingClassName =
  "mt-4 text-[1.35rem] font-[650] leading-[1.15] md:text-[1.65rem]";

const proseBodyClassName = "text-base leading-[1.85] text-portfolio-secondary";

const proseListClassName = "grid list-disc gap-3 pl-5 text-portfolio-secondary";

const proseImageClassName =
  "block aspect-[1.7] w-full overflow-hidden border border-portfolio-border bg-portfolio-surface-alt object-cover";

function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="grid gap-3">
      <img src={src} alt={alt} className={proseImageClassName} loading="lazy" />
      {caption ? (
        <figcaption className="m-0 text-[0.88rem] leading-[1.6] text-portfolio-secondary">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Code({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"code">) {
  const isBlockCode = Boolean(className);

  return (
    <code
      className={cn(
        isBlockCode
          ? "border-0 bg-inherit p-0 font-mono text-[0.88rem] leading-[1.7] text-portfolio-code-foreground"
          : "rounded-[var(--portfolio-radius-sm)] border border-portfolio-border bg-portfolio-surface-alt px-[0.4rem] py-[0.15rem] font-mono text-[0.86rem] text-portfolio-primary",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
}

export const blogMdxComponents: MDXComponents = {
  h1: ({ className, ...props }) => (
    <h1
      className={cn(
        proseHeadingClassName,
        proseLargeHeadingClassName,
        className,
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(
        proseHeadingClassName,
        proseLargeHeadingClassName,
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        proseHeadingClassName,
        "mt-3 text-[1.15rem] font-semibold leading-[1.2] md:text-[1.25rem]",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }) => (
    <h4
      className={cn(
        proseHeadingClassName,
        "text-[1.1rem] font-semibold leading-[1.25]",
        className,
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p className={cn(proseBodyClassName, className)} {...props} />
  ),
  a: ({ className, href, ...props }) => {
    const isExternal = typeof href === "string" && /^https?:\/\//.test(href);

    return (
      <a
        href={href}
        className={cn(
          "text-portfolio-accent underline decoration-portfolio-accent-border underline-offset-[0.22em] hover:decoration-portfolio-accent",
          className,
        )}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer noopener" : undefined}
        {...props}
      />
    );
  },
  ul: ({ className, ...props }) => (
    <ul className={cn(proseListClassName, className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(proseListClassName, "list-decimal", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }) => (
    <li className={cn(proseBodyClassName, className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "border-l-[3px] border-portfolio-accent pl-4 text-base leading-[1.8] text-portfolio-primary",
        className,
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "overflow-x-auto border border-portfolio-border bg-portfolio-code-surface px-[1.125rem] py-4",
        className,
      )}
      {...props}
    />
  ),
  code: Code,
  hr: ({ className, ...props }) => (
    <hr
      className={cn("border-0 border-t border-portfolio-border", className)}
      {...props}
    />
  ),
  strong: ({ className, ...props }) => (
    <strong className={cn("text-portfolio-primary", className)} {...props} />
  ),
  em: ({ className, ...props }) => <em className={cn(className)} {...props} />,
  table: ({ className, ...props }) => (
    <div className="overflow-x-auto">
      <table className={cn("w-full border-collapse", className)} {...props} />
    </div>
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border border-portfolio-border px-[0.85rem] py-3 text-left align-top font-mono text-[0.72rem] font-semibold uppercase tracking-normal text-portfolio-primary",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border border-portfolio-border px-[0.85rem] py-3 text-left align-top text-[0.96rem] leading-[1.7] text-portfolio-secondary",
        className,
      )}
      {...props}
    />
  ),
  img: ({ className, alt = "", ...props }) => (
    <img
      alt={alt}
      className={cn(proseImageClassName, className)}
      loading="lazy"
      {...props}
    />
  ),
  Figure,
};
