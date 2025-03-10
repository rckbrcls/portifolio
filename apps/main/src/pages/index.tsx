import Image from "next/image";
import React, { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

import Aurora from "@/components/molecules/Aurora";
import Title from "@/components/atoms/Title";
import Header from "@/components/organisms/Header";
import Alert from "@/components/molecules/Alert";
import { AnimatedBeamArchitecture } from "@/components/organisms/AnimatedBeam";
import { AiFillGithub } from "react-icons/ai";
import { MdComputer } from "react-icons/md";
import { Text } from "@/components/atoms/Text";

// Centralized Framer Motion variants
const variants = {
  slideFromLeft: {
    hidden: { x: "-5vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" }, // Reduzido de 0.7 para 0.5
    },
  },
  slideFromRight: {
    hidden: { x: "5vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
};

export default function Home() {
  // Refs for each section
  const clientRef = useRef(null);
  const clientRef2 = useRef(null);
  const serverRef = useRef(null);
  const serverRef2 = useRef(null);
  const finalRef = useRef(null);

  // Check if in view (animates once)
  const isClientInView = useInView(clientRef, { once: true, margin: "-150px" });
  const isClientInView2 = useInView(clientRef2, {
    once: true,
    margin: "-150px",
  });
  const isServerInView = useInView(serverRef, { once: true, margin: "-150px" });
  const isServerInView2 = useInView(serverRef2, {
    once: true,
    margin: "-150px",
  });
  const isFinalInView = useInView(finalRef, { once: true, margin: "-150px" });

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
          <Aurora />
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

        <div className="mx-auto w-full px-14 max-md:px-6">
          {/* =========================
          Section: Client-Side Architecture
          ========================== */}
          <div className="grid w-full grid-cols-2 items-center justify-center gap-12 border-b border-zinc-700/40 max-md:grid-cols-1 max-md:gap-10 max-md:py-10 md:h-svh">
            <motion.div
              ref={clientRef}
              variants={variants.slideFromLeft}
              initial="hidden"
              animate={isClientInView ? "visible" : "hidden"}
            >
              <AnimatedBeamArchitecture />
            </motion.div>

            <motion.div
              ref={clientRef2}
              variants={variants.slideFromRight}
              initial="hidden"
              animate={isClientInView2 ? "visible" : "hidden"}
              className="flex flex-col items-end gap-10 max-md:items-center"
            >
              <Title
                className="text-end max-md:text-center max-md:text-5xl"
                word="🖥️ Client Architecture"
                type="blur"
              />
              <Text className="text-end text-xl font-bold max-md:text-center md:text-3xl">
                This portfolio showcases the client side of my project, built
                with a microfrontend architecture. It consolidates older
                projects into one interface, each acting as a microfrontend
                linked to personal server-hosted APIs. This streamlined approach
                improved my skills in microfrontends and modular development. 🛠️
              </Text>
            </motion.div>
          </div>

          {/* =========================
              Section: Server & APIs
          ========================== */}
          <div className="grid w-full grid-cols-2 items-center justify-center gap-12 border-b border-zinc-700/40 max-md:grid-cols-1 max-md:gap-10 max-md:py-10 md:h-svh">
            <motion.div
              ref={serverRef}
              variants={variants.slideFromLeft}
              initial="hidden"
              animate={isServerInView ? "visible" : "hidden"}
              className="flex flex-col items-start gap-10 max-md:items-center"
            >
              <Title
                className="text-start max-md:text-center max-md:text-5xl"
                word="🔧 Server & APIs"
                type="blur"
              />
              <Text className="text-xl font-bold max-md:text-center md:text-3xl">
                The backend runs on my personal server 💻, set up using an old
                computer. It hosts APIs for microfrontends, managing data,
                authentication, and backend services. This taught me server
                management, Linux, Docker, and deploying scalable APIs. 🚀
              </Text>
            </motion.div>

            <motion.div
              ref={serverRef2}
              variants={variants.slideFromRight}
              initial="hidden"
              animate={isServerInView2 ? "visible" : "hidden"}
            >
              <AnimatedBeamArchitecture />
            </motion.div>
          </div>

          {/* =========================
              Section: Final
          ========================== */}
          <div className="mx-auto flex flex-col items-center justify-center max-md:py-10 md:h-svh md:w-2/3">
            <motion.div
              variants={variants.fadeIn}
              initial="hidden"
              animate={isFinalInView ? "visible" : "hidden"}
              ref={finalRef}
              className="flex flex-col items-center justify-center gap-10"
            >
              <Title
                className="max-md:text-5xl"
                word="🎯 That's a Wrap!"
                type="blur"
              />
              <Text className="text-center text-xl font-bold md:text-3xl">
                The entire project, from frontend to backend, reflects my
                journey of learning and building. You can explore the entire
                project’s code on my GitHub.
              </Text>

              <Text className="text-center text-xl font-bold md:text-3xl">
                Feel free to check out other projects while you're there! 🎬
              </Text>

              <div className="flex w-full items-center justify-center gap-2">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/rckbrcls/portifolio-monorepo"
                  className="glass-dark flex h-16 w-1/2 items-center justify-center gap-2 rounded-lg px-6 py-2 text-xl font-black transition duration-700 hover:scale-[1.01] hover:bg-zinc-800 active:scale-95"
                >
                  <AiFillGithub />
                  <Text className="max-md:hidden">Repository</Text>
                </a>

                <Link
                  href="/projects"
                  className="relative z-[5] flex h-16 w-1/2 items-center justify-center gap-2 overflow-hidden rounded-lg border-none bg-[linear-gradient(325deg,#d500f9_0%,#6366f1_35%,#ec4899_55%,#a855f7_75%,#3b82f6_100%)] bg-[280%_auto] bg-left-bottom px-6 py-2 text-xl font-black text-white shadow-[0px_0px_20px_rgba(219,112,255,0.5),0px_5px_5px_-1px_rgba(99,102,241,0.25),inset_4px_4px_8px_rgba(236,72,153,0.5),inset_-4px_-4px_8px_rgba(168,85,247,0.35)] transition-[background-position] duration-700 hover:bg-right-top focus:outline-none focus:ring-[#a855f7] focus:ring-offset-1 focus:ring-offset-white active:scale-95 dark:focus:ring-[#6366f1] dark:focus:ring-offset-black"
                >
                  <MdComputer />
                  <Text className="max-md:hidden">Projects</Text>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
