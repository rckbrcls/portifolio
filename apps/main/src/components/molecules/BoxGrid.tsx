import React, { memo } from "react";
import Image from "next/image";
import SubTitle from "@/components/atoms/SubTitle";
import { twMerge } from "tailwind-merge";
import { IBox } from "@/interface/IBox";

interface BoxGridProps {
  boxes: IBox[];
}

const BoxGrid = memo(({ boxes }: BoxGridProps) => {
  return (
    <div className="grid auto-rows-[70svh] md:grid-cols-3 gap-4 w-full">
      {boxes.map((box, i) => (
        <div
          key={i}
          className={twMerge(
            `flex items-center overflow-hidden
             row-span-1 rounded-lg glass-dark text-start`,
            box.className
          )}
        >
          {/* Renderiza a imagem */}
          {box.image && (
            <div className="w-full h-full relative">
              <Image
                className="select-none"
                src={box.image}
                alt="box-image"
                fill
                style={{ objectFit: "cover", objectPosition: box.align }}
                quality={100}
                loading="lazy"
              />
            </div>
          )}

          {/* Renderiza o texto */}
          {box.text && (
            <SubTitle
              className={`m-6 ${
                box.align === "right"
                  ? "md:text-right"
                  : box.align === "center"
                    ? "md:text-center"
                    : "md:text-left"
              }`}
            >
              {box.text}
            </SubTitle>
          )}
        </div>
      ))}
    </div>
  );
});

export default BoxGrid;
