import Link from "next/link";
import { ReactNode } from "react";

export default function MicroLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Link passHref href={"/"}>
        <button
          className="fixed right-4 bottom-4 py-2 px-6 rounded-full z-50
        hover:scale-105 active:scale-95 duration-500 glass-dark hover:bg-zinc-800
        active:bg-zinc-900 flex items-center gap-2 text-zinc-500 hover:text-zinc-200"
        >
          return to portifolio
        </button>
      </Link>
      <main>{children}</main>
    </>
  );
}
