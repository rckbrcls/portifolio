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
        className={`${editorialListItemClassName} gap-portfolio-lg p-portfolio-lg max-md:p-portfolio-md`}
      >
        <div className="grid gap-3">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-portfolio-lg max-[560px]:grid-cols-1">
            <h3
              className={`m-0 text-[1.65rem] font-semibold leading-[1.02] tracking-normal text-portfolio-primary md:text-2xl ${editorialListTitleMotionClassName}`}
            >
              {post.title}
            </h3>

            <div className="flex flex-wrap items-center justify-end gap-3 text-right max-[560px]:justify-start max-[560px]:text-left">
              <p className="m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.2] tracking-normal text-portfolio-secondary">
                {formatBlogDate(post.publishedAt)}
              </p>

              <BlogPostTags tags={post.tags} />
            </div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-portfolio-lg max-[560px]:grid-cols-1">
            <p className="m-0 text-[0.96rem] leading-[1.7] text-portfolio-secondary">
              {post.summary}
            </p>

            <span
              className={`inline-flex items-center gap-[0.55rem] justify-self-end font-mono text-[0.8125rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-primary max-[560px]:hidden ${editorialListActionMotionClassName}`}
            >
              Read
              <ArrowUpRight
                className={`h-4 w-4 ${editorialListArrowMotionClassName}`}
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
