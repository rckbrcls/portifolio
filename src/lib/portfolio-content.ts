import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { professionalWorkItems } from "../../data/work/professional-work";
import { projects } from "../../data/projects/projects";
import type { IProject } from "@/interface/IProject";

export type PortfolioRoute = "/" | "/work" | "/blog";

export interface NavigationLink {
  href: PortfolioRoute;
  label: string;
  number: string;
  preserveCase?: boolean;
}

export interface ContactLink {
  title: string;
  value: string;
  href: string;
  icon: LucideIcon;
}

export const navigationLinks: NavigationLink[] = [
  { href: "/", label: "Hi!", number: "1", preserveCase: true },
  { href: "/work", label: "Work", number: "02" },
  { href: "/blog", label: "Blog", number: "03" },
];

export const featuredProjectSlugs = ["dost", "urbanus", "duplizen", "converge"];

export const featuredProjectSummaries: Record<string, string> = {
  dost: "Full-stack commerce platform spanning catalog, checkout, shipping, and orders.",
  urbanus: "Geospatial research platform for preliminary sanitation planning.",
  duplizen:
    "Real-time social-deduction game built for quick multilingual group play.",
  converge:
    "Native macOS focus timer with local history, statistics, and notifications.",
};

export const contactLinks: ContactLink[] = [
  {
    title: "Email",
    value: "erickbarcelosdev@gmail.com",
    href: "mailto:erickbarcelosdev@gmail.com",
    icon: Mail,
  },
  {
    title: "GitHub",
    value: "@rckbrcls",
    href: "https://github.com/rckbrcls",
    icon: Github,
  },
  {
    title: "LinkedIn",
    value: "/in/brcls",
    href: "https://www.linkedin.com/in/brcls/",
    icon: Linkedin,
  },
];

export const orderedProjects = projects
  .filter((project) => project.portfolioVisibility !== "hidden")
  .sort((left, right) => {
    const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) {
      return leftOrder - rightOrder;
    }

    return left.name.localeCompare(right.name);
  });

export const orderedResearchProjects = orderedProjects.filter(
  (project) => project.workCategory === "research",
);

export const orderedIndependentProjects = orderedProjects.filter(
  (project) => project.workCategory === "independent",
);

const projectLookup = new Map(
  orderedProjects.map((project) => [project.slug, project]),
);

export const featuredProjects = featuredProjectSlugs.flatMap((slug) => {
  const project = projectLookup.get(slug);
  return project ? [project] : [];
});

export const orderedProfessionalWork = [...professionalWorkItems].sort(
  (left, right) => left.order - right.order,
);

export const featuredProfessionalWork = orderedProfessionalWork.filter(
  (item) => item.featured,
);

export function getProjectPrimaryLink(project: IProject) {
  if (project.hasStory) {
    return {
      href: `/work/${project.slug}`,
      label: "Read project",
      isExternal: false,
    };
  }

  if (project.link) {
    return { href: project.link, label: "Open project", isExternal: true };
  }

  if (project.gitLink) {
    return { href: project.gitLink, label: "View source", isExternal: true };
  }

  if (project.npmUrl) {
    return { href: project.npmUrl, label: "Open package", isExternal: true };
  }

  return null;
}

export function getProjectSummary(project: IProject) {
  return featuredProjectSummaries[project.slug] ?? project.description;
}

export function getProjectStackPreview(project: IProject, limit = 4) {
  return project.techStack.slice(0, limit).join(" / ");
}
