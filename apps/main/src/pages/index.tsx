import Image from "next/image";
import React, { useMemo } from "react";
import Aurora from "@/components/atoms/Aurora/Aurora";
import Title from "@/components/atoms/Title";
import Header from "@/components/molecules/Header";
import Alert from "@/components/atoms/Alert";

const MemoizedAurora = React.memo(Aurora);

export default function Home() {
  const aurora = useMemo(() => <MemoizedAurora />, []);

  return (
    <>
      <Alert />
      <Header />
      {aurora}
      <main>
        <div className="h-[100svh] flex flex-col justify-center text-center items-center">
          <div className="w-full h-2/5 my-4 relative select-none">
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
