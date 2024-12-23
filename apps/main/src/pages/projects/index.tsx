import MainLayout from "@/components/MainLayout";
import ProjectsList from "@/components/templates/ProjectsList";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ProjectsPage = () => {
  const router = useRouter();

  useEffect(() => {
    const restoreScroll = () => {
      const savedPosition = sessionStorage.getItem("projectsScroll");
      if (savedPosition !== null) {
        window.scrollTo(0, parseInt(savedPosition, 10));
        sessionStorage.removeItem("projectsScroll"); // Limpa após restaurar
      }
    };

    restoreScroll();
    // Restaura quando a página é carregada novamente (após router.back)
    router.events.on("routeChangeComplete", restoreScroll);

    return () => {
      router.events.off("routeChangeComplete", restoreScroll);
    };
  }, [router]);

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
