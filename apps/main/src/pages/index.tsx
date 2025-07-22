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
  const architectureRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef(null);

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
              alt="Picture of Erick Barcelos"
              fill
              className="select-none object-contain"
              priority
              quality={100}
            />
          </div>
          <Title word="Olá! I'm Erick Barcelos" />
        </div>

        {/* =========================
            Section: Architecture
        ========================== */}
        <div
          ref={architectureRef}
          className="relative flex flex-col items-center justify-center gap-6 px-4 py-10 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              isArchitectureInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Title word="Architecture" gradient />
          </motion.div>

          <motion.div
            ref={contentRef}
            initial={{ opacity: 0, y: 30 }}
            animate={
              isContentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <SubTitle className="mb-6" gradient>
              Microfrontend Ecosystem
            </SubTitle>
            <Text className="mb-8 text-xl leading-relaxed text-gray-300">
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
            initial={{ opacity: 0 }}
            animate={areCardsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3"
          >
            {/* Main App Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={
                areCardsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
              }
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-dark rounded-2xl border-purple-500/20 p-6 transition-all duration-300 hover:border-purple-400/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 max-sm:w-full">
                <span className="text-2xl">🏗️</span>
              </div>
              <SubTitle className="mb-3 text-lg">Main Hub</SubTitle>
              <Text className="text-sm text-gray-400">
                The central app that brings everything together - handles
                navigation and shared stuff between projects.
              </Text>
            </motion.div>

            {/* Microfrontends Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={
                areCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.6, delay: 1.0 }}
              className="glass-dark rounded-2xl border-purple-500/20 p-6 transition-all duration-300 hover:border-purple-400/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 max-sm:w-full">
                <span className="text-2xl">🧩</span>
              </div>
              <SubTitle className="mb-3 text-lg">Mini Projects</SubTitle>
              <Text className="text-sm text-gray-400">
                Each project is its own thing with different tech stacks - great
                for experimenting with new frameworks and ideas.
              </Text>
            </motion.div>

            {/* Integration Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={
                areCardsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
              }
              transition={{ duration: 0.6, delay: 1.2 }}
              className="glass-dark rounded-2xl border-pink-500/20 p-6 transition-all duration-300 hover:border-pink-400/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 max-sm:w-full">
                <span className="text-2xl">🔗</span>
              </div>
              <SubTitle className="mb-3 text-lg">Communication</SubTitle>
              <Text className="text-sm text-gray-400">
                How the apps talk to each other - sharing data and keeping
                everything in sync.
              </Text>
            </motion.div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={
              areCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
            }
            transition={{ duration: 0.6, delay: 1.4 }}
            className="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                icon: "⚡",
                title: "Fast Loading",
                desc: "Only loads what you need",
              },
              {
                icon: "🔧",
                title: "Easy Updates",
                desc: "Change one without breaking others",
              },
              {
                icon: "📦",
                title: "Solo Deploy",
                desc: "Each project goes live independently",
              },
              {
                icon: "🚀",
                title: "Room to Grow",
                desc: "Add new projects anytime",
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  areCardsInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                className="glass-dark rounded-xl p-4 text-center transition-all duration-300"
              >
                <div className="mb-2 text-2xl">{benefit.icon}</div>
                <SubTitle className="mb-1 text-sm">{benefit.title}</SubTitle>
                <Text className="text-xs text-gray-500">{benefit.desc}</Text>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* =========================
            Section: Interactive Architecture
        ========================== */}
        <div className="relative mt-10 flex flex-col items-center justify-center gap-6 border-t border-zinc-700/50 px-4 py-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SubTitle gradient>Play Around with the Setup</SubTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="mb-6 max-w-4xl"
          >
            <Text className="mb-6 text-lg leading-relaxed text-gray-300">
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <ArchitectureContainer />
          </motion.div>
        </div>

        <Footer />
      </div>
    </>
  );
}
