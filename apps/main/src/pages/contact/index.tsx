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
        <div className="flex flex-col items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 flex w-full flex-col gap-6"
          >
            <Title
              word="Get in Touch"
              type="blur"
              gradient
              className="text-end"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className=""
            >
              <Text className="text-end text-lg leading-relaxed text-gray-300">
                Got a project idea? Want to discuss something technical? Or just
                wanna say hi? Pick whichever way works best for you below.
              </Text>
            </motion.div>
          </motion.div>

          <div className="flex w-full flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex w-full flex-col items-end gap-4 md:inline-flex md:w-auto md:flex-col"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  className="glass-dark flex w-full items-center gap-4 rounded-3xl rounded-xl px-6 py-5 transition-all duration-300 hover:border-purple-400/50"
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
              >
                <Link
                  className="glass-dark flex w-full items-center gap-4 rounded-3xl rounded-xl px-6 py-5 transition-all duration-300 hover:border-purple-400/50"
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
              >
                <Link
                  className="glass-dark flex w-full items-center gap-4 rounded-3xl rounded-xl px-6 py-5 transition-all duration-300 hover:border-purple-400/50"
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
        </div>
      </Aurora>
    </div>
  );
}
