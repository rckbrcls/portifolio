"use client";

import React, { useState, useMemo, useEffect } from "react";
import { MdComputer, MdOutlineWebAsset } from "react-icons/md";
import Title from "../atoms/Title";
import { MultiSelect } from "../ui/multi-select";
import { Label } from "../ui/label";
import { motion } from "framer-motion";
import { DirectionAwareTabs } from "@/components/ui/direction-aware-tabs";
import ProjectCard from "../molecules/ProjectCard";
import { getFilterOptions } from "../../utils/filterOptionsOptimized";
import { microfrontendProjects } from "../../../public/data/projects/projects";
import { cn } from "@/lib/utils";
import { Computer, Trash } from "lucide-react";
import { FaBroom } from "react-icons/fa";

// Estado centralizado para filtros
type FilterState = {
  frameworks: string[];
  languages: string[];
  databases: string[];
  tools: string[];
};

// Estado inicial (tudo vazio)
const initialFilterState: FilterState = {
  frameworks: [],
  languages: [],
  databases: [],
  tools: [],
};

export default function MicroList() {
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [maxCount, setMaxCount] = useState(0);
  const [localServer, setLocalServer] = useState(false);
  const [activeTabId, setActiveTabId] = useState<number>(0);
  const filterOptions = getFilterOptions();

  const resetFilter = () => {
    setFilters(initialFilterState);
    setLocalServer(false);
  };

  const handleFilterChange = (
    category: keyof FilterState,
    selected: string[],
  ) => {
    setFilters((prev) => ({ ...prev, [category]: selected }));
  };

  // Converte as seleções do usuário em um único array de tecnologias ativas
  const activeFilters = useMemo(() => {
    return [
      ...filters.frameworks,
      ...filters.languages,
      ...filters.databases,
      ...filters.tools,
    ];
  }, [filters]);

  const filteredProjects = useMemo(() => {
    let projectsToFilter = microfrontendProjects;

    if (activeFilters.length > 0) {
      projectsToFilter = projectsToFilter.filter((project) => {
        const lowerTechs = project.techStack.map((t) =>
          t.toLowerCase().replace(/\s+/g, "-"),
        );
        return lowerTechs.some((tech) => activeFilters.includes(tech));
      });
    }

    if (localServer && activeTabId === 1) {
      projectsToFilter = projectsToFilter.filter((project) =>
        Boolean((project as any).localServer),
      );
    }

    return projectsToFilter;
  }, [activeFilters, localServer, activeTabId]);

  // Tabs para DirectionAwareTabs
  const tabs = [
    {
      id: 0,
      label: "Description",
      content: (
        <div className="flex flex-col gap-8 py-6">
          {/* Intro Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h2 className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl font-bold text-transparent">
              Microfrontend Architecture
            </h2>
            <p className="leading-relaxed text-gray-300">
              This portfolio leverages a{" "}
              <span className="font-semibold text-purple-400">
                microfrontend architecture
              </span>{" "}
              within a{" "}
              <span className="font-semibold text-purple-400">
                monorepo structure
              </span>
              . Each project is an independent microfrontend that can be
              developed, tested, and deployed separately, while sharing common
              utilities and components through the monorepo.
            </p>
          </motion.div>

          {/* Architecture Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="glass-dark flex flex-col gap-4 rounded-2xl border border-purple-500/20 p-6"
          >
            <h3 className="flex items-center gap-2 text-2xl font-bold text-purple-300">
              <MdComputer className="h-6 w-6" />
              Tech Stack
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-purple-400">Frontend</h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
                  <li>
                    <strong>Next.js & React</strong> - Main portfolio
                    application
                  </li>
                  <li>
                    <strong>SolidJS</strong> - High-performance microfrontends
                  </li>
                  <li>
                    <strong>TypeScript</strong> - Type safety across the
                    codebase
                  </li>
                  <li>
                    <strong>Webpack</strong> - Module federation & bundling
                  </li>
                  <li>
                    <strong>Turborepo</strong> - Monorepo orchestration
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-purple-400">Backend</h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
                  <li>
                    <strong>Node.js</strong> - API services (Express)
                  </li>
                  <li>
                    <strong>Flask (Python)</strong> - Electoral system API
                  </li>
                  <li>
                    <strong>MongoDB</strong> - NoSQL database
                  </li>
                  <li>
                    <strong>PostgreSQL</strong> - Relational database
                  </li>
                  <li>
                    <strong>Docker</strong> - Containerization
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Homelab Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="flex items-center gap-2 text-2xl font-bold text-pink-300">
              <Computer className="h-6 w-6" />
              Homelab Infrastructure
            </h3>
            <p className="leading-relaxed text-gray-300">
              Several mini-project APIs are running on my personal{" "}
              <span className="font-semibold text-pink-400">homelab</span>,
              containerized with Docker and exposed securely through{" "}
              <span className="font-semibold text-pink-400">
                Cloudflare Tunnel
              </span>
              . This setup allows me to host multiple services without exposing
              databases or opening ports on my home network.
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {/* Electoral System API */}
            <div className="glass-dark flex flex-col gap-3 rounded-xl border border-pink-500/20 p-5">
              <h4 className="font-bold text-pink-400">Electoral System API</h4>
              <p className="text-sm text-gray-300">
                Flask-based API with PostgreSQL for election management system.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                  Flask
                </span>
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                  PostgreSQL
                </span>
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                  Docker
                </span>
              </div>
            </div>

            {/* Joystick API */}
            <div className="glass-dark flex flex-col gap-3 rounded-xl border border-pink-500/20 p-5">
              <h4 className="font-bold text-pink-400">Joystick API</h4>
              <p className="text-sm text-gray-300">
                Node.js API with MongoDB for game collection management.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                  Node.js
                </span>
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                  MongoDB
                </span>
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                  Express
                </span>
              </div>
            </div>

            {/* RGB Wallet API */}
            <div className="glass-dark flex flex-col gap-3 rounded-xl border border-pink-500/20 p-5">
              <h4 className="font-bold text-pink-400">RGB Wallet API</h4>
              <p className="text-sm text-gray-300">
                Node.js API with MongoDB for RGB protocol wallet management.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                  Node.js
                </span>
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                  MongoDB
                </span>
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                  Blockchain
                </span>
              </div>
            </div>

            {/* Secret Santa API */}
            <div className="glass-dark flex flex-col gap-3 rounded-xl border border-pink-500/20 p-5">
              <h4 className="font-bold text-pink-400">Secret Santa API</h4>
              <p className="text-sm text-gray-300">
                Node.js API with MongoDB for secret santa gift exchange
                management.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                  Node.js
                </span>
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                  MongoDB
                </span>
                <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs font-medium text-pink-300">
                  Express
                </span>
              </div>
            </div>
          </motion.div>

          {/* Infrastructure Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="glass-dark flex flex-col gap-4 rounded-2xl border border-purple-500/20 p-6"
          >
            <h3 className="text-xl font-bold text-purple-300">
              Security & Deployment
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-purple-400"></div>
                <p>
                  <strong className="text-purple-400">
                    Cloudflare Tunnel:
                  </strong>{" "}
                  Secure tunnel that exposes local services without opening
                  firewall ports or exposing my home IP address.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-purple-400"></div>
                <p>
                  <strong className="text-purple-400">Docker Compose:</strong>{" "}
                  All services run in isolated containers with internal
                  networking. Databases are NOT exposed to the internet.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-purple-400"></div>
                <p>
                  <strong className="text-purple-400">Local-only ports:</strong>{" "}
                  API ports are bound to 127.0.0.1, accessible only through the
                  tunnel or local machine.
                </p>
              </div>
              <div className="flex gap-3">
                <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-purple-400"></div>
                <p>
                  <strong className="text-purple-400">Auto-restart:</strong>{" "}
                  Services automatically restart on failure, ensuring high
                  availability.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Learning Journey Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-2xl font-bold text-purple-300">
              Learning Journey
            </h3>
            <p className="leading-relaxed text-gray-300">
              To be honest? This entire setup is{" "}
              <span className="font-semibold text-purple-400">
                completely over-engineered
              </span>{" "}
              for a simple portfolio. But that's exactly the point! 🚀
            </p>
            <p className="leading-relaxed text-gray-300">
              I built this architecture purely as a{" "}
              <span className="font-semibold text-pink-400">
                learning experience
              </span>{" "}
              to understand modern web development patterns, monorepo
              management, microfrontend architecture, Docker orchestration, and
              homelab infrastructure. Sometimes the best way to learn is to
              build something unnecessarily complex and figure out how all the
              pieces fit together.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="glass-dark flex flex-col gap-2 rounded-xl border border-purple-500/20 p-4">
                <h4 className="font-semibold text-purple-400">
                  � Technologies
                </h4>
                <p className="text-sm text-gray-300">
                  Exploring different frameworks, build tools, and deployment
                  strategies in a single project.
                </p>
              </div>
              <div className="glass-dark flex flex-col gap-2 rounded-xl border border-purple-500/20 p-4">
                <h4 className="font-semibold text-purple-400">
                  🏠 Infrastructure
                </h4>
                <p className="text-sm text-gray-300">
                  Setting up a homelab with Docker, databases, and secure
                  tunneling to understand DevOps practices.
                </p>
              </div>
              <div className="glass-dark flex flex-col gap-2 rounded-xl border border-purple-500/20 p-4">
                <h4 className="font-semibold text-purple-400">
                  🎯 Architecture
                </h4>
                <p className="text-sm text-gray-300">
                  Implementing microfrontends and monorepo patterns to grasp
                  enterprise-level development concepts.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      id: 1,
      label: "Projects",
      content: (
        <div>
          {/* Seção de Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              duration: 0.7,
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-md:scrollbar-hidden flex w-full items-end gap-2 max-md:overflow-x-scroll max-sm:-mx-4 max-sm:w-[calc(100%+2rem)] max-sm:px-4"
          >
            <button
              type="button"
              aria-pressed={localServer}
              onClick={() => setLocalServer(!localServer)}
              className={cn(
                "glass-dark flex h-12 w-min items-center justify-center gap-2 whitespace-nowrap rounded-3xl border px-6 py-2 font-semibold transition duration-500 max-sm:h-10",
                "transform-gpu transition-colors ease-in-out hover:scale-[1.01] active:scale-95",
                localServer
                  ? "border-white/30 bg-purple-500 bg-gradient-to-r text-white shadow-md"
                  : "text-purple-300 hover:bg-purple-500/50",
              )}
            >
              <MdComputer className="h-5 w-5" />
              Server
            </button>
            <div className="flex w-full flex-col gap-2">
              <Label
                htmlFor="frameworks"
                className="font-semibold text-purple-400"
              >
                Frameworks
              </Label>
              <MultiSelect
                id="frameworks"
                className="min-w-56 font-medium text-gray-200 max-sm:h-10"
                options={filterOptions.frameworks}
                onValueChange={(selected) =>
                  handleFilterChange("frameworks", selected)
                }
                defaultValue={filters.frameworks}
                placeholder="Select frameworks"
                maxCount={maxCount}
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <Label
                htmlFor="languages"
                className="font-semibold text-purple-400"
              >
                Languages
              </Label>
              <MultiSelect
                id="languages"
                className="min-w-56 font-medium text-gray-200 max-sm:h-10"
                options={filterOptions.languages}
                onValueChange={(selected) =>
                  handleFilterChange("languages", selected)
                }
                defaultValue={filters.languages}
                placeholder="Select languages"
                maxCount={maxCount}
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <Label
                htmlFor="databases"
                className="font-semibold text-purple-400"
              >
                Databases
              </Label>
              <MultiSelect
                id="databases"
                className="min-w-56 font-medium text-gray-200 max-sm:h-10"
                options={filterOptions.databases}
                onValueChange={(selected) =>
                  handleFilterChange("databases", selected)
                }
                defaultValue={filters.databases}
                placeholder="Select databases"
                maxCount={maxCount}
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="tools" className="font-semibold text-purple-400">
                Tools &amp; Libraries
              </Label>
              <MultiSelect
                id="tools"
                className="min-w-56 font-medium text-gray-200 max-sm:h-10"
                options={filterOptions.tools}
                onValueChange={(selected) =>
                  handleFilterChange("tools", selected)
                }
                defaultValue={filters.tools}
                placeholder="Select tools"
                maxCount={maxCount}
              />
            </div>

            <button
              onClick={resetFilter}
              className="flex h-12 w-min items-center justify-center gap-2 text-nowrap rounded-3xl border border-zinc-700/30 bg-zinc-950 px-6 py-2 font-semibold text-purple-300 transition duration-700 hover:scale-[1.01] hover:bg-zinc-800 active:scale-95 active:bg-zinc-800 max-sm:h-10"
            >
              <FaBroom className="h-5 w-5" />
            </button>
          </motion.div>

          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-4 flex h-12 w-12 animate-bounce items-center justify-center rounded-full bg-gradient-to-tr from-pink-400 to-purple-400">
                <MdOutlineWebAsset className="h-7 w-7 text-white" />
              </div>
              <span className="text-lg font-semibold text-pink-400 drop-shadow">
                No microfrontends found!
              </span>
              <span className="mt-2 text-xs text-pink-300">
                Try adjusting your filters!
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-4 pt-4">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          )}
        </div>
      ),
    },
  ];

  // Ajuste do maxCount conforme a largura de tela
  useEffect(() => {
    if (typeof window !== "undefined") {
      setMaxCount(0);
    }
  }, []);

  return (
    <div className="flex flex-col items-end justify-end gap-4 max-sm:pb-16">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 18,
          duration: 0.9,
        }}
        className="flex w-full flex-col items-end border-b border-zinc-700/30 px-4 text-end max-sm:px-2"
      >
        <Title word="Architecture" type="blur" gradient />
      </motion.div>

      {/* Tabs de projetos */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 18,
          duration: 0.7,
        }}
        viewport={{ once: true, margin: "-100px" }}
        className="flex w-11/12 flex-col max-sm:w-full"
      >
        <DirectionAwareTabs
          tabs={tabs}
          onTabChange={(id) => setActiveTabId(id)}
        />
      </motion.div>
    </div>
  );
}
