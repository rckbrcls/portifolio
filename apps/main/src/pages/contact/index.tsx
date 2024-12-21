"use client";

import MainLayout from "@/components/MainLayout";
import Text from "@/components/atoms/Text";
import Title from "@/components/atoms/Title";
import Link from "next/link";
import React, { useState } from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillInstagram,
  AiFillMail,
  AiFillCopy,
} from "react-icons/ai";

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
      <div className="mx-auto flex h-[100svh] w-11/12 flex-col items-center justify-center gap-4 text-center">
        <Title word="Contact" type="blur" gradient />
        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          <Link
            className="glass-dark flex w-full select-none items-center gap-2 rounded-lg p-5 duration-500 hover:scale-105 hover:bg-zinc-900 active:scale-95 active:bg-zinc-900 md:w-1/3"
            target="_blank"
            href="https://github.com/rckbrcls"
          >
            <AiFillGithub size={40} />
            <Text>GitHub</Text>
          </Link>
          <Link
            className="glass-dark flex w-full select-none items-center gap-2 rounded-lg p-5 duration-500 hover:scale-105 hover:bg-zinc-900 active:scale-95 active:bg-zinc-900 md:w-1/3"
            target="_blank"
            href="https://www.linkedin.com/in/brcls/"
          >
            <AiFillLinkedin size={40} />
            <Text>LinkedIn</Text>
          </Link>
          <Link
            className="glass-dark flex w-full select-none items-center gap-2 rounded-lg p-5 duration-500 hover:scale-105 hover:bg-zinc-900 active:scale-95 active:bg-zinc-900 md:w-1/3"
            target="_blank"
            href="https://instagram.com/rckbrcls"
          >
            <AiFillInstagram size={40} />
            <Text>Instagram</Text>
          </Link>
          <Link
            className="glass-dark flex w-full select-none items-center justify-between rounded-lg p-5 duration-500 hover:scale-105 hover:bg-zinc-900 active:scale-95 active:bg-zinc-900 md:w-1/3"
            href="mailto:erickbarcelosdev@gmail.com?subject=Let's work together!"
            onClick={() => {
              setShowCopyMessage(true);
              setTimeout(() => setShowCopyMessage(false), 2000);
              copyValue("erickbarcelosdev@gmail.com");
            }}
          >
            <div className="flex items-center gap-2">
              <AiFillMail size={40} />
              <Text>E-mail</Text>
            </div>
            {showCopyMessage && <p>Copied!</p>}
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
