import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BlogPostTags } from "@/components/blog/BlogPostTags";
import type { BlogPostMeta } from "@/lib/blog-shared";
import { formatBlogDate } from "@/lib/blog-shared";

type BlogPostCardProps = {
  post: BlogPostMeta;
};

const editorialListItemClassName =
  "group grid min-h-0 content-start gap-portfolio-md rounded-[var(--portfolio-radius-lg)] border border-portfolio-neutral bg-portfolio-neutral p-portfolio-lg text-inherit no-underline shadow-none transition-[background-color,border-color,box-shadow,color] duration-300 ease-portfolio hover:border-[color:var(--portfolio-floating-border)] hover:bg-portfolio-surface hover:[box-shadow:var(--portfolio-floating-shadow)] focus-visible:border-[color:var(--portfolio-floating-border)] focus-visible:bg-portfolio-surface focus-visible:[box-shadow:var(--portfolio-floating-shadow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent max-md:p-portfolio-md";

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article>
      <Link
        data-portfolio-card-surface=""
        href={`/blog/${post.slug}`}
        className={editorialListItemClassName}
      >
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.2] tracking-normal text-portfolio-secondary">
              {formatBlogDate(post.publishedAt)}
            </p>

            <BlogPostTags tags={post.tags} />
          </div>

          <div className="grid gap-3">
            <h3 className="m-0 text-[1.65rem] font-semibold leading-[1.02] tracking-normal text-portfolio-primary group-hover:text-portfolio-accent group-focus-visible:text-portfolio-accent md:text-2xl">
              {post.title}
            </h3>
            <p className="m-0 text-[0.96rem] leading-[1.7] text-portfolio-secondary">
              {post.summary}
            </p>
          </div>

          <span className="inline-flex items-center gap-[0.55rem] font-mono text-[0.8125rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-primary transition-[color,transform] duration-300 ease-portfolio group-hover:text-portfolio-accent group-focus-visible:text-portfolio-accent">
            Read
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-portfolio group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-focus-visible:-translate-y-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transform-none" />
          </span>
        </div>
      </Link>
    </article>
  );
}
