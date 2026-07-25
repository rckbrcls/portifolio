import type { GetStaticPaths, InferGetStaticPropsType } from "next";
import { ArrowUpRight } from "lucide-react";

import { blogMdxComponents } from "@/components/blog/mdx-components";
import { PortfolioBackLink } from "@/components/portfolio-back-link";
import {
  PortfolioLayout,
  PortfolioSection,
} from "@/components/portfolio-shell";
import { getWorkCategoryLabel } from "@/lib/work-category";
import { getWorkStoryComponent } from "@/lib/work-story-content";
import { getAllWorkStories, getWorkStoryBySlug } from "@/lib/work-stories";

const kickerClassName =
  "m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-secondary";

const actionBaseClassName =
  "inline-flex items-center justify-center justify-self-end gap-2 rounded-[var(--portfolio-radius-lg)] border border-[color:var(--portfolio-action-border)] bg-portfolio-accent px-4 py-3 font-mono text-[0.72rem] font-semibold uppercase leading-none tracking-normal text-white no-underline [box-shadow:var(--portfolio-action-shadow)] transition-[background-color,border-color,box-shadow,color,transform] duration-portfolio-180 ease-portfolio-hover hover:border-[color:var(--portfolio-action-border-hover)] hover:bg-portfolio-accent-hover focus-visible:border-[color:var(--portfolio-action-border-hover)] focus-visible:bg-portfolio-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent active:scale-[0.97] active:[box-shadow:none] motion-reduce:transform-none motion-reduce:active:transform-none max-md:justify-self-start";

export const getStaticPaths: GetStaticPaths = async () => {
  const stories = getAllWorkStories();

  return {
    paths: stories.map((story) => ({
      params: {
        slug: story.slug,
      },
    })),
    fallback: false,
  };
};

export async function getStaticProps({
  params,
}: {
  params?: { slug?: string | string[] };
}) {
  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const story = getWorkStoryBySlug(slug);

  if (!story) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      story,
    },
  };
}

export default function WorkStoryPage({
  story,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = getWorkStoryComponent(story.slug);

  return (
    <PortfolioLayout
      title={`${story.title} | Work | rckbrcls`}
      description={story.summary}
    >
      <PortfolioSection spacing="page-start">
        <div className="grid gap-portfolio-xl">
          <header className="grid max-w-[58rem] gap-portfolio-lg">
            <div className="grid justify-items-start gap-portfolio-md">
              <PortfolioBackLink href="/work" />
              <p className={kickerClassName}>
                {getWorkCategoryLabel(story.category)}
              </p>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-portfolio-lg max-md:grid-cols-1">
              <h1 className="m-0 max-w-[12ch] text-[2.7rem] font-bold leading-[0.96] tracking-normal text-portfolio-primary max-md:max-w-none md:text-[3.6rem] lg:text-[4.8rem]">
                {story.title}
              </h1>

              {story.action ? (
                <a
                  href={story.action.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={actionBaseClassName}
                >
                  {story.action.type === "source"
                    ? "View source"
                    : "View project"}
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              ) : null}
            </div>

            <p className="m-0 max-w-[46rem] text-base leading-[1.75] text-portfolio-secondary">
              {story.summary}
            </p>
          </header>

          <div className="grid max-w-[44rem] gap-portfolio-xl">
            {Content ? (
              <article className="grid gap-5 [&>*]:m-0 [&_.katex-display]:m-0 [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_.katex-display]:py-1">
                <Content components={blogMdxComponents} />
              </article>
            ) : (
              <article className="grid gap-portfolio-md">
                <p className={kickerClassName}>Content unavailable</p>
                <h2 className="m-0 text-[1.65rem] font-semibold leading-[1.02] tracking-normal text-portfolio-primary md:text-2xl">
                  The work metadata exists, but the story module could not be
                  loaded.
                </h2>
              </article>
            )}
          </div>
        </div>
      </PortfolioSection>
    </PortfolioLayout>
  );
}
