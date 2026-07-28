import type { GetStaticPaths, InferGetStaticPropsType } from "next";

import { blogMdxComponents } from "@/components/blog/mdx-components";
import { BuiltWith } from "@/components/built-with";
import { PortfolioDetail } from "@/components/portfolio-detail";
import { getWorkCategoryLabel } from "@/lib/work-category";
import { getWorkStoryComponent } from "@/lib/work-story-content";
import { getAllWorkStories, getWorkStoryBySlug } from "@/lib/work-stories";

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
    <PortfolioDetail
      documentTitle={`${story.title} | Work | rckbrcls`}
      description={story.summary}
    >
      <PortfolioDetail.Header>
        <PortfolioDetail.Toolbar
          backHref="/work"
          actions={story.action ? [story.action] : []}
        />
        <PortfolioDetail.Kicker>
          {getWorkCategoryLabel(story.category)}
        </PortfolioDetail.Kicker>
        <PortfolioDetail.Title
          icon={
            story.icon
              ? {
                  src: story.icon,
                  alt: `${story.title} icon`,
                }
              : undefined
          }
        >
          {story.title}
        </PortfolioDetail.Title>
        <PortfolioDetail.Summary>{story.summary}</PortfolioDetail.Summary>
      </PortfolioDetail.Header>

      <PortfolioDetail.Body>
        {Content ? (
          <PortfolioDetail.Article>
            <Content components={blogMdxComponents} />
            <BuiltWith technologies={story.technologies} />
          </PortfolioDetail.Article>
        ) : (
          <PortfolioDetail.Empty title="The work metadata exists, but the story module could not be loaded." />
        )}
      </PortfolioDetail.Body>
    </PortfolioDetail>
  );
}
