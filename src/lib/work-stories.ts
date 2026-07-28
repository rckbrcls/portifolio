import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type {
  WorkStoryAction,
  WorkStoryFrontmatter,
  WorkStoryMeta,
} from "@/lib/work-story-shared";
import type { TWorkCategory } from "@/interface/TWorkCategory";

const WORK_DIRECTORY = path.join(process.cwd(), "content/work");

function isWorkSourceFile(fileName: string) {
  return fileName.endsWith(".mdx") && !fileName.startsWith("_");
}

function assertString(value: unknown, field: string, fileName: string) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Invalid "${field}" in work story "${fileName}".`);
  }

  return value.trim();
}

function parseCategory(value: unknown, fileName: string): TWorkCategory {
  const category = assertString(value, "category", fileName);

  if (
    category !== "professional" &&
    category !== "research" &&
    category !== "independent"
  ) {
    throw new Error(`Invalid "category" in work story "${fileName}".`);
  }

  return category;
}

function parseAction(
  value: unknown,
  fileName: string,
): WorkStoryAction | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Invalid "action" in work story "${fileName}".`);
  }

  const action = value as Record<string, unknown>;
  const type = action.type;

  if (type !== "project" && type !== "source" && type !== "download") {
    throw new Error(`Invalid "action.type" in work story "${fileName}".`);
  }

  return {
    type,
    href: assertString(action.href, "action.href", fileName),
  };
}

function parseWorkFrontmatter(
  fileName: string,
  frontmatter: Record<string, unknown>,
): WorkStoryFrontmatter {
  if (!Array.isArray(frontmatter.technologies)) {
    throw new Error(`Invalid "technologies" in work story "${fileName}".`);
  }

  const action = parseAction(frontmatter.action, fileName);
  const icon =
    frontmatter.icon === undefined
      ? undefined
      : assertString(frontmatter.icon, "icon", fileName);
  const iconMonochrome =
    frontmatter.iconMonochrome === undefined
      ? undefined
      : frontmatter.iconMonochrome === true;

  if (
    frontmatter.iconMonochrome !== undefined &&
    frontmatter.iconMonochrome !== true &&
    frontmatter.iconMonochrome !== false
  ) {
    throw new Error(`Invalid "iconMonochrome" in work story "${fileName}".`);
  }

  return {
    title: assertString(frontmatter.title, "title", fileName),
    summary: assertString(frontmatter.summary, "summary", fileName),
    role: assertString(frontmatter.role, "role", fileName),
    period: assertString(frontmatter.period, "period", fileName),
    status: assertString(frontmatter.status, "status", fileName),
    category: parseCategory(frontmatter.category, fileName),
    technologies: frontmatter.technologies.map((technology) =>
      assertString(technology, "technologies", fileName),
    ),
    ...(icon ? { icon } : {}),
    ...(iconMonochrome ? { iconMonochrome } : {}),
    ...(action ? { action } : {}),
  };
}

function readWorkStoryFile(fileName: string): WorkStoryMeta {
  const absolutePath = path.join(WORK_DIRECTORY, fileName);
  const source = fs.readFileSync(absolutePath, "utf8");
  const { data } = matter(source);
  const frontmatter = parseWorkFrontmatter(
    fileName,
    data as Record<string, unknown>,
  );

  return {
    slug: fileName.replace(/\.mdx$/, ""),
    ...frontmatter,
  };
}

export function getAllWorkStories() {
  if (!fs.existsSync(WORK_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(WORK_DIRECTORY)
    .filter(isWorkSourceFile)
    .map(readWorkStoryFile)
    .sort((left, right) => left.title.localeCompare(right.title));
}

export function getWorkStoryBySlug(slug: string) {
  const fileName = `${slug}.mdx`;
  const filePath = path.join(WORK_DIRECTORY, fileName);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return readWorkStoryFile(fileName);
}
