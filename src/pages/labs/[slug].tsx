import type { GetStaticPaths, InferGetStaticPropsType } from "next";

import { BuiltWith } from "@/components/built-with";
import { LabDetailTabs } from "@/components/labs/lab-detail-tabs";
import { LabProductIcon } from "@/components/labs/lab-product-icon";
import { labMdxComponents } from "@/components/labs/lab-mdx-components";
import { PortfolioBackLink } from "@/components/portfolio-back-link";
import { PortfolioDetailAction } from "@/components/portfolio-detail-action";
import {
  PortfolioLayout,
  PortfolioSection,
} from "@/components/portfolio-shell";
import type { LabAction } from "@/interface/ILabProduct";
import { getLabContentComponents } from "@/lib/lab-content";
import { getLabProductBySlug, orderedLabProducts } from "@/lib/labs";

function getLabActionVariant(
  kind: LabAction["kind"],
): "source" | "primary" {
  return kind === "source" ? "source" : "primary";
}

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
    <PortfolioLayout
      title={`${product.name} | Labs | rckbrcls`}
      description={product.summary}
    >
      <PortfolioSection spacing="page-start">
        <div className="grid gap-portfolio-lg">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <PortfolioBackLink href="/labs" />

            {product.actions.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {product.actions.map((action) => {
                  const variant = getLabActionVariant(action.kind);

                  return (
                    <PortfolioDetailAction
                      key={action.href}
                      href={action.href}
                      variant={variant}
                      label={variant === "primary" ? action.label : undefined}
                    />
                  );
                })}
              </div>
            ) : null}
          </div>

          <header className="grid gap-portfolio-lg">
            <p className="portfolio-kicker">Lab / {product.productType}</p>

            <div className="flex items-center gap-portfolio-md">
              {product.icon ? (
                <LabProductIcon
                  src={product.icon}
                  alt={`${product.name} app icon`}
                />
              ) : null}

              <h1 className="m-0 min-w-0 text-[2.7rem] font-bold leading-[0.96] tracking-normal text-portfolio-primary md:text-[3.6rem] lg:text-[4.8rem]">
                {product.name}
              </h1>
            </div>

            <p className="m-0 text-base leading-[1.75] text-portfolio-secondary">
              {product.summary}
            </p>
          </header>

          <LabDetailTabs
            product={
              <article className="grid gap-5">
                <ProductContent components={labMdxComponents} />
              </article>
            }
            engineering={
              <article className="grid gap-5">
                <EngineeringContent components={labMdxComponents} />
                <BuiltWith technologies={product.technologies} />
              </article>
            }
          />
        </div>
      </PortfolioSection>
    </PortfolioLayout>
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
