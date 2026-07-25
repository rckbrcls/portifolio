import type { ComponentType } from "react";

import { getLabProductBySlug } from "@/lib/labs";

export type LabContentView = "product" | "engineering";

type LabContentModule = {
  default: ComponentType<Record<string, unknown>>;
};

type LabContentComponents = Partial<
  Record<LabContentView, ComponentType<Record<string, unknown>>>
>;

const labContentContext = (require as NodeRequire).context(
  "../../content/labs",
  true,
  /\/(product|engineering)\.mdx$/,
);

const labContentComponents = new Map<string, LabContentComponents>();

for (const key of labContentContext.keys()) {
  const match = key.match(/^\.\/([^/]+)\/(product|engineering)\.mdx$/);

  if (!match) {
    continue;
  }

  const [, slug, view] = match as [string, string, LabContentView];
  const productComponents = labContentComponents.get(slug) ?? {};
  const module = labContentContext<LabContentModule>(key);

  productComponents[view] = module.default;
  labContentComponents.set(slug, productComponents);
}

export function getLabContentComponents(slug: string) {
  if (!getLabProductBySlug(slug)) {
    return null;
  }

  const components = labContentComponents.get(slug);

  if (!components?.product || !components.engineering) {
    return null;
  }

  return {
    product: components.product,
    engineering: components.engineering,
  };
}
