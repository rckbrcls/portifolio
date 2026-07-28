import type { GetStaticPaths, InferGetStaticPropsType } from "next";

import { blogMdxComponents } from "@/components/blog/mdx-components";
import { PortfolioDetail } from "@/components/portfolio-detail";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { getBlogPostComponent } from "@/lib/blog-content";
import { formatBlogDate } from "@/lib/blog-shared";

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
    <PortfolioDetail
      documentTitle={`${post.title} | rckbrcls`}
      description={post.summary}
    >
      <PortfolioDetail.Header>
        <PortfolioDetail.Title>{post.title}</PortfolioDetail.Title>
        <PortfolioDetail.Summary>{post.summary}</PortfolioDetail.Summary>
        <PortfolioDetail.Meta>
          <PortfolioDetail.MetaDate>
            {formatBlogDate(post.publishedAt)}
          </PortfolioDetail.MetaDate>
          <PortfolioDetail.MetaTags tags={post.tags} />
        </PortfolioDetail.Meta>
      </PortfolioDetail.Header>

      {post.coverImage ? (
        <PortfolioDetail.Cover
          src={post.coverImage}
          alt={`${post.title} cover image`}
        />
      ) : null}

      <PortfolioDetail.Body>
        {Content ? (
          <PortfolioDetail.Article>
            <Content components={blogMdxComponents} />
          </PortfolioDetail.Article>
        ) : (
          <PortfolioDetail.Empty title="The post metadata exists, but the content module could not be loaded." />
        )}
      </PortfolioDetail.Body>
    </PortfolioDetail>
  );
}
