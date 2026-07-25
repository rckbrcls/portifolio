import { StaticImageData } from "next/image";
import { IVisualization } from "./IVisualization";
import type { TWorkCategory } from "./TWorkCategory";
import { TypeTechStack } from "../../data/techStack";
import { Route } from "next";

type TProjectStatus = "finished" | "working" | "designing" | "sunsetting";
export type TProjectPreviewMode = "image" | "iframe";
export type TPortfolioVisibility = "public" | "hidden";

export interface IProject {
  slug: string;
  description: string;
  name: string;
  techStack: TypeTechStack[];
  timeline: { start: string; end: string } | null | undefined;
  gitLink?: Route;
  link?: Route;
  npmUrl?: Route;
  members: string[];
  projectVisualization?: IVisualization[];
  coverImage?: StaticImageData | string;
  previewMode?: TProjectPreviewMode;
  status: TProjectStatus;
  workCategory: TWorkCategory;
  portfolioVisibility?: TPortfolioVisibility;
  hasStory?: boolean;
  order?: number;
}
