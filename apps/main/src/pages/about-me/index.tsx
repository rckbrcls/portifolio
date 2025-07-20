// pages/about-me/index.tsx
import React from "react";
import MainLayout from "@/components/MainLayout";
import Title from "@/components/atoms/Title";
import SubTitle from "@/components/atoms/SubTitle";
import { Text } from "@/components/atoms/Text";
import BoxGrid from "@/components/molecules/BoxGrid";
import { FaFileDownload } from "react-icons/fa";
import { BorderBeam } from "@/components/ui/border-beam";
import Head from "next/head";
import { DownButton } from "@/components/atoms/DownButton";
import { motion } from "framer-motion";
import Footer from "@/components/organisms/Footer";

export default function AboutMe() {
  return (
    <MainLayout>
      <Head>
        <title>About me | rckbrcls</title>
      </Head>

      <div className="w-full">
        {/* Hero Section */}
        <div className="flex w-full flex-col items-center justify-center gap-8 px-4 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title
              className="md:text-9xl"
              word="About Me"
              type="blur"
              gradient
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl"
          >
            <Text className="text-xl leading-relaxed text-gray-300">
              Hey there! I'm Erick, a passionate junior developer from Brazil
              who loves learning new technologies and building creative projects
              that solve real problems.
            </Text>
          </motion.div>
        </div>

        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-4xl px-4 py-16 text-center"
        >
          <SubTitle className="mb-6 text-3xl" gradient>
            Who I Am
          </SubTitle>
          <Text className="mb-8 text-lg leading-relaxed text-gray-300">
            I'm a junior software engineer who's passionate about learning and
            growing in the tech world. I enjoy working with modern web
            technologies and I'm always excited to take on new challenges. My
            goal is to build meaningful applications while continuously
            improving my skills and contributing to projects that make a
            difference.
          </Text>

          {/* Resume Download Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <a
              className="glass-dark group flex h-14 items-center justify-center gap-3 text-nowrap rounded-lg px-8 py-4 text-base font-bold transition duration-300 hover:scale-105 hover:border-purple-400/40"
              href="/files/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFileDownload className="text-lg transition-colors group-hover:text-purple-400" />
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
        </motion.div>

        {/* Skills & Interests Quick Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-6xl px-4 py-8"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-dark rounded-xl p-6 text-center"
            >
              <div className="mb-4 text-4xl">🚀</div>
              <SubTitle className="mb-2 text-lg">Learning Stack</SubTitle>
              <Text className="text-sm text-gray-400">
                React • Next.js • TypeScript • Python • Node.js
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-dark rounded-xl p-6 text-center"
            >
              <div className="mb-4 text-4xl">🎨</div>
              <SubTitle className="mb-2 text-lg">Hobbies</SubTitle>
              <Text className="text-sm text-gray-400">
                Drawing • Sports • Gaming • Music
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-dark rounded-xl p-6 text-center"
            >
              <div className="mb-4 text-4xl">🌎</div>
              <SubTitle className="mb-2 text-lg">Location</SubTitle>
              <Text className="text-sm text-gray-400">
                Brazil 🇧🇷 • Remote Friendly
              </Text>
            </motion.div>
          </div>
        </motion.div>

        {/* Personal Stories Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-7xl px-4 py-16"
        >
          <div className="mb-12 text-center">
            <SubTitle className="mb-6 text-3xl" gradient>
              My Story in Pictures
            </SubTitle>
            <Text className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
              Beyond code, I'm someone who loves life's simple pleasures. Here's
              a glimpse into who I am when I'm not building amazing software.
            </Text>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <BoxGrid />
          </motion.div>
        </motion.div>
      </div>
      <Footer />
    </MainLayout>
  );
}
