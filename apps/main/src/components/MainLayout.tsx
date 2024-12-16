import Alert from "@/components/atoms/Alert";
import Header from "@/components/molecules/Header";
import { ReactNode } from "react";
import Aurora from "./atoms/Aurora/Aurora";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Alert />
      <Header />
      <Aurora dark />
      <main>{children}</main>
    </>
  );
}
