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
    },
    {
      icon: "💡",
      title: "rgbwallet",
      desc: "Personal experiment / API",
    },
    {
      icon: "🎁",
      title: "secret-santa",
      desc: "Backend for a Secret Santa app",
    },
    {
      icon: "🕹️",
      title: "joystick",
      desc: "Prototype with API integrations",
    },
  ];
  const projectLinks: Record<string, { app?: string; repo?: string }> = {
    "electoral-system": { app: "#", repo: "#" },
    rgbwallet: { app: "#", repo: "#" },
    "secret-santa": { app: "#", repo: "#" },
    joystick: { app: "#", repo: "#" },
  };

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
              Section: Personal Server (clean & English)
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

          <div className="mx-auto flex w-full max-w-7xl flex-col items-center text-center">
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

            {/* server showcase + stack chips */}
            <div className="mt-10 grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
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

              {/* stack card */}
              <div className="order-1 md:order-2">
                <div className="glass-dark rounded-2xl border-pink-500/20 p-6 text-left">
                  <SubTitle className="mb-2 text-base">
                    Stack & Capabilities
                  </SubTitle>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {[
                      "Docker & Compose",
                      "Cloudflare Tunnel (HTTPS)",
                      "Reverse Proxy / Routing",
                      "Environment Variables & Secrets",
                      "CI/CD-friendly",
                      "Microfrontends + APIs",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Text className="leading-relaxed text-gray-400">
                    Services run in isolated containers and are routed by
                    subdomains through the tunnel. The goal is to validate
                    production-minded practices (rollouts, health checks, basic
                    observability) without the overhead of a heavy infra.
                  </Text>
                </div>
              </div>
            </div>
            {/* learning checklist */}
            <div className="mt-14 w-full max-w-7xl">
              <div className="glass-dark rounded-2xl border-purple-500/20 p-6 text-left">
                <SubTitle className="mb-3 text-base">
                  What I’m practicing here
                </SubTitle>
                <div className="grid grid-cols-1 gap-3 text-sm text-gray-400 md:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5">✅</span>
                    <span>
                      Simple releases & rollbacks with Docker Compose and
                      env-specific configs.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5">✅</span>
                    <span>
                      Secure subdomain routing via Cloudflare Tunnel (end-to-end
                      HTTPS).
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5">✅</span>
                    <span>
                      Basic health checks and logging to keep services
                      observable.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5">✅</span>
                    <span>
                      Microfrontends talking to small, independent APIs.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* projects on the server */}
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
                  Small, focused services used to practice deployments, routing
                  and cross-service communication.
                </Text>
              </motion.div>

              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {serverProjects.map((proj) => (
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

                      <SubTitle className="mb-1 text-lg">{proj.title}</SubTitle>

                      {/* tags */}
                      <div className="my-4 flex flex-wrap gap-2">
                        {[
                          "API on server",
                          "Dockerized",
                          "HTTPS via Tunnel",
                        ].map((tag) => (
                          <span
                            key={`${proj.title}-${tag}`}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* CTAs — plug real links later */}
                    <div className="flex items-center gap-2">
                      <a
                        href="#"
                        className="flex w-full items-center justify-center rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-200 transition-colors hover:bg-white/10"
                      >
                        View repo
                      </a>
                      <a
                        href="#"
                        className="flex w-full items-center justify-center rounded border border-pink-500/20 bg-gradient-to-r from-pink-500/20 to-purple-500/20 px-3 py-1.5 text-xs text-pink-100 transition-colors hover:from-pink-500/30 hover:to-purple-500/30"
                      >
                        Open API
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
        <Footer />
      </div>
    </>
  );
}
