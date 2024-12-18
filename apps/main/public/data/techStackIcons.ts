import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiDart,
  SiGo,
  SiRust,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiExpress,
  SiSolid,
  SiFlask,
  SiSwift,
  SiSvelte,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiNodedotjs,
  SiWebpack,
  SiBun,
  SiDeno,
} from "react-icons/si";
import React from "react";
import { TypeTechStack } from "./techStack";

// TODO: otimizar isso
export const techStackIcons: Record<TypeTechStack, React.ReactNode> = {
  // Languages
  JavaScript: React.createElement(SiJavascript),
  TypeScript: React.createElement(SiTypescript),
  Python: React.createElement(SiPython),
  Dart: React.createElement(SiDart),
  Go: React.createElement(SiGo),
  Rust: React.createElement(SiRust),

  // Frameworks
  React: React.createElement(SiReact),
  "React Native": React.createElement(SiReact), // Reusing React icon
  "Next.js": React.createElement(SiNextdotjs),
  Flutter: React.createElement(SiFlutter),
  Express: React.createElement(SiExpress),
  "Solid.js": React.createElement(SiSolid),
  Flask: React.createElement(SiFlask),
  Swift: React.createElement(SiSwift),
  Svelte: React.createElement(SiSvelte),

  // Databases
  MongoDB: React.createElement(SiMongodb),
  PostgreSQL: React.createElement(SiPostgresql),

  // Tools and Libraries
  Tailwind: React.createElement(SiTailwindcss),
  "Node.js": React.createElement(SiNodedotjs),
  Webpack: React.createElement(SiWebpack),
  Bun: React.createElement(SiBun),
  Deno: React.createElement(SiDeno),
};
