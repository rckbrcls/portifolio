import type { PortfolioDetailActionItem } from "@/components/portfolio-detail/types";
import type { TypeTechStack } from "../../data/techStack";

export type LabAction = PortfolioDetailActionItem;

export interface LabProduct {
  slug: string;
  order: number;
  name: string;
  productType: string;
  summary: string;
  /** Optional product identity icon shown to the left of the detail title. */
  icon?: string;
  technologies: TypeTechStack[];
  actions: PortfolioDetailActionItem[];
}
