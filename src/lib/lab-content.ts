import type { ComponentType } from "react";

import { getLabProductBySlug } from "@/lib/labs";

type LabContentModule = {
  default: ComponentType<Record<string, unknown>>;
};

const labContentContext = (require as NodeRequire).context(
  "../../content/labs",
  false,
  /\.mdx$/,
);

const labContentComponents = new Map<
  string,
  ComponentType<Record<string, unknown>>
>();

for (const key of labContentContext.keys()) {
  const match = key.match(/^\.\/([^/]+)\.mdx$/);

  if (!match) {
    continue;
  }

  const [, slug] = match;
  const module = labContentContext<LabContentModule>(key);

  labContentComponents.set(slug, module.default);
}

export function getLabContentComponent(slug: string) {
  if (!getLabProductBySlug(slug)) {
    return null;
  }

  return labContentComponents.get(slug) ?? null;
}
