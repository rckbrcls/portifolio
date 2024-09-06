"use client";

import React from "react";
import MicroLayout from "@/components/MicroLayout";

const SecretSantaPage: React.FC = () => {
  return (
    <MicroLayout
      projectGitRoute="https://github.com/brcls/secret-santa"
      projectHomeRoute="project/secret-santa"
    >
      <iframe
        src={process.env.SECRET_SANTA_URL}
        style={{ height: "100vh", width: "100%", border: "none" }}
        title="Secret Santa"
      />
    </MicroLayout>
  );
};

export default SecretSantaPage;
