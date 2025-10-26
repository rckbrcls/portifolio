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
  return (
    <div>
      <Head>
        <title>About me | rckbrcls</title>
      </Head>

      <Aurora dark>
        <Header />
        <div className="mx-auto flex w-full flex-col items-end overflow-hidden">
          {/* Hero Section */}
          <div className="mb-5 w-full border-b border-zinc-700/30 pb-5">
            <div className="mx-auto flex items-start justify-between gap-6 p-4 text-start max-sm:flex-col max-sm:text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute left-4 top-4 z-50 flex justify-center"
              >
                <a
                  className="glass-dark flex w-full items-center justify-center gap-3 text-nowrap rounded-3xl px-6 py-4 text-base font-bold transition duration-300 hover:border-purple-400/40"
                  href="/files/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFileDownload className="transition-colors group-hover:text-purple-400" />
                  <Text>Download Resume</Text>
                  <BorderBeam
                    size={100}
                    duration={5}
                    delay={9}
                    colorFrom="#6366f1"
                    colorTo="#ec4899"
                  />
                </a>
              </motion.div>

              <div className="flex w-full flex-col items-end justify-between max-sm:items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Title
                    word="About Me"
                    type="blur"
                    gradient
                    className="text-end"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="max-w-2xl"
                >
                  <Text className="text-end leading-relaxed">
                    Welcome! Here you'll find a bit about my journey, passions,
                    and what inspires me beyond the code. Dive in and get to
                    know the person behind the projects.
                  </Text>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-11/12"
          >
            <BoxGrid />
          </motion.div>
        </div>
      </Aurora>
    </div>
  );
}
