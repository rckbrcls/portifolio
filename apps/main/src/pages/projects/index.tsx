import MainLayout from "@/components/MainLayout";
import ProjectsList from "@/components/templates/ProjectsList";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Footer from "@/components/organisms/Footer";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <ProjectsList />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Footer />
      </motion.div>
    </MainLayout>
  );
};

export default ProjectsPage;
