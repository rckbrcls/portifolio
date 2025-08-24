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
            Section: Personal Server
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
          className="relative mt-10 flex w-full flex-col items-center justify-center gap-6 border-t border-zinc-700/30 px-4 py-16 text-center"
        >
          <Title word="Personal Server" gradient type="blur" />
          <div className="w-full max-w-2xl p-2">
            <div className="relative mx-auto w-full select-none">
              <Image
                src="/images/assets/server.png"
                width={900}
                height={540}
                alt="Personal server - Ubuntu"
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="max-w-6xl text-left">
            <SubTitle className="mb-4">
              A dedicated machine for learning and deployments
            </SubTitle>
            <Text className="mb-4 leading-relaxed text-gray-300">
              This server is my personal computer provisioned with{" "}
              <span className="font-semibold text-purple-400">
                Ubuntu Server
              </span>
              . I use it as a small-scale production environment to learn, test
              and validate deployment patterns, networking and integrations.
            </Text>

            <SubTitle className="mb-2 text-sm">How it's configured</SubTitle>
            <Text className="mb-4 text-sm leading-relaxed text-gray-400">
              Services run inside{" "}
              <span className="font-semibold text-purple-400">Docker</span>{" "}
              containers for isolation and reproducible deployments. For secure
              external exposure I rely on{" "}
              <span className="font-semibold text-purple-400">
                Cloudflare Tunnel
              </span>{" "}
              as a proxy, allowing me to test HTTPS, routing and request flows
              without opening raw ports. This setup mirrors many production
              concerns (CI/CD, env vars, secrets and container orchestration)
              while staying lightweight for experimentation.
            </Text>

            <SubTitle className="mb-2 text-sm">
              Projects hosted on the server
            </SubTitle>
            <ul className="mb-4 list-inside list-disc text-sm text-gray-400">
              <li>
                <span className="font-semibold text-purple-300">
                  electoral-system
                </span>{" "}
                — academic API, containerized and served via a tunnel
              </li>
              <li>
                <span className="font-semibold text-purple-300">rgbwallet</span>{" "}
                — personal experiment / API
              </li>
              <li>
                <span className="font-semibold text-purple-300">
                  secret-santa
                </span>{" "}
                — backend for a Secret Santa app
              </li>
              <li>
                <span className="font-semibold text-purple-300">joystick</span>{" "}
                — prototype with API integrations
              </li>
            </ul>

            <SubTitle className="mb-2 text-sm">Skills demonstrated</SubTitle>
            <Text className="text-sm leading-relaxed text-gray-400">
              System administration (Ubuntu Server), containerization with
              Docker, secure tunneling with Cloudflare, local production
              hardening and integration of multiple microfrontends and APIs.
              These projects are small, diverse stacks used to practice
              deployment, monitoring and cross-service communication in an
              ecosystem configured for production-like testing.
            </Text>
          </div>
        </motion.section>
        <Footer />
      </div>
    </>
  );
}
