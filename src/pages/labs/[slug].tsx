import type { GetStaticPaths, InferGetStaticPropsType } from "next";

import { BuiltWith } from "@/components/built-with";
import { labMdxComponents } from "@/components/labs/lab-mdx-components";
import { PortfolioDetail } from "@/components/portfolio-detail";
import { getLabContentComponent } from "@/lib/lab-content";
import { getLabProductBySlug, orderedLabProducts } from "@/lib/labs";

export default function LabProductPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Content = getLabContentComponent(product.slug);

  if (!Content) {
    return null;
  }

  return (
    <PortfolioDetail
      documentTitle={`${product.name} | Labs | rckbrcls`}
      description={product.summary}
    >
      <PortfolioDetail.Header>
        <PortfolioDetail.Title
          icon={
            product.icon
              ? {
                  src: product.icon,
                  alt: `${product.name} app icon`,
                }
              : undefined
          }
        >
          {product.name}
        </PortfolioDetail.Title>
        <PortfolioDetail.Kicker>{product.productType}</PortfolioDetail.Kicker>
        <PortfolioDetail.Summary>{product.summary}</PortfolioDetail.Summary>
      </PortfolioDetail.Header>

      <PortfolioDetail.Body>
        <PortfolioDetail.Article>
          <Content components={labMdxComponents} />
          <BuiltWith technologies={product.technologies} />
        </PortfolioDetail.Article>
      </PortfolioDetail.Body>

      <PortfolioDetail.Actions actions={product.actions} />
    </PortfolioDetail>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: orderedLabProducts.map(({ slug }) => ({
    params: { slug },
  })),
  fallback: false,
});

export function getStaticProps({ params }: { params?: { slug?: string } }) {
  const product = params?.slug ? getLabProductBySlug(params.slug) : undefined;

  if (!product || !getLabContentComponent(product.slug)) {
    return {
      notFound: true as const,
    };
  }

  return {
    props: {
      product,
    },
  };
}
