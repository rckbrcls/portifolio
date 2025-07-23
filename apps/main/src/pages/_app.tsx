import type { AppProps } from "next/app";

import "./globals.css";
import "../styles/animations.css";
import Aurora from "@/components/molecules/Aurora";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>rckbrcls</title>
        <meta
          name="description"
          content="A portfolio showcasing innovative web development projects, cutting-edge applications, and creative solutions. Explore my work in frontend, backend, and full-stack development."
        />
      </Head>

      <SpeedInsights />
      <Component {...pageProps} />
    </>
  );
}
