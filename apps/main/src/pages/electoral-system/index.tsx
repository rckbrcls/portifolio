"use client";

import React from "react";
import MicroLayout from "@/components/MicroLayout";

const VideoProjectManagePage: React.FC = () => {
  return (
    <MicroLayout
      projectGitRoute="https://github.com/brcls/electoral-system"
      projectHomeRoute="project/electoral-system"
    >
      <iframe
        src={process.env.NEXT_PUBLIC_ELECTORAL_SYSTEM_URL}
        style={{ height: "100vh", width: "100%", border: "none" }}
        title="Electoral-system"
      />
    </MicroLayout>
  );
};

export default VideoProjectManagePage;
