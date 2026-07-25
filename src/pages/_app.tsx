import type { AppProps } from "next/app";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GeistPixelSquare } from "geist/font/pixel";
import { ThemeProvider } from "next-themes";

import "katex/dist/katex.min.css";
import "./globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>rckbrcls | Portfolio</title>
        <meta
          name="description"
          content="Software engineer focused on backend and distributed systems, building reliable software and useful products."
        />
      </Head>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="theme"
        themes={["light", "dark"]}
      >
        <div className={GeistPixelSquare.className}>
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
