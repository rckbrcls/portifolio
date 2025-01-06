import React from "react";

import { Text } from "./Text";
import { ChevronDown } from "lucide-react";

interface IProps {
  text: string;
}

export const DownButton = ({ text }: IProps) => {
  const onDownButtonClick = () => {
    let pageHeight = window.innerHeight;
    let currentScroll = window.scrollY;

    let nextPosition =
      currentScroll === 0
        ? pageHeight
        : Math.ceil(currentScroll / pageHeight) * pageHeight;

    window.scrollTo({ top: nextPosition, behavior: "smooth" });
  };

  return (
    <button
      onClick={onDownButtonClick}
      className="glass-dark flex h-16 w-full items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-2 font-black transition duration-700 hover:scale-[1.01] hover:bg-zinc-800 active:scale-95 active:bg-zinc-800 md:w-1/4"
    >
      <ChevronDown />
      <Text>{text}</Text>
    </button>
  );
};
