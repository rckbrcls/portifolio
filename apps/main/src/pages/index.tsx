import Image from "next/image";
import React, { useMemo } from "react";
import Aurora from "@/components/molecules/Aurora";
import Title from "@/components/atoms/Title";
import Header from "@/components/organisms/Header";
import Alert from "@/components/molecules/Alert";
import Head from "next/head";
import { AnimatedBeamMultipleOutputDemo } from "@/components/organisms/AnimatedBeam";
import SubTitle from "@/components/atoms/SubTitle";
const MemoizedAurora = React.memo(Aurora);

export default function Home() {
  const aurora = useMemo(() => <MemoizedAurora />, []);

  return (
    <>
      <Head>
        <title>Olá! | rckbrcls</title>
      </Head>
      <Alert />
      <Header />
      {aurora}
      <main className="w-full">
        <div className="flex h-[100svh] flex-col items-center justify-center p-4 text-center">
          <div className="relative my-4 h-2/5 w-full select-none">
            <Image
              className="select-none"
              src="/images/assets/me.png"
              alt="me"
              fill
              style={{ objectFit: "contain" }}
              priority
              quality={100}
            />
          </div>
          <Title word="Olá! I'm Erick Barcelos" />
        </div>
        <div className="grid h-screen w-full grid-cols-2 items-center justify-between max-md:grid-cols-1">
          <AnimatedBeamMultipleOutputDemo />
          <div className="flex flex-col items-start justify-start gap-10 p-14 text-start">
            <Title word="Architecture" type="blur" />
            <SubTitle>
              My portfolio is crafted using a microfrontend architecture,
              ensuring a modular, scalable, and easy-to-maintain structure. This
              design allows seamless integration of various frameworks and
              technologies, providing a smooth and consistent experience across
              all projects.
            </SubTitle>
          </div>
        </div>
      </main>
    </>
  );
}
