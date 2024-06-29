"use client";

import React from "react";
import MicroLayout from "@/components/MicroLayout";

const LojinhaSimplesPage: React.FC = () => {
  return (
    <MicroLayout>
      <iframe
        src="http://localhost:3001"
        style={{ height: "100vh", width: "100vw", border: "none" }}
        title="Lojinha Simples"
      />
    </MicroLayout>
  );
};

export default LojinhaSimplesPage;
