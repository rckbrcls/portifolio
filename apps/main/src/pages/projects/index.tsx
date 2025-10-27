import ProjectsList from "@/components/templates/ProjectsList";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Aurora from "@/components/molecules/Aurora";
import Header from "@/components/organisms/Header";

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

    router.events.on("routeChangeComplete", restoreScroll);

    return () => {
      router.events.off("routeChangeComplete", restoreScroll);
    };
  }, [router]);

  return (
    <div>
      <Head>
        <title>Projects | rckbrcls</title>
      </Head>

      <Aurora dark>
        <Header />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ProjectsList />
        </motion.div>
      </Aurora>
    </div>
  );
};

export default ProjectsPage;
