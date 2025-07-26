"use client";

import MainLayout from "@/components/MainLayout";
import { Text } from "@/components/atoms/Text";
import Title from "@/components/atoms/Title";
import SubTitle from "@/components/atoms/SubTitle";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";
import { FaMapMarkerAlt, FaClock, FaCode, FaCoffee } from "react-icons/fa";
import { motion } from "framer-motion";
import Footer from "@/components/organisms/Footer";

export default function Contact() {
  const [showCopyMessage, setShowCopyMessage] = useState<boolean>();

  const copyValue = (val: string) => {
    // Create a "hidden" input
    var aux = document.createElement("input");

    // Assign it the value of the specified element
    aux.setAttribute("value", val);

    // Append it to the body
    document.body.appendChild(aux);

    // Highlight its content
    aux.select();

    // Copy the highlighted text
    document.execCommand("copy");

    // Remove it from the body
    document.body.removeChild(aux);
  };

  return (
    <MainLayout>
      <Head>
        <title>Contact | rckbrcls</title>
      </Head>
      <div className="mx-auto flex w-11/12 flex-col gap-10 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center gap-8 text-center"
        >
          <Title word="Let's Connect" type="blur" gradient />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <Text className="leading-relaxed">
              I'm always excited to collaborate on new projects, discuss ideas,
              or just chat about tech! Feel free to reach out through any of the
              channels below.
            </Text>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="border-t border-zinc-700/30 pt-10 text-center"
        >
          <SubTitle className="mb-4 text-2xl" gradient>
            Ready to build something amazing together?
          </SubTitle>
          <Text className="mx-auto max-w-xl text-gray-400">
            Whether you have a project in mind, want to collaborate, or just
            want to say hi - I'd love to hear from you!
          </Text>
        </motion.div>

        <div className="flex w-full flex-col gap-4">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Link
                className="glass-dark flex w-full items-center justify-center gap-3 text-nowrap rounded-lg px-8 py-4 text-base font-bold transition duration-300 hover:border-purple-400/40"
                target="_blank"
                href="https://github.com/rckbrcls"
              >
                <AiFillGithub className="text-2xl" />
                <Text>Check out my code</Text>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Link
                className="glass-dark flex w-full items-center justify-center gap-3 text-nowrap rounded-lg px-8 py-4 text-base font-bold transition duration-300 hover:border-purple-400/40"
                target="_blank"
                href="https://www.linkedin.com/in/brcls/"
              >
                <AiFillLinkedin className="text-2xl" />
                <Text>Connect professionally</Text>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Link
                className="glass-dark flex w-full items-center justify-center gap-3 text-nowrap rounded-lg px-8 py-4 text-base font-bold transition duration-300 hover:border-purple-400/40"
                href="mailto:erickbarcelosdev@gmail.com?subject=Let's work together!"
                onClick={() => {
                  setShowCopyMessage(true);
                  setTimeout(() => setShowCopyMessage(false), 2000);
                  copyValue("erickbarcelosdev@gmail.com");
                }}
              >
                <AiFillMail className="text-2xl" />
                <Text>Send me an email</Text>
                {showCopyMessage && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-2 text-sm text-green-400"
                  >
                    Copied!
                  </motion.span>
                )}
              </Link>
            </motion.div>
          </motion.div>
          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <motion.div
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 18,
                  duration: 1.1,
                }}
                className="glass-dark rounded-2xl border-purple-500/20 p-6 transition-all duration-300 hover:border-purple-400/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <FaMapMarkerAlt className="text-2xl text-white" />
                </div>
                <SubTitle className="mb-3 text-base">Location</SubTitle>
                <Text className="text-base text-gray-400">Brazil 🇧🇷</Text>
                <Text className="mt-1 text-xs text-gray-500">
                  Remote friendly
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
                className="glass-dark rounded-2xl border-pink-500/20 p-6 transition-all duration-300 hover:border-pink-400/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
                  <FaClock className="text-2xl text-white" />
                </div>
                <SubTitle className="mb-3 text-base">Response Time</SubTitle>
                <Text className="text-base text-gray-400">Usually within</Text>
                <Text className="mt-1 text-xs text-gray-500">24-48 hours</Text>
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
                className="glass-dark rounded-2xl border-purple-500/20 p-6 transition-all duration-300 hover:border-purple-400/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <FaCode className="text-2xl text-white" />
                </div>
                <SubTitle className="mb-3 text-base">Interests</SubTitle>
                <Text className="text-base text-gray-400">
                  Software Engineering
                </Text>
                <Text className="mt-1 text-xs text-gray-500">
                  Web Development • AI • Open Source
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
                className="glass-dark rounded-2xl border-pink-500/20 p-6 transition-all duration-300 hover:border-pink-400/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
                  <FaCoffee className="text-2xl text-white" />
                </div>
                <SubTitle className="mb-3 text-base">Let's Chat About</SubTitle>
                <Text className="text-base text-gray-400">New projects</Text>
                <Text className="mt-1 text-xs text-gray-500">
                  Ideas • Collaborations • Tech
                </Text>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </MainLayout>
  );
}
