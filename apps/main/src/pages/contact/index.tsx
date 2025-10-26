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
    var aux = document.createElement("input");
    aux.setAttribute("value", val);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  };

  return (
    <MainLayout>
      <Head>
        <title>Contact | rckbrcls</title>
      </Head>
      <div className="mx-auto flex flex-col pb-20 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 flex w-11/12 flex-col gap-6"
        >
          <Title word="Get in Touch" type="blur" gradient />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <Text className="text-lg leading-relaxed text-gray-300">
              Got a project idea? Want to discuss something technical? Or just
              wanna say hi? Pick whichever way works best for you below.
            </Text>
          </motion.div>
        </motion.div>

        <div className="mx-auto flex w-11/12 flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 gap-4 lg:grid-cols-3"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                className="glass-dark flex items-center gap-4 rounded-xl px-6 py-5 transition-all duration-300 hover:border-purple-400/50"
                target="_blank"
                href="https://github.com/rckbrcls"
              >
                <AiFillGithub className="text-3xl text-purple-400" />
                <div className="flex flex-col">
                  <Text className="font-semibold">GitHub</Text>
                  <Text className="text-sm text-gray-500">@rckbrcls</Text>
                </div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                className="glass-dark flex items-center gap-4 rounded-xl px-6 py-5 transition-all duration-300 hover:border-purple-400/50"
                target="_blank"
                href="https://www.linkedin.com/in/brcls/"
              >
                <AiFillLinkedin className="text-3xl text-blue-400" />
                <div className="flex flex-col">
                  <Text className="font-semibold">LinkedIn</Text>
                  <Text className="text-sm text-gray-500">/in/brcls</Text>
                </div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                className="glass-dark flex items-center gap-4 rounded-xl px-6 py-5 transition-all duration-300 hover:border-purple-400/50"
                href="mailto:erickbarcelosdev@gmail.com"
                onClick={() => {
                  setShowCopyMessage(true);
                  setTimeout(() => setShowCopyMessage(false), 2000);
                  copyValue("erickbarcelosdev@gmail.com");
                }}
              >
                <AiFillMail className="text-3xl text-pink-400" />
                <div className="flex flex-col">
                  <Text className="font-semibold">Email</Text>
                  <Text className="text-sm text-gray-500">
                    {showCopyMessage ? (
                      <span className="text-green-400">
                        Copied to clipboard!
                      </span>
                    ) : (
                      "Click to copy"
                    )}
                  </Text>
                </div>
              </Link>
            </motion.div>
          </motion.div>
          {/* Additional Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-8"
          >
            <div className="mb-6">
              <SubTitle className="mb-2 text-xl">Quick info</SubTitle>
              <Text className="text-sm text-gray-500">
                Some things you might want to know
              </Text>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <motion.div
                initial={false}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 18,
                  duration: 1.1,
                }}
                className="glass-dark rounded-xl border-zinc-700/50 p-5 transition-all duration-300 hover:border-purple-400/40"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                    <FaMapMarkerAlt className="text-lg text-purple-400" />
                  </div>
                  <div>
                    <SubTitle className="mb-1 text-base">
                      Based in Brazil
                    </SubTitle>
                    <Text className="text-sm text-gray-400">
                      GMT-3 timezone
                    </Text>
                  </div>
                </div>
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
                className="glass-dark rounded-xl border-zinc-700/50 p-5 transition-all duration-300 hover:border-purple-400/40"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/20">
                    <FaClock className="text-lg text-pink-400" />
                  </div>
                  <div>
                    <SubTitle className="mb-1 text-base">
                      Response time
                    </SubTitle>
                    <Text className="text-sm text-gray-400">
                      Usually within a day or two
                    </Text>
                  </div>
                </div>
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
                className="glass-dark rounded-xl border-zinc-700/50 p-5 transition-all duration-300 hover:border-purple-400/40"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                    <FaCode className="text-lg text-purple-400" />
                  </div>
                  <div>
                    <SubTitle className="mb-1 text-base">Working with</SubTitle>
                    <Text className="text-sm text-gray-400">
                      React, TypeScript, Node.js
                    </Text>
                  </div>
                </div>
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
                className="glass-dark rounded-xl border-zinc-700/50 p-5 transition-all duration-300 hover:border-purple-400/40"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500/20">
                    <FaCoffee className="text-lg text-pink-400" />
                  </div>
                  <div>
                    <SubTitle className="mb-1 text-base">Open to</SubTitle>
                    <Text className="text-sm text-gray-400">
                      Freelance projects & consulting
                    </Text>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </MainLayout>
  );
}
