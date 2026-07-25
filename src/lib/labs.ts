import { labProducts } from "../../data/labs/labs";

export const orderedLabProducts = [...labProducts].sort(
  (left, right) => left.order - right.order,
);

export function getLabProductBySlug(slug: string) {
  return orderedLabProducts.find((product) => product.slug === slug) ?? null;
}
