"use client";

import React from "react";
import MicroLayout from "@/components/MicroLayout";

const LojinhaSimplesPage: React.FC = () => {
  return (
    <MicroLayout
      projectGitRoute="https://github.com/brcls/lojinha-simples"
      projectHomeRoute="project/lojinha-simples"
    >
      <iframe
        src={process.env.LOJINHA_SIMPLES_URL}
        style={{ height: "100vh", width: "100%", border: "none" }}
        title="Lojinha Simples"
      />
    </MicroLayout>
  );
};

export default LojinhaSimplesPage;
