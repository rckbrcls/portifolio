"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Route } from "next";
import { usePathname } from "next/navigation";

interface IHeaderButton {
  path: Route;
  icon: React.ReactNode;
  name?: string;
  selected?: boolean;
}

const Header = () => {
  const [background, setBackground] = useState(false);
  const pathname = usePathname();

  const handleScroll = () => {
    if (window.scrollY > 40) {
      setBackground(true);
    } else {
      setBackground(false);
    }
  };

  useEffect(() => {
    // Adicionando ouvinte de evento de roda do mouse
    document.addEventListener("wheel", handleScroll);

    // Adicionando ouvinte de evento de rolagem para dispositivos móveis
    document.addEventListener("scroll", handleScroll);

    // Adicionando um ouvinte de evento de redimensionamento da janela para lidar com a posição inicial
    window.addEventListener("resize", handleScroll);

    return () => {
      // Removendo ouvintes de eventos ao desmontar o componente
      document.removeEventListener("wheel", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const headerClass = background
    ? "glass-dark border border-zinc-700/50"
    : "bg-none";

  const routes: IHeaderButton[] = [
    {
      path: "/",
      icon: "👋",
      selected: pathname === "/",
      name: "Home",
    },
    {
      path: "/projects",
      icon: "💻",
      selected: pathname === "/projects",
      name: "Projects",
    },
    {
      path: "/about-me",
      icon: "🙋🏽‍♂️",
      selected: pathname === "/about-me",
      name: "About Me",
    },
    {
      path: "/contact",
      icon: "✉️",
      selected: pathname === "/contact",
      name: "Contact",
    },
  ];

  return (
    <header
      className={`fixed inset-x-0 bottom-4 z-50 mx-auto flex w-min select-none items-center justify-center gap-4 rounded-full border-zinc-700/30 p-1 transition duration-1000 ${headerClass}`}
    >
      {routes.map((route, index) => (
        <Link key={index} href={route.path}>
          <button
            className={`group flex items-center rounded-full px-4 py-1 duration-700 hover:scale-105 hover:bg-zinc-950 active:scale-95 active:bg-zinc-900 ${route.selected && "bg-zinc-100 text-zinc-950 hover:bg-zinc-300 active:scale-95 active:bg-zinc-300"}`}
          >
            <span>{route.icon}</span>
            {route.name && (
              <span
                className={`ml-2 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-700 group-hover:max-w-xs group-hover:opacity-100 max-sm:hidden ${route.selected ? "max-w-xs opacity-100 hover:text-white" : ""}`}
              >
                {route.name}
              </span>
            )}
          </button>
        </Link>
      ))}
    </header>
  );
};

export default Header;
