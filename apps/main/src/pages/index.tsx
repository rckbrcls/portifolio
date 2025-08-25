import Image from "next/image";
import React, { useRef } from "react";
import Head from "next/head";
import { useInView, motion } from "framer-motion";

import Aurora from "@/components/molecules/Aurora";
import Title from "@/components/atoms/Title";
import Header from "@/components/organisms/Header";
import Alert from "@/components/molecules/Alert";
import { ArchitectureContainer } from "@/components/organisms/ArchitectureContainer";
import SubTitle from "@/components/atoms/SubTitle";
import { Text } from "@/components/atoms/Text";
import Footer from "@/components/organisms/Footer";
import Link from "next/link";

export default function Home() {
  const portfolioCards = [
    {
      icon: "👨‍💻",
      title: "Dev Space",
      desc: "My projects, ideas and experiments. All built by me.",
    },
    {
      icon: "🛠️",
      title: "Tech Variety",
      desc: "I explore different stacks and frameworks.",
    },
    {
      icon: "🌱",
      title: "Always Learning",
      desc: "Portfolio grows as I do.",
    },
    {
      icon: "📬",
      title: "Contact",
      desc: "Reach out for feedback or collab!",
    },
  ];

  const serverProjects = [
    {
      icon: "🏛️",
      title: "electoral-system",
      desc: "Academic API, containerized and served via a tunnel",
      api_link: "https://electoral-api.erickbarcelos.com",
      repo: "https://github.com/brcls/portifolio-monorepo/tree/main/services/electoral-system-api",
    },
    {
      icon: "💡",
      title: "rgbwallet",
      desc: "Personal experiment / API",
      api_link: "https://rgbwallet-api.erickbarcelos.com",
      repo: "https://github.com/brcls/portifolio-monorepo/tree/main/services/rgbwallet-api",
    },
    {
      icon: "🎁",
      title: "secret-santa",
      desc: "Backend for a Secret Santa app",
      api_link: "https://secret-santa-api.erickbarcelos.com",
      repo: "https://github.com/brcls/portifolio-monorepo/tree/main/services/secret-santa-api",
    },
    {
      icon: "🕹️",
      title: "joystick",
      desc: "Prototype with API integrations",
      api_link: "https://joystick-api.erickbarcelos.com",
      repo: "https://github.com/brcls/portifolio-monorepo/tree/main/services/joystick-api",
    },
  ];

  const architectureRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef(null);
  const portfolioRef = useRef(null);

  const isArchitectureInView = useInView(architectureRef, {
    once: true,
    margin: "-100px",
  });
  const isContentInView = useInView(contentRef, {
    once: true,
    margin: "-50px",
  });
  const areCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

  return (
    <>
      <Head>
        <title>Hello! | rckbrcls</title>
      </Head>

      <Alert />
      <Header />

      <div className="w-full overflow-hidden">
        {/* =========================
            Section: Initial
        ========================== */}
        <div className="relative flex h-svh flex-col items-center justify-center text-center">
          <Aurora className="h-svh" />
          <div className="relative my-4 h-2/5 w-full select-none">
            <Image
              src="/images/assets/me.png"
              alt="Picture of Erick"
              fill
              className="select-none object-contain"
              priority
              quality={100}
            />
          </div>
          <Title word="Olá! I'm Erick" />
        </div>

        {/* =========================
            Section: Architecture
        ========================== */}
        <div
          ref={architectureRef}
          className="relative flex flex-col items-center justify-center gap-6 px-4 py-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isArchitectureInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              duration: 0.9,
            }}
          >
            <Title word="Architecture" gradient type="blur" className="mt-10" />
          </motion.div>

          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 15 }}
            animate={
              isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
            }
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              duration: 1.1,
              delay: 0.2,
            }}
            className="max-w-6xl"
          >
            <SubTitle className="mb-6" gradient>
              Microfrontend Ecosystem
            </SubTitle>
            <Text className="mb-8 leading-relaxed text-gray-300">
              I built this portfolio as a{" "}
              <span className="font-semibold text-purple-400">
                microfrontend experiment
              </span>{" "}
              to explore how multiple independent projects can work together.
              Each app lives in its own space while being part of the bigger
              picture - pretty cool for learning and testing new ideas!
            </Text>
          </motion.div>

          {/* Architecture Cards */}
          <motion.div
            ref={cardsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={
              areCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              duration: 1.1,
            }}
            className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
          >
            {/* Main App Card */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 18,
                duration: 1.1,
              }}
              className="glass-dark rounded-2xl border-purple-500/20 p-6 text-left transition-all duration-300 hover:border-purple-400/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <span className="text-2xl">🏗️</span>
              </div>
              <SubTitle className="mb-3 text-lg max-sm:mb-1">Main Hub</SubTitle>
              <Text className="text-sm text-gray-400">
                The central app that brings everything together - handles
                navigation and shared stuff between projects.
              </Text>
            </motion.div>

            {/* Microfrontends Card */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 18,
                duration: 1.1,
              }}
              className="glass-dark rounded-2xl border-purple-500/20 p-6 text-left transition-all duration-300 hover:border-purple-400/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                <span className="text-2xl">🧩</span>
              </div>
              <SubTitle className="mb-3 text-lg max-sm:mb-1">
                Mini Projects
              </SubTitle>
              <Text className="text-sm text-gray-400">
                Each project is its own thing with different tech stacks - great
                for experimenting with new frameworks and ideas.
              </Text>
            </motion.div>

            {/* Integration Card */}
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 18,
                duration: 1.1,
              }}
              className="glass-dark rounded-2xl border-pink-500/20 p-6 text-left transition-all duration-300 hover:border-pink-400/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
                <span className="text-2xl">🔗</span>
              </div>
              <SubTitle className="mb-3 text-lg max-sm:mb-1">
                Communication
              </SubTitle>
              <Text className="text-sm text-gray-400">
                How the apps talk to each other - sharing data and keeping
                everything in sync.
              </Text>
            </motion.div>
          </motion.div>

          {/* Sobre o Portfólio */}
          <motion.div
            ref={portfolioRef}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              duration: 1.1,
              delay: 0.2,
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {portfolioCards.map((item, index) => (
              <div
                key={item.title}
                className="glass-dark rounded-xl p-4 text-center transition-all duration-300"
                // Removido controle manual de opacity/transform, agora só pelo motion
              >
                <div className="mb-2 text-2xl">{item.icon}</div>
                <SubTitle className="mb-1 text-sm">{item.title}</SubTitle>
                <Text className="text-xs text-gray-500">{item.desc}</Text>
              </div>
            ))}
          </motion.div>
        </div>

        {/* =========================
            Section: Interactive Architecture
        ========================== */}
        <div className="relative mt-10 flex flex-col items-center justify-center gap-6 border-t border-zinc-700/30 px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              duration: 1.1,
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <SubTitle gradient>Play Around with the Setup</SubTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              duration: 1.1,
              delay: 0.1,
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="mb-6 max-w-6xl"
          >
            <Text className="mb-6 leading-relaxed text-gray-300">
              Here's a fun{" "}
              <span className="font-semibold text-purple-400">
                interactive map
              </span>{" "}
              of how everything connects! Each card is one of my projects - you
              can drag them around and see how they all fit together.
            </Text>

            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 text-sm text-gray-400 md:grid-cols-2">
              <div className="flex items-center justify-center gap-2">
                <span className="text-purple-400">🖱️</span>
                <span>Drag cards around for fun</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-pink-400">🔍</span>
                <span>Zoom in and out with scroll</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-purple-300">📱</span>
                <span>Works great on mobile too</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-pink-300">🔗</span>
                <span>Click to check out the code</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Architecture Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 60,
              damping: 18,
              duration: 1.2,
              delay: 0.2,
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <ArchitectureContainer />
          </motion.div>
        </div>

        {/* =========================
            Section: Personal Server (server-focused, enriched)
        ========================== */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 18,
            duration: 1.1,
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative mt-10 w-full border-t border-zinc-700/30 px-4 py-20"
        >
          {/* soft glow background */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_10%,transparent_70%)]">
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-purple-500/20 via-pink-500/10 to-transparent blur-3xl" />
          </div>

          <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">
            <Title word="Personal Server" gradient type="blur" />
            <SubTitle className="mt-2">
              A lightweight production-like lab
            </SubTitle>

            <Text className="mt-4 max-w-3xl text-gray-300">
              This box hosts a small ecosystem of{" "}
              <span className="font-semibold text-purple-400">
                Dockerized APIs
              </span>{" "}
              securely exposed through{" "}
              <span className="font-semibold text-purple-400">
                Cloudflare Tunnel
              </span>
              . It’s my sandbox to practice clean deployments, HTTPS routing,
              environment isolation and microfrontend ↔ API interactions — all
              reproducible and minimal by design.
            </Text>

            {/* server showcase + richer stack */}
            <div className="mt-10 grid w-full grid-cols-1 items-start gap-8 md:grid-cols-2">
              {/* visual card */}
              <div className="order-2 md:order-1">
                <div className="glass-dark relative overflow-hidden rounded-2xl border-purple-500/20 p-4">
                  <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl" />
                  <div className="relative mx-auto w-full select-none">
                    <Image
                      src="/images/assets/server.png"
                      width={900}
                      height={540}
                      alt="Personal server - Ubuntu"
                      className="mx-auto rounded-xl object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* expanded stack & capabilities */}
              <div className="order-1 md:order-2">
                <div className="glass-dark rounded-2xl border-pink-500/20 p-6 text-left">
                  <SubTitle className="mb-3 text-base">
                    Stack & Capabilities
                  </SubTitle>

                  {/* Deployment */}
                  <div className="mb-3 text-xs uppercase tracking-wide text-gray-400">
                    Deployment
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {[
                      "Docker & Compose",
                      "Idempotent deploys",
                      "Zero-downtime mindset",
                      "Compose profiles",
                      "Per-service .env",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Networking */}
                  <div className="mb-3 text-xs uppercase tracking-wide text-gray-400">
                    Networking
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {[
                      "Cloudflare Tunnel (HTTPS)",
                      "Subdomain routing",
                      "Reverse proxy",
                      "Rate limiting (policy-ready)",
                      "CORS per API",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Security & Config */}
                  <div className="mb-3 text-xs uppercase tracking-wide text-gray-400">
                    Security & Config
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {[
                      "Env files & secrets",
                      "Least-privilege tokens",
                      "Read-only containers (when possible)",
                      "Isolated networks",
                      "Health endpoints",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Observability */}
                  <div className="mb-3 text-xs uppercase tracking-wide text-gray-400">
                    Observability
                  </div>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {[
                      "docker logs tailing",
                      "Structured logs",
                      "Basic uptime checks",
                      "Healthchecks",
                      "Per-service status",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* how it goes live — server-focused explanation */}
            <div className="mt-14 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* 1. Deployment Flow */}
              <div className="glass-dark rounded-2xl border-purple-500/20 p-6 text-left">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <span className="text-2xl">🚀</span>
                </div>
                <SubTitle className="mb-2 text-base">Deployment Flow</SubTitle>
                <ul className="list-disc pl-5 text-sm text-gray-400">
                  <li>Each API has a Dockerfile and a Compose service.</li>
                  <li>
                    Configs come from{" "}
                    <code className="rounded bg-white/10 px-1">.env</code> files
                    (not committed).
                  </li>
                  <li>
                    <code className="rounded bg-white/10 px-1">
                      docker compose up -d
                    </code>{" "}
                    applies changes idempotently.
                  </li>
                  <li>
                    Healthchecks signal readiness; reverse proxy routes traffic.
                  </li>
                </ul>
              </div>

              {/* 2. Networking & Routing */}
              <div className="glass-dark rounded-2xl border-purple-500/20 p-6 text-left">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <span className="text-2xl">🌐</span>
                </div>
                <SubTitle className="mb-2 text-base">
                  Networking & Routing
                </SubTitle>
                <ul className="list-disc pl-5 text-sm text-gray-400">
                  <li>
                    Public subdomains mapped to internal ports via Cloudflare
                    Tunnel.
                  </li>
                  <li>Reverse proxy forwards to services by hostname.</li>
                  <li>
                    CORS is narrowed per API; rate limits ready to plug in.
                  </li>
                </ul>
              </div>

              {/* 3. Runtime & Autostart */}
              <div className="glass-dark rounded-2xl border-purple-500/20 p-6 text-left">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <span className="text-2xl">⚙️</span>
                </div>
                <SubTitle className="mb-2 text-base">
                  Runtime & Autostart
                </SubTitle>
                <ul className="list-disc pl-5 text-sm text-gray-400">
                  <li>Compose keeps services up with restart policies.</li>
                  <li>On boot, the stack comes back automatically.</li>
                  <li>Profiles let me start only the APIs I need.</li>
                </ul>
              </div>

              {/* 4. Secrets & Config */}
              <div className="glass-dark rounded-2xl border-purple-500/20 p-6 text-left">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <span className="text-2xl">🔐</span>
                </div>
                <SubTitle className="mb-2 text-base">Secrets & Config</SubTitle>
                <ul className="list-disc pl-5 text-sm text-gray-400">
                  <li>
                    Per-service{" "}
                    <code className="rounded bg-white/10 px-1">.env</code> files
                    (mounted via Compose).
                  </li>
                  <li>Cloudflare tokens scoped with least privilege.</li>
                  <li>Isolated Docker networks for internal traffic.</li>
                </ul>
              </div>

              {/* 5. Observability & Logs */}
              <div className="glass-dark rounded-2xl border-purple-500/20 p-6 text-left">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <span className="text-2xl">📈</span>
                </div>
                <SubTitle className="mb-2 text-base">
                  Observability & Logs
                </SubTitle>
                <ul className="list-disc pl-5 text-sm text-gray-400">
                  <li>
                    Structured logs via{" "}
                    <code className="rounded bg-white/10 px-1">
                      docker logs -f
                    </code>
                    .
                  </li>
                  <li>
                    <code className="rounded bg-white/10 px-1">/health</code>{" "}
                    endpoints for quick status checks.
                  </li>
                  <li>Simple uptime pings to detect regressions.</li>
                </ul>
              </div>

              {/* 6. Quick Commands */}
              <div className="glass-dark rounded-2xl border-purple-500/20 p-6 text-left">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <span className="text-2xl">⌨️</span>
                </div>
                <SubTitle className="mb-2 text-base">Quick Commands</SubTitle>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-[12px] leading-relaxed text-gray-200">
                  {`# apply changes / (re)start
docker compose up -d

# pull latest images then restart
docker compose pull && docker compose up -d

# follow logs of an API
docker compose logs -f <service-name>

# view health status (if exposed)
curl https://api.example.dev/health`}
                </div>
              </div>
            </div>

            {/* APIs on the server — minimal cards (icon + title + two buttons) */}
            <div className="mt-14 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 18,
                  duration: 1.1,
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="mb-6 text-left"
              >
                <SubTitle className="mb-1">
                  APIs running on this server
                </SubTitle>
                <Text className="text-sm text-gray-400">
                  Minimal cards — details live on each project page.
                </Text>
              </motion.div>

              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {serverProjects.map((proj) => {
                  return (
                    <motion.div
                      key={proj.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 18,
                        duration: 0.9,
                      }}
                      className="glass-dark group flex flex-col justify-between rounded-2xl border-purple-500/20 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/40"
                    >
                      <div>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-inner">
                          <span className="text-2xl">{proj.icon}</span>
                        </div>
                        <SubTitle className="mb-6 text-lg">
                          {proj.title}
                        </SubTitle>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={proj.api_link ?? "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="flex w-full items-center justify-center rounded border border-pink-500/20 bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-3 py-1.5 text-xs text-pink-100 transition-colors hover:from-pink-500/30 hover:to-purple-500/30"
                        >
                          Microfront
                        </Link>
                        <Link
                          href={proj.repo ?? "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="flex w-full items-center justify-center rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-200 transition-colors hover:bg-white/10"
                        >
                          GitHub
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>
        <Footer />
      </div>
    </>
  );
}
