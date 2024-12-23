import React, { memo } from "react";
import Image from "next/image";
import SubTitle from "@/components/atoms/SubTitle";
import { twMerge } from "tailwind-merge";
import Ororu from "../../../public/images/about-me/ororu.jpg";
import DrawPrimal from "../../../public/images/about-me/primal.png";
import Me from "../../../public/images/about-me/me-and-sea.jpg";
import Rio from "../../../public/images/about-me/pao-de-acucar.jpg";
import { IBox } from "@/interface/IBox";

export const aboutMeBoxes: IBox[] = [
  {
    className: "md:col-span-2",
    text: `As a software engineering professional, 
    I'm driven by innovation and technology's ever-changing landscape. 
    I constantly seek new solutions, ensuring I stay ahead in this dynamic field.`,
    align: "left",
    image: Me,
  },
  {
    className: "md:row-span-2",
    image: Ororu,
    align: "left",
    text: `In my personal life, I cherish Ororu, my affectionate pitbull. Her joyful presence brings me endless happiness and companionship.`,
  },
  {
    className: "md:col-span-2",
    image: DrawPrimal,
    align: "left",
    text: `I'm passionate about both art and sports. Creativity is my outlet for self-expression, while sports help me maintain a healthy balance of mind and body.`,
  },
  {
    className: "md:col-span-3",
    text: `Beyond technology, I love traveling to beaches and natural wonders. Exploring new horizons brings me profound joy and serenity.`,
    align: "left",
    image: Rio,
  },
];

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
