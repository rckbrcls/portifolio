import type { GetStaticPaths, InferGetStaticPropsType } from "next";
import { ArrowUpRight } from "lucide-react";

import { BuiltWith } from "@/components/built-with";
import { LabDetailTabs } from "@/components/labs/lab-detail-tabs";
import { labMdxComponents } from "@/components/labs/lab-mdx-components";
import { PortfolioBackLink } from "@/components/portfolio-back-link";
import {
  PortfolioLayout,
  PortfolioSection,
} from "@/components/portfolio-shell";
import type { LabAction } from "@/interface/ILabProduct";
import { getLabContentComponents } from "@/lib/lab-content";
import { getLabProductBySlug, orderedLabProducts } from "@/lib/labs";

const actionClassNames: Record<LabAction["kind"], string> = {
  primary:
    "border-[color:var(--portfolio-action-border)] bg-portfolio-accent text-white [box-shadow:var(--portfolio-floating-shadow)] hover:border-[color:var(--portfolio-action-border-hover)] hover:bg-portfolio-accent-hover focus-visible:border-[color:var(--portfolio-action-border-hover)] focus-visible:bg-portfolio-accent-hover",
  secondary:
    "border-portfolio-border bg-portfolio-surface text-portfolio-primary hover:bg-portfolio-surface-alt focus-visible:bg-portfolio-surface-alt",
};

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
          <PortfolioBackLink href="/labs" />

          <header className="grid gap-portfolio-lg">
            <p className="portfolio-kicker">Lab / {product.productType}</p>

            <div className="grid gap-portfolio-lg lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="max-w-[50rem]">
                <h1 className="m-0 max-w-[12ch] text-[2.7rem] font-bold leading-[0.96] tracking-normal text-portfolio-primary md:text-[3.6rem] lg:text-[4.8rem]">
                  {product.name}
                </h1>
                <p className="mb-0 mt-6 max-w-[46rem] text-base leading-[1.75] text-portfolio-secondary">
                  {product.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                {product.actions.map((action) => (
                  <a
                    key={action.href}
                    href={action.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--portfolio-radius-lg)] border px-4 py-3 font-mono text-[0.72rem] font-semibold uppercase leading-none tracking-normal no-underline transition-[background-color,border-color,box-shadow,color,transform] duration-portfolio-180 ease-portfolio-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent active:scale-[0.97] active:[box-shadow:none] motion-reduce:transform-none motion-reduce:transition-none motion-reduce:active:transform-none ${actionClassNames[action.kind]}`}
                  >
                    {action.label}
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </header>

          <LabDetailTabs
            product={
              <article className="grid gap-5 [&>h2]:max-w-[44rem] [&>ol]:max-w-[44rem] [&>p]:max-w-[44rem] [&>ul]:max-w-[44rem]">
                <ProductContent components={labMdxComponents} />
              </article>
            }
            engineering={
              <article className="grid max-w-[46rem] gap-5">
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
