import MainLayout from "@/components/MainLayout";
import ProjectsList from "@/components/templates/ProjectsList";
import Head from "next/head";
import React from "react";

const ProjectsPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>Projects | rckbrcls</title>
      </Head>
      <ProjectsList />
    </MainLayout>
  );
};

export default ProjectsPage;
