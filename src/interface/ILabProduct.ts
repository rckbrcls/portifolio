import type { TypeTechStack } from "../../data/techStack";

export type LabActionKind = "primary" | "secondary";

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
  technologies: TypeTechStack[];
  actions: LabAction[];
}
