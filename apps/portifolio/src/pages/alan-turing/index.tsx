"use client";

import React from "react";
import MicroLayout from "@/components/MicroLayout";

const AlanTuringPage: React.FC = () => {
  return (
    <MicroLayout projectGitRoute="" projectHomeRoute="/project/alan-turing">
      <iframe
        src="http://localhost:3002"
        style={{ height: "100vh", width: "100vw", border: "none" }}
        title="Alan Turing"
      />
    </MicroLayout>
  );
};

export default AlanTuringPage;
