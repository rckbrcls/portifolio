// pages/about-me/index.tsx
import React from "react";
import Title from "@/components/atoms/Title";
import { Text } from "@/components/atoms/Text";
import BoxGrid from "@/components/molecules/BoxGrid";
import { FaFileDownload } from "react-icons/fa";
import { BorderBeam } from "@/components/ui/border-beam";
import Head from "next/head";
import { motion } from "framer-motion";
import Aurora from "@/components/molecules/Aurora";
import Header from "@/components/organisms/Header";

export default function AboutMe() {
  const downloadButton = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="absolute z-50 flex justify-center max-sm:bottom-4 max-sm:right-4 sm:left-4 sm:top-4"
    >
      <a
        className="glass-dark relative flex w-full items-center justify-center gap-3 text-nowrap rounded-3xl px-6 py-2 text-base font-bold transition duration-300 hover:border-purple-400/40 max-sm:p-3"
        href="/files/Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaFileDownload className="transition-colors group-hover:text-purple-400" />
        <Text className="max-sm:hidden">Download Resume</Text>
        <BorderBeam
          size={100}
          duration={5}
          delay={9}
          colorFrom="#6366f1"
          colorTo="#ec4899"
        />
      </a>
    </motion.div>
  );

  return (
    <div>
      <Head>
        <title>About me | rckbrcls</title>
      </Head>

      <Aurora dark>
        <Header />
        {downloadButton}
        <div className="flex w-full flex-col items-end overflow-hidden max-sm:mb-16">
          {/* Hero Section */}

          <div className="flex w-full items-start justify-between gap-6 px-4 text-start max-sm:flex-col max-sm:px-2 max-sm:text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-5 flex w-full flex-col items-end justify-end border-b border-zinc-700/30"
            >
              <Title
                word="About Me"
                type="blur"
                gradient
                className="text-end"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-11/12 max-sm:w-full"
          >
            <BoxGrid />
          </motion.div>
        </div>
      </Aurora>
    </div>
  );
}
