import { ChevronLeft } from "lucide-react";
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
        <div className={`fixed inset-y-1/2 flex flex-col gap-2 p-2`}>
          <button
            className="glass-dark z-50 flex items-center justify-center gap-2 rounded-lg p-2 text-zinc-500 duration-500 hover:scale-105 hover:bg-zinc-800 hover:text-zinc-200 active:scale-95 active:bg-zinc-900"
            onClick={() => {
              router.push("/projects");
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <a
            className="glass-dark z-50 flex items-center justify-center gap-2 rounded-lg p-2 text-zinc-500 duration-500 hover:scale-105 hover:bg-zinc-800 hover:text-zinc-200 active:scale-95 active:bg-zinc-900"
            href={projectGitRoute}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={20} />
          </a>
        </div>
        {children}
      </main>
    </>
  );
}
