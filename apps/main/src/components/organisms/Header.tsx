"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Route } from "next";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface IHeaderButton {
  path: Route;
  icon: React.ReactNode;
  name?: string;
  selected?: boolean;
}

const Header = () => {
  const pathname = usePathname();

  const routes: IHeaderButton[] = [
    {
      path: "/",
      icon: "👋",
      selected: pathname === "/",
      name: "Hello!",
    },
    {
      path: "/projects",
      icon: "🚀",
      selected: pathname === "/projects",
      name: "Projects",
    },
    {
      path: "/about-me",
      icon: "🧑‍💻",
      selected: pathname === "/about-me",
      name: "About Me",
    },
    {
      path: "/contact",
      icon: "📬",
      selected: pathname === "/contact",
      name: "Contact",
    },
  ];

  return (
    <header
      className={cn(
        `glass-dark group absolute bottom-4 z-50 flex w-min select-none flex-col items-start justify-center gap-4 rounded-3xl border-zinc-700/30 p-4 transition duration-700`,
      )}
    >
      {routes.map((route, index) => (
        <Link
          className={cn(
            `flex w-full items-center rounded-full px-2 py-1 duration-700 hover:scale-105 hover:bg-zinc-800 active:scale-95 active:bg-zinc-900`,
            route.selected &&
              "bg-zinc-100 text-zinc-950 hover:bg-zinc-300 active:scale-95 active:bg-zinc-300",
          )}
          key={index}
          href={route.path}
        >
          <span>{route.icon}</span>
          <span
            className={cn(
              `max-w-0 overflow-hidden whitespace-nowrap text-xs font-bold opacity-0 transition-all duration-700 group-hover:ml-2 group-hover:max-w-xs group-hover:opacity-100 max-sm:hidden`,
            )}
          >
            {route.name}
          </span>
        </Link>
      ))}
    </header>
  );
};

export default Header;
