import Alert from "@/components/molecules/Alert";
import Header from "@/components/organisms/Header";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Alert />
      <Header />
      <main>{children}</main>
    </>
  );
}
