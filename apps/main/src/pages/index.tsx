import Image from "next/image";
import React from "react";
import Head from "next/head";
import Aurora from "@/components/molecules/Aurora";
import Title from "@/components/atoms/Title";
import Header from "@/components/organisms/Header";
import SubTitle from "@/components/atoms/SubTitle";
import BlurIn from "@/components/ui/blur-in";

export default function Home() {
  return (
    <>
      <Head>
        <title>Hello! | rckbrcls</title>
      </Head>

      <Aurora>
        <Header />
        <div className="flex h-full w-full flex-col items-center justify-center gap-8">
          <div className="relative flex h-48 w-48 select-none sm:h-64 sm:w-64 md:h-80 md:w-80 lg:h-96 lg:w-96">
            <Image
              src="/images/assets/me.png"
              alt="Picture of Erick"
              fill
              className="select-none object-contain"
              priority
              quality={100}
            />
          </div>
          <div className="flex flex-col items-center gap-3">
            <Title word="Olá! I'm Erick" type="blur" />
            <BlurIn
              word="Software Engineer and Lifelong Learner"
              className="text-lg font-normal md:text-xl"
            />
          </div>
        </div>
      </Aurora>
    </>
  );
}
