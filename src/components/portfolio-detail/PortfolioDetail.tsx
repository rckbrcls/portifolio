import type { ReactNode } from "react";

import { BlogPostTags } from "@/components/blog/BlogPostTags";
import { LabProductIcon } from "@/components/labs/lab-product-icon";
import { PortfolioDetailAction } from "@/components/portfolio-detail/PortfolioDetailAction";
import type { PortfolioDetailActionItem } from "@/components/portfolio-detail/types";
import {
  PortfolioLayout,
  PortfolioSection,
} from "@/components/portfolio-shell";
import { cn } from "@/lib/utils";

export const portfolioDetailKickerClassName =
  "m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-secondary";

const titleClassName =
  "m-0 min-w-0 text-[2rem] font-bold leading-[1.02] tracking-normal text-portfolio-primary md:text-[2.5rem] lg:text-[3rem]";

const summaryClassName =
  "m-0 text-sm leading-[1.65] text-portfolio-secondary";

const articleClassName =
  "grid gap-5 [&>*]:m-0 [&_.katex-display]:m-0 [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_.katex-display]:py-1";

type PortfolioDetailRootProps = {
  documentTitle: string;
  description: string;
  children: ReactNode;
};

type PortfolioDetailActionsProps = {
  actions?: readonly PortfolioDetailActionItem[];
};

type PortfolioDetailTitleProps = {
  children: ReactNode;
  icon?: {
    src: string;
    alt: string;
    /** Theme-gray CSS mask — use for monochrome brand marks (e.g. DOST). */
    monochrome?: boolean;
  };
};

type PortfolioDetailCoverProps = {
  src: string;
  alt: string;
};

type PortfolioDetailEmptyProps = {
  title: string;
};

function PortfolioDetailRoot({
  documentTitle,
  description,
  children,
}: PortfolioDetailRootProps) {
  return (
    <PortfolioLayout title={documentTitle} description={description}>
      <PortfolioSection spacing="page-start">
        <div className="grid gap-portfolio-xl">{children}</div>
      </PortfolioSection>
    </PortfolioLayout>
  );
}

function PortfolioDetailHeader({ children }: { children: ReactNode }) {
  return <header className="grid gap-portfolio-lg">{children}</header>;
}

/** Canonical Source / Project / Download row — place at the end of the article. */
function PortfolioDetailActions({
  actions = [],
}: PortfolioDetailActionsProps) {
  if (actions.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 border-t border-portfolio-border pt-6">
      {actions.map((action) => (
        <PortfolioDetailAction
          key={`${action.type}-${action.href}`}
          href={action.href}
          type={action.type}
        />
      ))}
    </div>
  );
}

function PortfolioDetailKicker({ children }: { children: ReactNode }) {
  return <p className={portfolioDetailKickerClassName}>{children}</p>;
}

function PortfolioDetailTitle({ children, icon }: PortfolioDetailTitleProps) {
  return (
    <div className="flex items-end gap-3">
      <h1 className={titleClassName}>{children}</h1>
      {icon ? (
        <LabProductIcon
          src={icon.src}
          alt={icon.alt}
          monochrome={icon.monochrome}
        />
      ) : null}
    </div>
  );
}

function PortfolioDetailSummary({ children }: { children: ReactNode }) {
  return <p className={summaryClassName}>{children}</p>;
}

function PortfolioDetailMeta({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      {children}
    </div>
  );
}

function PortfolioDetailMetaDate({ children }: { children: ReactNode }) {
  return (
    <span className="m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.2] tracking-normal text-portfolio-secondary">
      {children}
    </span>
  );
}

function PortfolioDetailMetaTags({ tags }: { tags: readonly string[] }) {
  return <BlogPostTags tags={tags} />;
}

function PortfolioDetailCover({ src, alt }: PortfolioDetailCoverProps) {
  return (
    <div className="overflow-hidden">
      <img
        src={src}
        alt={alt}
        className="block aspect-[1.7] w-full object-cover"
      />
    </div>
  );
}

function PortfolioDetailBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("grid gap-portfolio-xl", className)}>{children}</div>;
}

function PortfolioDetailArticle({ children }: { children: ReactNode }) {
  return <article className={articleClassName}>{children}</article>;
}

function PortfolioDetailEmpty({ title }: PortfolioDetailEmptyProps) {
  return (
    <article className="grid gap-portfolio-md">
      <p className={portfolioDetailKickerClassName}>Content unavailable</p>
      <h2 className="m-0 text-[1.65rem] font-semibold leading-[1.02] tracking-normal text-portfolio-primary md:text-2xl">
        {title}
      </h2>
    </article>
  );
}

export const PortfolioDetail = Object.assign(PortfolioDetailRoot, {
  Header: PortfolioDetailHeader,
  Actions: PortfolioDetailActions,
  Kicker: PortfolioDetailKicker,
  Title: PortfolioDetailTitle,
  Summary: PortfolioDetailSummary,
  Meta: PortfolioDetailMeta,
  MetaDate: PortfolioDetailMetaDate,
  MetaTags: PortfolioDetailMetaTags,
  Cover: PortfolioDetailCover,
  Body: PortfolioDetailBody,
  Article: PortfolioDetailArticle,
  Empty: PortfolioDetailEmpty,
});
