"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Route } from "next";
import { PiHandWavingFill } from "react-icons/pi";
import { MdComputer } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { RiContactsBook2Fill } from "react-icons/ri";
import { usePathname } from "next/navigation";

interface IHeaderButton {
  path: Route;
  icon: React.ReactNode;
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

  const headerClass = background ? "glass-dark border-none" : "bg-none";

  const routes: IHeaderButton[] = [
    {
      path: "/",
      icon: "👋",
      selected: pathname === "/",
    },
    {
      path: "/projects",
      icon: "💻",
      selected: pathname === "/projects",
    },
    {
      path: "/about-me",
      icon: "🙋🏽‍♂️",
      selected: pathname === "/about-me",
    },
    {
      path: "/contact",
      icon: "✉️",
      selected: pathname === "/contact",
    },
  ];

  return (
    <header
      className={`fixed inset-x-0 z-50 mx-auto mt-4 flex w-min select-none items-center justify-center gap-10 rounded-full px-4 py-2 transition duration-1000 ${headerClass}`}
    >
      {routes.map((route, index) => (
        <Link key={index} href={route.path}>
          <button
            className={`flex items-center rounded-full p-2 duration-500 hover:scale-110 hover:bg-zinc-800 active:scale-95 active:bg-zinc-900 ${route.selected && "bg-zinc-100 text-zinc-950 hover:bg-zinc-300 active:scale-95 active:bg-zinc-300"}`}
          >
            {route.icon}
          </button>
        </Link>
      ))}
    </header>
  );
};

export default Header;
