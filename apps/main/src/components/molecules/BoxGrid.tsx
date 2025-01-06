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
      text: `I'm a software engineer who’s always excited about technology and innovation.  
    I’m constantly exploring new ideas and finding creative solutions to stay ahead in this ever-evolving field.`,
      image: Me,
    },
    {
      className: "md:row-span-2",
      image: Ororu,
      text: `This is Ororu, my affectionate pitbull and adventure buddy.  
    She brightens my days and reminds me that joy often comes from the simplest things.`,
    },
    {
      className: "md:col-span-2",
      image: DrawPrimal,
      text: `When I’m not coding, I’m either drawing or playing sports.  
    Creativity and movement keep my mind sharp and my body energized.`,
    },
    {
      className: "md:col-span-3",
      text: `If I’m away from my computer, I’m probably exploring a beach or getting lost in nature.  
    Traveling recharges me and fuels my inspiration for everything I do.`,
      image: Rio,
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
      {aboutMeBoxes.map(({ className, image, text }, index) => (
        <div
          key={index}
          className={twMerge(
            "glass-dark group flex h-[70svh] items-center overflow-hidden rounded-lg max-md:h-[85svh]",
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
              <SubTitle className="text-left max-md:text-xl">{text}</SubTitle>
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default BoxGrid;
