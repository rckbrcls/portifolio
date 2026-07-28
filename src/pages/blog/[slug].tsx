import type { GetStaticPaths, InferGetStaticPropsType } from "next";

import { BlogPostTags } from "@/components/blog/BlogPostTags";
import { blogMdxComponents } from "@/components/blog/mdx-components";
import { PortfolioBackLink } from "@/components/portfolio-back-link";
import {
  PortfolioLayout,
  PortfolioSection,
} from "@/components/portfolio-shell";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { getBlogPostComponent } from "@/lib/blog-content";
import { formatBlogDate } from "@/lib/blog-shared";

const kickerClassName =
  "m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-secondary";

const emptyStateClassName = "grid gap-portfolio-md";

const emptyStateTitleClassName =
  "m-0 text-[1.65rem] font-semibold leading-[1.02] tracking-normal text-portfolio-primary md:text-2xl";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllBlogPosts();

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
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

  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}

export default function BlogPostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = getBlogPostComponent(post.slug);

  return (
    <PortfolioLayout
      title={`${post.title} | rckbrcls`}
      description={post.summary}
    >
      <PortfolioSection spacing="page-start">
        <div className="grid gap-portfolio-xl">
          <header className="grid gap-portfolio-lg">
            <PortfolioBackLink href="/blog" />
            <h1 className="m-0 text-[2.7rem] font-bold leading-[0.96] tracking-normal text-portfolio-primary md:text-[3.6rem] lg:text-[4.8rem]">
              {post.title}
            </h1>
            <p className="m-0 text-base leading-[1.75] text-portfolio-secondary">
              {post.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.2] tracking-normal text-portfolio-secondary">
                {formatBlogDate(post.publishedAt)}
              </span>

              <BlogPostTags tags={post.tags} />
            </div>
          </header>

          {post.coverImage ? (
            <div className="overflow-hidden">
              <img
                src={post.coverImage}
                alt={`${post.title} cover image`}
                className="block aspect-[1.7] w-full object-cover"
              />
            </div>
          ) : null}

          {Content ? (
            <article className="grid gap-5 [&>*]:m-0 [&_.katex-display]:m-0 [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_.katex-display]:py-1">
              <Content components={blogMdxComponents} />
            </article>
          ) : (
            <article className={emptyStateClassName}>
              <p className={kickerClassName}>Content unavailable</p>
              <h2 className={emptyStateTitleClassName}>
                The post metadata exists, but the content module could not be
                loaded.
              </h2>
            </article>
          )}
        </div>
      </PortfolioSection>
    </PortfolioLayout>
  );
}
