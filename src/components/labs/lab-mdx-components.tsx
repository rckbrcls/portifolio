import type { MDXComponents } from "mdx/types";

import { blogMdxComponents } from "@/components/blog/mdx-components";
import { LabMediaGrid } from "@/components/labs/lab-media-grid";

export const labMdxComponents: MDXComponents = {
  ...blogMdxComponents,
  LabMediaGrid,
};
