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
  /** Optional product identity icon shown tightly to the right of the detail title. */
  icon?: string;
  /** When true, render `icon` as a theme-gray mask (light + dark). */
  iconMonochrome?: boolean;
  action?: WorkStoryAction;
};

export type WorkStoryMeta = WorkStoryFrontmatter & {
  slug: string;
};
