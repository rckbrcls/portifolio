import type { ComponentType } from "react";

const workStoryContext = (require as NodeRequire).context(
  "../../content/work",
  false,
  /\.mdx$/,
);

type WorkStoryModule = {
  default: ComponentType<Record<string, unknown>>;
};

const workStoryModules = new Map<string, WorkStoryModule>();

for (const key of workStoryContext.keys()) {
  if (key.startsWith("./_")) {
    continue;
  }

  const slug = key.replace(/^\.\//, "").replace(/\.mdx$/, "");
  workStoryModules.set(slug, workStoryContext<WorkStoryModule>(key));
}

export function getWorkStoryComponent(slug: string) {
  return workStoryModules.get(slug)?.default ?? null;
}
