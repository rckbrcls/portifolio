import type { MDXComponents } from "mdx/types";

import { blogMdxComponents } from "@/components/blog/mdx-components";
import { LabInstallCommand } from "@/components/labs/lab-install-command";
import { LabMediaGrid } from "@/components/labs/lab-media-grid";

export const labMdxComponents: MDXComponents = {
  ...blogMdxComponents,
  LabInstallCommand,
  LabMediaGrid,
};
