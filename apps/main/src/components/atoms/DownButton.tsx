import React from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";

export const DownButton = () => {
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
    <FaArrowAltCircleDown
      size={40}
      className="mt-10 cursor-pointer transition duration-500 hover:scale-125"
      onClick={onDownButtonClick}
    />
  );
};
