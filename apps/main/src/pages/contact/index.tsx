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
      <div className="mx-auto w-11/12 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex min-h-[70vh] flex-col items-center justify-center gap-8 text-center"
        >
          <Title
            className="md:text-9xl"
            word="Let's Connect"
            type="blur"
            gradient
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <Text className="text-xl leading-relaxed text-gray-300">
              I'm always excited to collaborate on new projects, discuss ideas,
              or just chat about tech! Feel free to reach out through any of the
              channels below.
            </Text>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex w-full flex-col items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                className="glass-dark flex h-16 w-full items-center justify-center gap-3 text-nowrap rounded-lg px-8 py-4 text-xl font-bold transition duration-300 hover:border-purple-400/40 md:w-80"
                target="_blank"
                href="https://github.com/brcls"
              >
                <AiFillGithub className="text-2xl" />
                <Text>Check out my code</Text>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                className="glass-dark flex h-16 w-full items-center justify-center gap-3 text-nowrap rounded-lg px-8 py-4 text-xl font-bold transition duration-300 hover:border-purple-400/40 md:w-80"
                target="_blank"
                href="https://www.linkedin.com/in/erickpatrickbarcelos"
              >
                <AiFillLinkedin className="text-2xl" />
                <Text>Connect professionally</Text>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                className="glass-dark flex h-16 w-full items-center justify-center gap-3 text-nowrap rounded-lg px-8 py-4 text-xl font-bold transition duration-300 hover:border-purple-400/40 md:w-80"
                href="mailto:erickpatrickbarcelos@gmail.com?subject=Let's work together!"
                onClick={() => {
                  setShowCopyMessage(true);
                  setTimeout(() => setShowCopyMessage(false), 2000);
                  copyValue("erickpatrickbarcelos@gmail.com");
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
        </motion.div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-dark rounded-xl p-6 text-center"
            >
              <FaMapMarkerAlt className="mx-auto mb-4 text-3xl text-purple-400" />
              <SubTitle className="mb-2 text-lg">Location</SubTitle>
              <Text className="text-gray-400">Brazil 🇧🇷</Text>
              <Text className="mt-1 text-xs text-gray-500">
                Remote friendly
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-dark rounded-xl p-6 text-center"
            >
              <FaClock className="mx-auto mb-4 text-3xl text-pink-400" />
              <SubTitle className="mb-2 text-lg">Response Time</SubTitle>
              <Text className="text-gray-400">Usually within</Text>
              <Text className="mt-1 text-xs text-gray-500">24-48 hours</Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass-dark rounded-xl p-6 text-center"
            >
              <FaCode className="mx-auto mb-4 text-3xl text-purple-300" />
              <SubTitle className="mb-2 text-lg">Interests</SubTitle>
              <Text className="text-gray-400">Microfrontends</Text>
              <Text className="mt-1 text-xs text-gray-500">
                React • Next.js • TypeScript
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-dark rounded-xl p-6 text-center"
            >
              <FaCoffee className="mx-auto mb-4 text-3xl text-pink-300" />
              <SubTitle className="mb-2 text-lg">Let's Chat About</SubTitle>
              <Text className="text-gray-400">New projects</Text>
              <Text className="mt-1 text-xs text-gray-500">
                Ideas • Collaborations • Tech
              </Text>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20 text-center"
        >
          <SubTitle className="mb-4 text-2xl" gradient>
            Ready to build something amazing together?
          </SubTitle>
          <Text className="mx-auto max-w-xl text-gray-400">
            Whether you have a project in mind, want to collaborate, or just
            want to say hi - I'd love to hear from you!
          </Text>
        </motion.div>
      </div>
      <Footer />
    </MainLayout>
  );
}
