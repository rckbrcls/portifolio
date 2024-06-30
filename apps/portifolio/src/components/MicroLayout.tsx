import { useRouter } from "next/router";
import { ReactNode } from "react";
import { FaChevronLeft } from "react-icons/fa";
import useSaveAndRedirect from "../hooks/useSaveAndRedirect";

export default function MicroLayout({ children }: { children: ReactNode }) {
  const { redirectToSavedRoute } = useSaveAndRedirect();

  return (
    <>
      <button
        className="fixed left-4 top-4 py-2 px-6 rounded-full z-50
        hover:scale-105 active:scale-95 duration-500 glass-dark hover:bg-zinc-800
        active:bg-zinc-900 flex items-center gap-2 text-zinc-500 hover:text-zinc-200"
        onClick={redirectToSavedRoute}
      >
        <FaChevronLeft /> Return
      </button>
      <main>{children}</main>
    </>
  );
}
