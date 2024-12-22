import Image from "next/image";
import React, { useMemo } from "react";
import Aurora from "@/components/molecules/Aurora";
import Title from "@/components/atoms/Title";
import Header from "@/components/organisms/Header";
import Alert from "@/components/molecules/Alert";
import Head from "next/head";

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
      <main>
        <div className="flex h-[100svh] flex-col items-center justify-center text-center">
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
      </main>
    </>
  );
}
