import Alert from "@/components/atoms/Alert";
import Background from "@/components/atoms/Background/Background";
import Header from "@/components/molecules/Header";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Alert />
      <Header />
      <Background />
      <main>{children}</main>
    </>
  );
}
