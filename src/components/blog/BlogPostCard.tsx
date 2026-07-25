import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BlogPostTags } from "@/components/blog/BlogPostTags";
import {
  editorialListActionMotionClassName,
  editorialListArrowMotionClassName,
  editorialListItemClassName,
  editorialListTitleMotionClassName,
} from "@/components/editorial-list-motion";
import type { BlogPostMeta } from "@/lib/blog-shared";
import { formatBlogDate } from "@/lib/blog-shared";

type BlogPostCardProps = {
  post: BlogPostMeta;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <article>
      <Link
        data-portfolio-card-surface=""
        href={`/blog/${post.slug}`}
        className={`${editorialListItemClassName} gap-portfolio-md p-portfolio-lg max-md:p-portfolio-md`}
      >
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.2] tracking-normal text-portfolio-secondary">
              {formatBlogDate(post.publishedAt)}
            </p>

            <BlogPostTags tags={post.tags} />
          </div>

          <div className="grid gap-3">
            <h3
              className={`m-0 text-[1.65rem] font-semibold leading-[1.02] tracking-normal text-portfolio-primary md:text-2xl ${editorialListTitleMotionClassName}`}
            >
              {post.title}
            </h3>
            <p className="m-0 text-[0.96rem] leading-[1.7] text-portfolio-secondary">
              {post.summary}
            </p>
          </div>

          <span
            className={`inline-flex items-center gap-[0.55rem] font-mono text-[0.8125rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-primary ${editorialListActionMotionClassName}`}
          >
            Read
            <ArrowUpRight
              className={`h-4 w-4 ${editorialListArrowMotionClassName}`}
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
