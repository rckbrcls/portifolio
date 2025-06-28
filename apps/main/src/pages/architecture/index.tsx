import MainLayout from "@/components/MainLayout";
import { AnimatedBeamArchitecture } from "@/components/organisms/AnimatedBeam";
import React from "react";

const ArchitecturePage = () => {
  return (
    <MainLayout>
      <div className="flex h-svh w-full items-center justify-center p-10">
        <AnimatedBeamArchitecture />
      </div>
    </MainLayout>
  );
};

export default ArchitecturePage;
