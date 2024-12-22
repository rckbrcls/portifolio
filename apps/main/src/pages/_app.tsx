import type { AppProps } from "next/app";

import "./globals.css";
import Aurora from "@/components/molecules/Aurora";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Aurora dark />
      <SpeedInsights />
      <Component {...pageProps} />
    </>
  );
}
