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
import { motion } from "framer-motion";
import Footer from "@/components/organisms/Footer";

export default function AboutMe() {
  return (
    <MainLayout>
      <Head>
        <title>About me | rckbrcls</title>
      </Head>

      <div className="mx-auto flex w-11/12 flex-col">
        {/* Hero Section */}
        <div className="flex w-full flex-col items-center justify-center gap-6 px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title word="About Me" type="blur" gradient />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-3xl"
          >
            <Text className="leading-relaxed text-gray-300">
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
          className="mx-auto px-4 py-12 text-center"
        >
          <SubTitle className="mb-4 text-3xl" gradient>
            Who I Am
          </SubTitle>
          <Text className="mb-6 leading-relaxed text-gray-300">
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
              className="glass-dark flex w-full items-center justify-center gap-3 text-nowrap rounded-lg px-8 py-4 text-base font-bold transition duration-300 hover:border-purple-400/40"
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
        </motion.div>

        {/* Skills & Interests Quick Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto w-full py-4"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 18,
                duration: 1.1,
              }}
              className="glass-dark w-full rounded-2xl border-purple-500/20 p-6 transition-all duration-300 hover:border-purple-400/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                {/* Rocket Icon */}
                <span
                  role="img"
                  aria-label="Rocket"
                  className="text-2xl text-white"
                >
                  🚀
                </span>
              </div>
              <SubTitle className="mb-3 text-base">Learning Stack</SubTitle>
              <Text className="text-base text-gray-400">
                React • Next.js • TypeScript • Python • Node.js
              </Text>
              <Text className="mt-1 text-xs text-gray-500">
                Always learning something new!
              </Text>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 18,
                duration: 1.1,
              }}
              className="glass-dark w-full rounded-2xl border-pink-500/20 p-6 transition-all duration-300 hover:border-pink-400/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
                {/* Palette Icon */}
                <span
                  role="img"
                  aria-label="Palette"
                  className="text-2xl text-white"
                >
                  🎨
                </span>
              </div>
              <SubTitle className="mb-3 text-base">Hobbies</SubTitle>
              <Text className="text-base text-gray-400">
                Drawing • Sports • Gaming • Music
              </Text>
              <Text className="mt-1 text-xs text-gray-500">
                Creativity fuels my code!
              </Text>
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 18,
                duration: 1.1,
              }}
              className="glass-dark w-full rounded-2xl border-purple-500/20 p-6 transition-all duration-300 hover:border-purple-400/40"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                {/* Globe Icon */}
                <span
                  role="img"
                  aria-label="Globe"
                  className="text-2xl text-white"
                >
                  🌎
                </span>
              </div>
              <SubTitle className="mb-3 text-base">Location</SubTitle>
              <Text className="text-base text-gray-400">Brazil 🇧🇷</Text>
              <Text className="mt-1 text-xs text-gray-500">
                Remote friendly
              </Text>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <BoxGrid />
        </motion.div>
      </div>
      <Footer />
    </MainLayout>
  );
}
