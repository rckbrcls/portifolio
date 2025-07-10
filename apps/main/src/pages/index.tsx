import Image from "next/image";
import React, { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

import Aurora from "@/components/molecules/Aurora";
import Title from "@/components/atoms/Title";
import Header from "@/components/organisms/Header";
import Alert from "@/components/molecules/Alert";
import { ArchitectureContainer } from "@/components/organisms/ArchitectureContainer";
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
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  },
  slideFromRight: {
    hidden: { x: "5vw", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { type: "spring", stiffness: 80, damping: 20 },
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
      </div>
    </>
  );
}
