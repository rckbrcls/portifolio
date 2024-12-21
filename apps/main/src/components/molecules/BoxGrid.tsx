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
    <div className="grid w-full auto-rows-[70svh] gap-4 md:grid-cols-3">
      {boxes.map((box, i) => (
        <div
          key={i}
          className={twMerge(
            `glass-dark row-span-1 flex items-center overflow-hidden rounded-lg text-start`,
            box.className,
          )}
        >
          {/* Renderiza a imagem */}
          {box.image && (
            <div className="relative h-full w-full">
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
