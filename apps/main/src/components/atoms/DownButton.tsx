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
      className="glass-dark absolute bottom-7 z-20 flex w-min animate-bounce items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-2 transition duration-1000 hover:scale-[1.01] hover:bg-zinc-800 active:scale-95 active:bg-zinc-800"
    >
      <ChevronDown />
      <Text className="text-xs font-semibold md:text-sm">{text}</Text>
    </button>
  );
};
