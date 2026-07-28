import type { GetStaticPaths, InferGetStaticPropsType } from "next";

import { BuiltWith } from "@/components/built-with";
import { LabDetailTabs } from "@/components/labs/lab-detail-tabs";
import { labMdxComponents } from "@/components/labs/lab-mdx-components";
import { PortfolioDetail } from "@/components/portfolio-detail";
import { getLabContentComponents } from "@/lib/lab-content";
import { getLabProductBySlug, orderedLabProducts } from "@/lib/labs";

export default function LabProductPage({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const content = getLabContentComponents(product.slug);

  if (!content) {
    return null;
  }

  const ProductContent = content.product;
  const EngineeringContent = content.engineering;

  return (
    <PortfolioDetail
      documentTitle={`${product.name} | Labs | rckbrcls`}
      description={product.summary}
    >
      <PortfolioDetail.Header>
        <PortfolioDetail.Toolbar
          backHref="/labs"
          actions={product.actions}
        />
        <PortfolioDetail.Kicker>{product.productType}</PortfolioDetail.Kicker>
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
        <PortfolioDetail.Summary>{product.summary}</PortfolioDetail.Summary>
      </PortfolioDetail.Header>

      <PortfolioDetail.Body>
        <LabDetailTabs
          product={
            <PortfolioDetail.Article>
              <ProductContent components={labMdxComponents} />
            </PortfolioDetail.Article>
          }
          engineering={
            <PortfolioDetail.Article>
              <EngineeringContent components={labMdxComponents} />
              <BuiltWith technologies={product.technologies} />
            </PortfolioDetail.Article>
          }
        />
      </PortfolioDetail.Body>
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

  if (!product || !getLabContentComponents(product.slug)) {
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
