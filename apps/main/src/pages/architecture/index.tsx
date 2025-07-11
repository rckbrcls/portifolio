import Title from "@/components/atoms/Title";
import MainLayout from "@/components/MainLayout";
import { ArchitectureContainer } from "@/components/organisms/ArchitectureContainer";
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
        <ArchitectureContainer />
      </div>
    </MainLayout>
  );
};

export default ArchitecturePage;
