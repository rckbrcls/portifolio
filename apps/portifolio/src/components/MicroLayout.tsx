import { useRouter } from "next/router";
import { ReactNode } from "react";
import { FaGithub, FaHome } from "react-icons/fa";

interface IProps {
  children: ReactNode;
  projectHomeRoute: string;
  projectGitRoute: string;
}

export default function MicroLayout({
  children,
  projectHomeRoute,
  projectGitRoute,
}: IProps) {
  const router = useRouter();

  return (
    <>
      <main className="flex">
        <div
          className={`p-2 flex flex-col gap-2 fixed h-screen items-center justify-center`}
        >
          <button
            className="p-2 rounded z-50
          hover:scale-105 active:scale-95 duration-500 glass-dark hover:bg-zinc-800
          active:bg-zinc-900 flex items-center gap-2 text-zinc-500 hover:text-zinc-200"
            onClick={() => router.push(projectHomeRoute)}
          >
            <FaHome />
          </button>
          <a
            className="p-2 rounded z-50
          hover:scale-105 active:scale-95 duration-500 glass-dark hover:bg-zinc-800
          active:bg-zinc-900 flex items-center gap-2 text-zinc-500 hover:text-zinc-200"
            href={projectGitRoute}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
        </div>
        {children}
      </main>
    </>
  );
}
