export type Language =
  | "JavaScript"
  | "TypeScript"
  | "Python"
  | "Dart"
  | "Go"
  | "Rust";

export type Framework =
  | "React"
  | "React Native"
  | "Next.js"
  | "Flutter"
  | "Express"
  | "Solid.js"
  | "Flask"
  | "Swift"
  | "Svelte";

export type Database = "MongoDB" | "PostgreSQL" | "Redis";

export type ToolOrLibrary =
  | "Tailwind"
  | "Node.js"
  | "Webpack"
  | "Bun"
  | "Deno"
  | "AWS";

export type TypeTechStack = Language | Framework | Database | ToolOrLibrary;

export const languages: Language[] = [
  "JavaScript",
  "TypeScript",
  "Python",
  // "Go",
  // "Rust",
  // "Dart",
];

export const frameworks: Framework[] = [
  "React",
  "React Native",
  "Next.js",
  "Express",
  "Solid.js",
  "Flask",
  // "Swift",
  // "Svelte",
  // "Flutter",
];

export const databases: Database[] = ["MongoDB", "PostgreSQL", "Redis"];

export const toolsAndLibraries: ToolOrLibrary[] = [
  "Tailwind",
  "Node.js",
  "Webpack",
  // "Bun",
  // "Deno",
  "AWS",
];

export const techStack: TypeTechStack[] = [
  ...languages,
  ...frameworks,
  ...databases,
  ...toolsAndLibraries,
];
