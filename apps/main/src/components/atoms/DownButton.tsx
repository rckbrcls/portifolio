import React from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";

export const DownButton = () => {
  const onDownButtonClick = () => {
    let pageHeight = window.innerHeight;
    window.scrollBy({ left: 0, top: pageHeight, behavior: "smooth" });
  };
  return (
    <FaArrowAltCircleDown
      size={30}
      className="absolute bottom-10 cursor-pointer transition duration-500 hover:scale-110"
      onClick={onDownButtonClick}
    />
  );
};
