import React, { memo } from "react";
import Image from "next/image";
import SubTitle from "@/components/atoms/SubTitle";
import { twMerge } from "tailwind-merge";
import Ororu from "../../../public/images/about-me/ororu.jpg";
import DrawPrimal from "../../../public/images/about-me/primal.png";
import Me from "../../../public/images/about-me/me-and-sea.jpg";
import Rio from "../../../public/images/about-me/pao-de-acucar.jpg";
import { IBox } from "@/interface/IBox";

const BoxGrid = memo(() => {
  const aboutMeBoxes: IBox[] = [
    {
      className: "md:col-span-2",
      text: `Curiosity drives my code. I love experimenting, learning, and building projects that solve real problems.`,
      image: Me,
    },
    {
      className: "md:row-span-2",
      image: Ororu,
      text: `This is Ororu, my pitbull and adventure buddy. She reminds me that happiness is found in the simplest things.`,
    },
    {
      className: "md:col-span-2",
      image: DrawPrimal,
      text: `When I'm not coding, I'm drawing or playing sports. Creativity and movement keep me inspired.`,
    },
    {
      className: "md:col-span-3",
      text: `If I'm away from my computer, I'm probably exploring beaches or enjoying nature. Traveling recharges my energy and inspires everything I do.`,
      image: Rio,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      {aboutMeBoxes.map(({ className, image, text }, index) => (
        <div
          key={index}
          className={twMerge(
            `glass-dark group flex min-h-[70svh] items-center overflow-hidden rounded-3xl border-2 border-transparent transition-all duration-300 ${index % 2 === 0 ? "border-purple-500/20 hover:border-purple-400/40" : "border-pink-500/20 hover:border-pink-400/40"} max-md:h-[85svh]`,
            className,
          )}
        >
          {image && (
            <div className="relative h-full w-full">
              <Image
                className="select-none"
                src={image}
                alt="box-image"
                fill
                style={{ objectFit: "cover", objectPosition: "left" }}
                quality={100}
                loading="lazy"
              />
            </div>
          )}

          {text && (
            <div className="absolute -bottom-2 w-full bg-gradient-to-t from-black via-zinc-950/85 to-transparent p-10 pb-12 transition duration-500 group-hover:-translate-y-2 max-md:p-5 max-md:pb-7">
              <SubTitle className="text-left max-md:text-xl md:text-3xl">
                {text}
              </SubTitle>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default BoxGrid;
