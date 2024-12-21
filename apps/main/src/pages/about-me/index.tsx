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
      <div className="flex flex-col text-center gap-4 w-11/12 mx-auto mb-24">
        <div className="h-[100svh] flex flex-col justify-center text-center items-center gap-4 w-full">
          <div className="flex flex-col gap-10 justify-center items-center w-full">
            <Title word="About me" type="blur" gradient />
            <a
              className="glass-dark relative md:w-1/4 w-full px-10 py-4 rounded-lg hover:bg-zinc-900 active:bg-zinc-900
              hover:scale-105 active:scale-95 duration-500 flex items-center justify-center gap-2"
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
            className="animate-bounce absolute bottom-10"
          />
        </div>
        {/* Grid de caixas */}
        <BoxGrid boxes={aboutMeBoxes} />
      </div>
    </MainLayout>
  );
}
