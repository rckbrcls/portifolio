import type { PortfolioDetailActionItem } from "@/components/portfolio-detail/types";
import type { TWorkCategory } from "@/interface/TWorkCategory";

export type WorkStoryAction = PortfolioDetailActionItem;

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
