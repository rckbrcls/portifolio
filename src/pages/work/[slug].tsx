import type { GetStaticPaths, InferGetStaticPropsType } from "next";

import { blogMdxComponents } from "@/components/blog/mdx-components";
import { BuiltWith } from "@/components/built-with";
import { PortfolioBackLink } from "@/components/portfolio-back-link";
import { PortfolioDetailAction } from "@/components/portfolio-detail-action";
import {
  PortfolioLayout,
  PortfolioSection,
} from "@/components/portfolio-shell";
import { getWorkCategoryLabel } from "@/lib/work-category";
import { getWorkStoryComponent } from "@/lib/work-story-content";
import { getAllWorkStories, getWorkStoryBySlug } from "@/lib/work-stories";

const kickerClassName =
  "m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-secondary";

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
          <header className="grid gap-portfolio-lg">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <PortfolioBackLink href="/work" />

              {story.action ? (
                <PortfolioDetailAction
                  href={story.action.href}
                  variant={story.action.type}
                />
              ) : null}
            </div>

            <p className={kickerClassName}>
              {getWorkCategoryLabel(story.category)}
            </p>

            <h1 className="m-0 text-[2.7rem] font-bold leading-[0.96] tracking-normal text-portfolio-primary md:text-[3.6rem] lg:text-[4.8rem]">
              {story.title}
            </h1>

            <p className="m-0 text-base leading-[1.75] text-portfolio-secondary">
              {story.summary}
            </p>
          </header>

          <div className="grid gap-portfolio-xl">
            {Content ? (
              <article className="grid gap-5 [&>*]:m-0 [&_.katex-display]:m-0 [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_.katex-display]:py-1">
                <Content components={blogMdxComponents} />
                <BuiltWith technologies={story.technologies} />
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
