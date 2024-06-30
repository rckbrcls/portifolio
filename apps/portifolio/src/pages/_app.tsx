import type { AppProps } from "next/app";
import { RouteProvider } from "../contexts/RouteContext";

import "./globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RouteProvider>
      <Component {...pageProps} />
    </RouteProvider>
  );
}
