import React from "react";
import { TypeTechStack } from "../../../public/data/techStack";
import {
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiExpress,
  SiSolid,
  SiFlask,
  SiSwift,
  SiSvelte,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiDart,
  SiGo,
  SiRust,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiNodedotjs,
  SiWebpack,
  SiBun,
  SiDeno,
  SiRedis,
  SiAmazonaws,
} from "react-icons/si";

interface TechStackIconProps {
  tech: TypeTechStack;
  className?: string;
}

// Mapeamento de tecnologias para ícones do react-icons
const techIconMap: Record<TypeTechStack, React.ComponentType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  Flutter: SiFlutter,
  Express: SiExpress,
  "Solid.js": SiSolid,
  Flask: SiFlask,
  Swift: SiSwift,
  Svelte: SiSvelte,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  Dart: SiDart,
  Go: SiGo,
  Rust: SiRust,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Tailwind: SiTailwindcss,
  "Node.js": SiNodedotjs,
  Webpack: SiWebpack,
  Bun: SiBun,
  Deno: SiDeno,
  Redis: SiRedis,
  AWS: SiAmazonaws,
  "React Native": SiReact, // Usa o mesmo ícone do React
};

const TechStackIcon: React.FC<TechStackIconProps> = ({ tech, className }) => {
  const IconComponent = techIconMap[tech];

  if (!IconComponent) {
    return (
      <div
        className={`flex items-center justify-center rounded bg-gray-400 ${className || "h-5 w-5"}`}
        title={tech}
      >
        <span className="text-xs font-bold text-white">
          {tech.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className={className || "h-5 w-5"} title={tech}>
      <IconComponent />
    </div>
  );
};

export default TechStackIcon;
