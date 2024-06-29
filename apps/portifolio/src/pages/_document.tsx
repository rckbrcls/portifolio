import Alert from "@/components/atoms/Alert";
import Background from "@/components/atoms/Background/Background";
import Header from "@/components/molecules/Header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Alert />
        <Header />
        <Background />
      </body>
    </Html>
  );
}
