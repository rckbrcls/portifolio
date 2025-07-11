// pages/about-me/index.tsx
import React from "react";
import MainLayout from "@/components/MainLayout";
import Title from "@/components/atoms/Title";
import { Text } from "@/components/atoms/Text";
import BoxGrid from "@/components/molecules/BoxGrid";
import { FaFileDownload } from "react-icons/fa";
import { BorderBeam } from "@/components/ui/border-beam";
import Head from "next/head";
import { DownButton } from "@/components/atoms/DownButton";

export default function AboutMe() {
  return (
    <MainLayout>
      <Head>
        <title>About me | rckbrcls</title>
      </Head>
      <div className="mx-auto mb-24 flex w-11/12 flex-col gap-4 text-center">
        <div className="flex h-svh w-full flex-col items-center justify-center gap-4 text-center">
          <div className="flex w-full flex-col items-center justify-center gap-10">
            <Title
              className="md:text-9xl"
              word="About Me"
              type="blur"
              gradient
            />
            <a
              className="glass-dark flex h-16 w-full items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-2 font-black transition duration-700 hover:scale-[1.01] hover:bg-zinc-800 active:scale-95 active:bg-zinc-800 md:w-1/4"
              href="/files/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄
              <Text>Download Resume</Text>
              <BorderBeam
                size={100}
                duration={5}
                delay={9}
                colorFrom="#6366f1"
                colorTo="#ec4899"
              />
            </a>
          </div>
          <DownButton text="Learn More About Me" />
        </div>
        <BoxGrid />
      </div>
    </MainLayout>
  );
}
