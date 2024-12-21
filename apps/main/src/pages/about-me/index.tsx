// pages/about-me/index.tsx
import React from "react";
import MainLayout from "@/components/MainLayout";
import Title from "@/components/atoms/Title";
import Text from "@/components/atoms/Text";
import BoxGrid from "@/components/molecules/BoxGrid";
import { aboutMeBoxes } from "../../../public/data/aboutMeData";
import { FaArrowAltCircleDown, FaFileDownload } from "react-icons/fa";
import { BorderBeam } from "@/components/ui/border-beam";

export default function AboutMe() {
  return (
    <MainLayout>
      <div className="mx-auto mb-24 flex w-11/12 flex-col gap-4 text-center">
        <div className="flex h-[100svh] w-full flex-col items-center justify-center gap-4 text-center">
          <div className="flex w-full flex-col items-center justify-center gap-10">
            <Title word="About me" type="blur" gradient />
            <a
              className="glass-dark relative flex w-full items-center justify-center gap-2 rounded-lg px-10 py-4 duration-500 hover:scale-105 hover:bg-zinc-900 active:scale-95 active:bg-zinc-900 md:w-1/4"
              href="/files/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFileDownload size={30} />
              <Text>Resume</Text>
              <BorderBeam
                size={100}
                duration={5}
                delay={9}
                colorFrom="#6366f1"
                colorTo="#ec4899"
              />
            </a>
          </div>
          <FaArrowAltCircleDown
            size={30}
            className="absolute bottom-10 animate-bounce"
          />
        </div>
        {/* Grid de caixas */}
        <BoxGrid boxes={aboutMeBoxes} />
      </div>
    </MainLayout>
  );
}
