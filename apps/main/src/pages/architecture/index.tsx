import Image from "next/image";
import React from "react";
import Head from "next/head";
import Aurora from "@/components/molecules/Aurora";
import Title from "@/components/atoms/Title";
import Header from "@/components/organisms/Header";
import { ArchitectureContainer } from "@/components/organisms/ArchitectureContainer";

export default function Graph() {
  return (
    <>
      <Head>
        <title>Microfrontend! | rckbrcls</title>
      </Head>

      <Aurora dark>
        <Header />
        <ArchitectureContainer />
      </Aurora>
    </>
  );
}
