import type { TypeTechStack } from "../../data/techStack";

export type LabActionKind = "primary" | "secondary" | "source";

export interface LabAction {
  label: string;
  href: string;
  kind: LabActionKind;
}

export interface LabProduct {
  slug: string;
  order: number;
  name: string;
  productType: string;
  summary: string;
  /** Optional product identity icon shown to the right of the detail title. */
  icon?: string;
  technologies: TypeTechStack[];
  actions: LabAction[];
}
