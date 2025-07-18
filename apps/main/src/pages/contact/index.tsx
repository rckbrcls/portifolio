"use client";

import MainLayout from "@/components/MainLayout";
import { Text } from "@/components/atoms/Text";
import Title from "@/components/atoms/Title";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";

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
      <div className="mx-auto flex h-svh w-11/12 flex-col items-center justify-center gap-4 text-center">
        <Title className="md:text-9xl" word="Contact" type="blur" gradient />
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <Link
            className="glass-dark flex h-16 w-full items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-2 text-xl font-black transition duration-700 hover:scale-[1.01] hover:bg-zinc-800 active:scale-95 active:bg-zinc-800 md:w-1/4"
            target="_blank"
            href="https://github.com/rckbrcls"
          >
            <AiFillGithub />
            <Text>GitHub</Text>
          </Link>
          <Link
            className="glass-dark flex h-16 w-full items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-2 text-xl font-black transition duration-700 hover:scale-[1.01] hover:bg-zinc-800 active:scale-95 active:bg-zinc-800 md:w-1/4"
            target="_blank"
            href="https://www.linkedin.com/in/brcls/"
          >
            <AiFillLinkedin />
            <Text>LinkedIn</Text>
          </Link>
          <Link
            className="glass-dark flex h-16 w-full items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-2 text-xl font-black transition duration-700 hover:scale-[1.01] hover:bg-zinc-800 active:scale-95 active:bg-zinc-800 md:w-1/4"
            href="mailto:erickbarcelosdev@gmail.com?subject=Let's work together!"
            onClick={() => {
              setShowCopyMessage(true);
              setTimeout(() => setShowCopyMessage(false), 2000);
              copyValue("erickbarcelosdev@gmail.com");
            }}
          >
            <div className="flex items-center gap-2">
              📬
              <Text>E-mail</Text>
            </div>
            {showCopyMessage && <p>Copied!</p>}
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
