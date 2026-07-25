export type Language =
  | "JavaScript"
  | "TypeScript"
  | "Python"
  | "Dart"
  | "Go"
  | "Rust"
  | "Swift";

export type Framework =
  | "React"
  | "React Native"
  | "Next.js"
  | "Flutter"
  | "Express"
  | "Solid.js"
  | "Flask"
  | "FastAPI"
  | "Svelte"
  | "SwiftUI";

export type Database = "MongoDB" | "PostgreSQL" | "PostGIS" | "Redis";

export type ToolOrLibrary =
  | "Tailwind"
  | "Node.js"
  | "Webpack"
  | "Bun"
  | "Deno"
  | "AWS"
  | "Supabase"
  | "Zustand"
  | "Stripe"
  | "Frenet"
  | "TanStack Query"
  | "Sparkle"
  | "Swift Charts"
  | "NetworkX";

export type TypeTechStack = Language | Framework | Database | ToolOrLibrary;

export const languages: Language[] = [
  "JavaScript",
  "TypeScript",
  "Python",
  "Swift",
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
  "FastAPI",
  "SwiftUI",
  // "Svelte",
  // "Flutter",
];

export const databases: Database[] = [
  "MongoDB",
  "PostgreSQL",
  "PostGIS",
  "Redis",
];

export const toolsAndLibraries: ToolOrLibrary[] = [
  "Tailwind",
  "Node.js",
  "Webpack",
  // "Bun",
  // "Deno",
  "AWS",
  "Supabase",
  "Zustand",
  "Stripe",
  "Frenet",
  "TanStack Query",
  "Sparkle",
  "Swift Charts",
  "NetworkX",
];

export const techStack: TypeTechStack[] = [
  ...languages,
  ...frameworks,
  ...databases,
  ...toolsAndLibraries,
];
