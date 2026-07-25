import type { InferGetStaticPropsType } from "next";

import { BlogPostCard } from "@/components/blog/BlogPostCard";
import {
  PortfolioCollection,
  PortfolioEditorialStack,
  PortfolioLayout,
  PortfolioPageIntro,
  PortfolioSection,
  PortfolioSectionBody,
} from "@/components/portfolio-shell";
import { WordRotate } from "@/components/ui/word-rotate";
import { getAllBlogPosts } from "@/lib/blog";

const BLOG_TITLE_VARIANTS = [
  "Writing.",
  "Notes.",
  "Essays.",
  "Posts.",
  "Journal.",
];

const kickerClassName =
  "m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-secondary";

const emptyStateClassName = "grid gap-portfolio-md";

const emptyStateTitleClassName =
  "m-0 text-[1.65rem] font-semibold leading-[1.02] tracking-normal text-portfolio-primary md:text-2xl";

const emptyStateCopyClassName =
  "m-0 text-[0.96rem] leading-[1.7] text-portfolio-secondary";

export async function getStaticProps() {
  return {
    props: {
      posts: getAllBlogPosts(),
    },
  };
}

export default function BlogIndexPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <PortfolioLayout
      title="Blog | rckbrcls"
      description="Writing by Erick Barcelos."
    >
      <PortfolioEditorialStack>
        <PortfolioPageIntro
          kicker="Blog"
          title="Writing."
          titleVisual={<WordRotate words={BLOG_TITLE_VARIANTS} />}
        />

        <PortfolioSection spacing="stack-tight">
          <PortfolioSectionBody>
            {posts.length > 0 ? (
              <PortfolioCollection columns={1}>
                {posts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </PortfolioCollection>
            ) : (
              <article className={emptyStateClassName}>
                <p className={kickerClassName}>No posts yet</p>
                <h2 className={emptyStateTitleClassName}>
                  The archive is ready for the first entry.
                </h2>
                <p className={emptyStateCopyClassName}>
                  Publish an MDX post and it will appear here automatically.
                </p>
              </article>
            )}
          </PortfolioSectionBody>
        </PortfolioSection>
      </PortfolioEditorialStack>
    </PortfolioLayout>
  );
}
