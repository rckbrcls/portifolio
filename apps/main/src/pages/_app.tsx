import type { AppProps } from "next/app";

import "./globals.css";
import Aurora from "@/components/atoms/Aurora";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Aurora dark />
      <Component {...pageProps} />
    </>
  );
}
