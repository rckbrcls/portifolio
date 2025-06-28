import Title from "@/components/atoms/Title";
import MainLayout from "@/components/MainLayout";
import { AnimatedBeamArchitecture } from "@/components/organisms/AnimatedBeam";
import React from "react";

const ArchitecturePage = () => {
  return (
    <MainLayout>
      {/* <Title
        word={"Architecture"}
        gradient
        type="blur"
        className="absolute left-10 top-10"
      /> */}
      <div className="flex h-svh w-full items-center justify-center p-10">
        <AnimatedBeamArchitecture />
      </div>
    </MainLayout>
  );
};

export default ArchitecturePage;
