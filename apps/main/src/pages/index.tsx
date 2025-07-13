import Image from "next/image";
import React, { useRef } from "react";
import Head from "next/head";
import { useInView } from "framer-motion";

import Aurora from "@/components/molecules/Aurora";
import Title from "@/components/atoms/Title";
import Header from "@/components/organisms/Header";
import Alert from "@/components/molecules/Alert";
import { ArchitectureContainer } from "@/components/organisms/ArchitectureContainer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hello! | rckbrcls</title>
      </Head>

      <Alert />
      <Header />

      <div className="w-full overflow-hidden">
        {/* =========================
            Section: Initial
        ========================== */}
        <div className="relative flex h-svh flex-col items-center justify-center text-center">
          <Aurora />
          <div className="relative my-4 h-2/5 w-full select-none">
            <Image
              src="/images/assets/me.png"
              alt="Picture of Erick Barcelos"
              fill
              className="select-none object-contain"
              priority
              quality={100}
            />
          </div>
          <Title word="Olá! I'm Erick Barcelos" />
        </div>

        <div className="flex h-svh w-full items-center justify-center p-10">
          <ArchitectureContainer />
        </div>
      </div>
    </>
  );
}
