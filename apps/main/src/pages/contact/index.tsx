"use client";

import { Text } from "@/components/atoms/Text";
import Title from "@/components/atoms/Title";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";
import { motion } from "framer-motion";
import Aurora from "@/components/molecules/Aurora";
import Header from "@/components/organisms/Header";

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
    <div>
      <Head>
        <title>Contact | rckbrcls</title>
      </Head>

      <Aurora dark>
        <Header />
        <div className="flex flex-col items-end md:p-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 flex w-full flex-col items-end gap-2 border-b border-zinc-700/50"
          >
            <Title word="Contact" type="blur" gradient className="text-end" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex w-full items-center justify-end gap-2 max-sm:flex-col md:gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto"
            >
              <Link
                className="glass-dark flex w-full items-center gap-4 rounded-3xl px-6 py-4 transition-all duration-300 hover:border-purple-400/50"
                target="_blank"
                href="https://github.com/rckbrcls"
              >
                <AiFillGithub className="text-3xl text-purple-400" />
                <div className="flex flex-col">
                  <Text className="font-semibold">GitHub</Text>
                  <Text className="whitespace-nowrap text-sm text-gray-500">
                    @rckbrcls
                  </Text>
                </div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto"
            >
              <Link
                className="glass-dark flex w-full items-center gap-4 rounded-3xl px-6 py-4 transition-all duration-300 hover:border-purple-400/50"
                target="_blank"
                href="https://www.linkedin.com/in/brcls/"
              >
                <AiFillLinkedin className="text-3xl text-blue-400" />
                <div className="flex flex-col">
                  <Text className="font-semibold">LinkedIn</Text>
                  <Text className="whitespace-nowrap text-sm text-gray-500">
                    /in/brcls
                  </Text>
                </div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto"
            >
              <Link
                className="glass-dark flex w-full items-center gap-4 rounded-3xl px-6 py-4 transition-all duration-300 hover:border-purple-400/50"
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
                  <Text className="whitespace-nowrap text-sm text-gray-500">
                    {showCopyMessage ? (
                      <span className="whitespace-nowrap text-green-400">
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
        </div>
      </Aurora>
    </div>
  );
}
