import React, { memo } from "react";
import Image from "next/image";
import SubTitle from "@/components/atoms/SubTitle";
import { twMerge } from "tailwind-merge";
import { aboutMeBoxes } from "../../../public/data/aboutMeData";

const BoxGrid = memo(() => {
  console.log(aboutMeBoxes);
  return (
    <div className="grid w-full auto-rows-[70svh] gap-4 md:grid-cols-3">
      {aboutMeBoxes.map((box, i) => (
        <div
          key={i}
          className={twMerge(
            `glass-dark flex items-center overflow-hidden rounded-lg text-start`,
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
            <div className="absolute mt-auto flex h-full w-full items-end justify-center">
              <SubTitle
                className={`bg-gradient-to-t from-black via-zinc-950/85 to-transparent p-10 ${
                  box.align === "right"
                    ? "md:text-right"
                    : box.align === "center"
                      ? "md:text-center"
                      : "md:text-left"
                }`}
              >
                {box.text}
              </SubTitle>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default BoxGrid;
