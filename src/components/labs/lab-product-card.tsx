import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  editorialListActionMotionClassName,
  editorialListArrowMotionClassName,
  editorialListItemClassName,
  editorialListTitleMotionClassName,
} from "@/components/editorial-list-motion";
import type { LabProduct } from "@/interface/ILabProduct";

interface LabProductCardProps {
  product: LabProduct;
  index: number;
}

const kickerClassName =
  "m-0 font-mono text-[0.72rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-secondary";

export function LabProductCard({ product, index }: LabProductCardProps) {
  const previewNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="relative z-0 min-w-0">
      <Link
        href={`/labs/${product.slug}`}
        data-portfolio-card-surface=""
        className={`${editorialListItemClassName} gap-portfolio-lg p-portfolio-lg max-md:px-0 max-md:py-portfolio-md`}
      >
        <div className="grid gap-3">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-portfolio-lg max-[560px]:grid-cols-1">
            <h2
              className={`m-0 text-[1.65rem] font-semibold leading-[1.02] tracking-normal text-portfolio-primary md:text-2xl ${editorialListTitleMotionClassName}`}
            >
              {product.name}
            </h2>

            <p
              className={`${kickerClassName} justify-self-end text-right max-[560px]:hidden`}
            >
              {previewNumber} / {product.productType}
            </p>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-portfolio-lg max-[560px]:grid-cols-1">
            <p className="m-0 max-w-[46rem] text-[0.96rem] leading-[1.7] text-portfolio-secondary">
              {product.summary}
            </p>

            <span
              className={`inline-flex items-center gap-[0.55rem] justify-self-end font-mono text-[0.8125rem] font-semibold uppercase leading-[1.1] tracking-normal text-portfolio-primary max-[560px]:hidden ${editorialListActionMotionClassName}`}
            >
              Read
              <ArrowUpRight
                aria-hidden="true"
                className={`size-4 ${editorialListArrowMotionClassName}`}
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
