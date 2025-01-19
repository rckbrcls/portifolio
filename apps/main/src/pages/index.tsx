import Image from "next/image";
import React, { useMemo, useRef } from "react";
import Aurora from "@/components/molecules/Aurora";
import Title from "@/components/atoms/Title";
import Header from "@/components/organisms/Header";
import Alert from "@/components/molecules/Alert";
import Head from "next/head";
import { AnimatedBeamArchitecture } from "@/components/organisms/AnimatedBeam";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { MdComputer } from "react-icons/md";
import { Text } from "@/components/atoms/Text";
import { motion, spring, useInView } from "framer-motion";

export default function Home() {
  const clientRef = useRef(null);
  const serverRef = useRef(null);
  const finalRef = useRef(null);

  const isClientInView = useInView(clientRef, { once: true, margin: "-100px" });
  const isServerInView = useInView(serverRef, { once: true, margin: "-100px" });
  const isFinalInView = useInView(finalRef, { once: true, margin: "-100px" });

  const leftVariants = {
    spring: { type: "spring", stiffness: 100 },
    hidden: { x: "-5vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  const rightVariants = {
    spring: { type: "spring", stiffness: 100 },
    hidden: { x: "5vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  const fadeInVariants = {
    spring: { type: "spring", stiffness: 100 },
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <>
      <Head>
        <title>Hello! | rckbrcls</title>
      </Head>

      <Alert />
      <Header />

      <div className="z-0 h-svh w-full overflow-x-hidden scroll-smooth md:snap-y md:snap-mandatory md:snap-start md:snap-normal md:overflow-y-scroll">
        {/* Seção Inicial */}
        <div className="relative flex h-svh snap-start flex-col items-center justify-center text-center">
          <Aurora />
          <div className="relative my-4 h-2/5 w-full select-none">
            <Image
              className="select-none"
              src="/images/assets/me.png"
              alt="Picture of Erick Barcelos"
              fill
              style={{ objectFit: "contain" }}
              priority
              quality={100}
            />
          </div>
          <Title word="Olá! I'm Erick Barcelos" />
        </div>

        {/* Seção de Client-Side Architecture */}
        <div className="mx-auto w-full p-6">
          <div
            ref={clientRef}
            className="grid w-full snap-start grid-cols-2 items-center justify-center gap-12 border-b border-zinc-700/40 max-md:grid-cols-1 max-md:gap-10 max-md:py-10 md:h-svh"
          >
            <motion.div
              variants={leftVariants}
              initial="hidden"
              animate={isClientInView ? "visible" : "hidden"}
            >
              <AnimatedBeamArchitecture />
            </motion.div>

            <motion.div
              variants={rightVariants}
              initial="hidden"
              animate={isClientInView ? "visible" : "hidden"}
              className="flex flex-col items-end justify-start gap-10"
            >
              <Title
                className="text-end max-md:text-center max-md:text-5xl"
                word="🖥️ Client Architecture"
                type="blur"
              />
              <Text className="text-end text-xl font-bold max-md:text-center md:text-3xl">
                This portfolio showcases the client-side of my project, built
                with microfrontend architecture. It consolidates older projects
                into one interface, each acting as a microfrontend linked to
                personal server-hosted APIs. This streamlined approach improved
                my skills in microfrontends and modular development. 🛠️
              </Text>
            </motion.div>
          </div>

          {/* Seção de Server & APIs */}
          <div
            ref={serverRef}
            className="grid w-full snap-start grid-cols-2 items-center justify-center gap-12 border-b border-zinc-700/40 max-md:grid-cols-1 max-md:gap-10 max-md:py-10 md:h-svh"
          >
            <motion.div
              variants={leftVariants}
              initial="hidden"
              animate={isServerInView ? "visible" : "hidden"}
              className="flex flex-col items-start justify-start gap-10"
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
              variants={rightVariants}
              initial="hidden"
              animate={isServerInView ? "visible" : "hidden"}
            >
              <AnimatedBeamArchitecture />
            </motion.div>
          </div>

          {/* Seção Final */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate={isFinalInView ? "visible" : "hidden"}
            ref={finalRef}
            className="mx-auto flex snap-start flex-col items-center justify-center gap-10 pb-20 pt-10 md:h-svh md:w-2/3"
          >
            <Title
              className="max-md:text-5xl"
              word="🎯 That's a Wrap!"
              type="blur"
            />
            <Text className="text-center text-xl font-bold md:text-3xl">
              The entire project, from frontend to backend, reflects my journey
              of learning and building. You can explore the all project code on
              my GitHub.
            </Text>

            <Text className="text-center text-xl font-bold md:text-3xl">
              Feel free to check out other projects while you're there! 🎬
            </Text>

            <div className="flex w-full items-center justify-center gap-2">
              <a
                target="_blank"
                href={"https://github.com/rckbrcls/portifolio-monorepo"}
                className="glass-dark flex h-16 w-1/2 items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-2 text-xl font-black transition duration-700 hover:scale-[1.01] hover:bg-zinc-800 active:scale-95 active:bg-zinc-800"
              >
                <AiFillGithub />
                <Text className="max-md:hidden"> Repository</Text>
              </a>
              <Link
                href={"projects"}
                className="flex h-16 w-1/2 items-center justify-center gap-2 text-nowrap rounded-lg border-none bg-[linear-gradient(325deg,#d500f9_0%,#6366f1_35%,#ec4899_55%,#a855f7_75%,#3b82f6_100%)] bg-[280%_auto] px-6 py-2 text-xl font-black text-white shadow-[0px_0px_20px_rgba(219,112,255,0.5),0px_5px_5px_-1px_rgba(99,102,241,0.25),inset_4px_4px_8px_rgba(236,72,153,0.5),inset_-4px_-4px_8px_rgba(168,85,247,0.35)] transition-[background] duration-700 hover:bg-right-top focus:outline-none focus:ring-[#a855f7] focus:ring-offset-1 focus:ring-offset-white focus-visible:ring-2 dark:focus:ring-[#6366f1] dark:focus:ring-offset-black"
              >
                <MdComputer />
                <Text className="max-md:hidden">Projects</Text>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
