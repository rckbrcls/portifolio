import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type {
  WorkStoryFrontmatter,
  WorkStoryGalleryItem,
  WorkStoryLink,
  WorkStoryMeta,
} from "@/lib/work-story-shared";

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

function parseLinks(
  value: unknown,
  fileName: string,
): WorkStoryLink[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new Error(`Invalid "links" in work story "${fileName}".`);
  }

  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Invalid "links[${index}]" in work story "${fileName}".`);
    }

    const link = item as Record<string, unknown>;
    const kind =
      link.kind === "primary" || link.kind === "secondary"
        ? link.kind
        : undefined;

    return {
      label: assertString(link.label, `links[${index}].label`, fileName),
      href: assertString(link.href, `links[${index}].href`, fileName),
      ...(kind ? { kind } : {}),
    };
  });
}

function parseGallery(
  value: unknown,
  fileName: string,
): WorkStoryGalleryItem[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new Error(`Invalid "gallery" in work story "${fileName}".`);
  }

  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(
        `Invalid "gallery[${index}]" in work story "${fileName}".`,
      );
    }

    const image = item as Record<string, unknown>;
    const caption =
      typeof image.caption === "string" && image.caption.trim().length > 0
        ? image.caption.trim()
        : undefined;

    return {
      src: assertString(image.src, `gallery[${index}].src`, fileName),
      alt: assertString(image.alt, `gallery[${index}].alt`, fileName),
      ...(caption ? { caption } : {}),
    };
  });
}

function parseWorkFrontmatter(
  fileName: string,
  frontmatter: Record<string, unknown>,
): WorkStoryFrontmatter {
  if (!Array.isArray(frontmatter.technologies)) {
    throw new Error(`Invalid "technologies" in work story "${fileName}".`);
  }

  const coverImage =
    typeof frontmatter.coverImage === "string" &&
    frontmatter.coverImage.trim().length > 0
      ? frontmatter.coverImage.trim()
      : undefined;
  const gallery = parseGallery(frontmatter.gallery, fileName);
  const links = parseLinks(frontmatter.links, fileName);

  return {
    title: assertString(frontmatter.title, "title", fileName),
    summary: assertString(frontmatter.summary, "summary", fileName),
    role: assertString(frontmatter.role, "role", fileName),
    period: assertString(frontmatter.period, "period", fileName),
    status: assertString(frontmatter.status, "status", fileName),
    context: assertString(frontmatter.context, "context", fileName),
    technologies: frontmatter.technologies.map((technology) =>
      assertString(technology, "technologies", fileName),
    ),
    ...(coverImage ? { coverImage } : {}),
    ...(gallery ? { gallery } : {}),
    ...(links ? { links } : {}),
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
