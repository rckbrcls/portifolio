"use client";

import React from "react";
import MicroLayout from "@/components/MicroLayout";

const VideoProjectManagePage: React.FC = () => {
  return (
    <MicroLayout
      projectGitRoute="https://github.com/brcls/video-project-manage"
      projectHomeRoute="project/video-project-manage"
    >
      <iframe
        src="http://localhost:3005"
        style={{ height: "100vh", width: "100%", border: "none" }}
        title="Video-project-manage"
      />
    </MicroLayout>
  );
};

export default VideoProjectManagePage;
