import type { TWorkCategory } from "@/interface/TWorkCategory";

export type WorkStoryAction = {
  type: "project" | "source";
  href: string;
};

export type WorkStoryFrontmatter = {
  title: string;
  summary: string;
  role: string;
  period: string;
  status: string;
  category: TWorkCategory;
  technologies: string[];
  action?: WorkStoryAction;
};

export type WorkStoryMeta = WorkStoryFrontmatter & {
  slug: string;
};
