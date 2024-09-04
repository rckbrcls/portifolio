"use client";

import React from "react";
import MicroLayout from "@/components/MicroLayout";

const AlanTuringPage: React.FC = () => {
  return (
    <MicroLayout projectGitRoute="" projectHomeRoute="/project/alan-turing">
      <iframe
        src="https://portifolio-monorepo.vercel.app/alan-turing"
        style={{ height: "100vh", width: "100vw", border: "none" }}
        title="Alan Turing"
      />
    </MicroLayout>
  );
};

export default AlanTuringPage;
