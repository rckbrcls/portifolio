import type { GetStaticPaths, InferGetStaticPropsType } from "next";
import { ArrowUpRight } from "lucide-react";

import { blogMdxComponents } from "@/components/blog/mdx-components";
import {
  PortfolioLayout,
  PortfolioSection,
} from "@/components/portfolio-shell";
import { getWorkStoryComponent } from "@/lib/work-story-content";
import { getAllWorkStories, getWorkStoryBySlug } from "@/lib/work-stories";

const kickerClassName =
  "m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-secondary";

const actionBaseClassName =
  "inline-flex items-center justify-center gap-2 border px-4 py-3 font-mono text-[0.72rem] font-semibold uppercase leading-none tracking-normal no-underline transition-[background-color,border-color,color] duration-150 ease-portfolio focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent";

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
            <p className={kickerClassName}>{story.context}</p>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-portfolio-lg max-md:grid-cols-1">
              <h1 className="m-0 max-w-[12ch] text-[2.7rem] font-bold leading-[0.96] tracking-normal text-portfolio-primary max-md:max-w-none md:text-[3.6rem] lg:text-[4.8rem]">
                {story.title}
              </h1>

              {story.links?.length ? (
                <div
                  className="flex flex-wrap justify-end gap-3 max-md:justify-start"
                  aria-label="Work links"
                >
                  {story.links.map((storyLink) => {
                    const isExternal = /^https?:\/\//.test(storyLink.href);
                    const isPrimary = storyLink.kind === "primary";

                    return (
                      <a
                        key={`${storyLink.label}-${storyLink.href}`}
                        href={storyLink.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer noopener" : undefined}
                        className={`${actionBaseClassName} ${
                          isPrimary
                            ? "border-portfolio-primary bg-portfolio-primary text-portfolio-neutral hover:border-portfolio-accent hover:bg-portfolio-accent"
                            : "border-portfolio-border bg-portfolio-surface text-portfolio-primary hover:border-portfolio-accent-border hover:text-portfolio-accent"
                        }`}
                      >
                        {storyLink.label}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
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

          {story.gallery?.length ? (
            <section className="grid max-w-[58rem] gap-portfolio-lg">
              <div className="grid gap-2">
                <p className={kickerClassName}>Gallery</p>
                <h2 className="m-0 text-[2rem] font-[650] leading-[1.02] tracking-normal text-portfolio-primary lg:text-4xl">
                  Product views.
                </h2>
              </div>

              <div className="grid gap-portfolio-lg">
                {story.gallery.map((image) => (
                  <figure key={image.src} className="grid gap-3">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="block h-auto w-full border border-portfolio-border bg-portfolio-surface-alt object-cover"
                      loading="lazy"
                    />
                    {image.caption ? (
                      <figcaption className="m-0 text-[0.88rem] leading-[1.6] text-portfolio-secondary">
                        {image.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </PortfolioSection>
    </PortfolioLayout>
  );
}
