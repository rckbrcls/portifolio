import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Alert from "@/components/atoms/Alert";
import Background from "@/components/atoms/Background/Background";
import Header from "@/components/molecules/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Alert />
      <Header />
      <Background />
      <Component {...pageProps} />
    </>
  );
}
