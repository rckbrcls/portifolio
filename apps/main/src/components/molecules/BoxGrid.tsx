import React, { memo } from "react";
import Image from "next/image";
import SubTitle from "@/components/atoms/SubTitle";
import { twMerge } from "tailwind-merge";
import Ororu from "../../../public/images/about-me/ororu.jpg";
import DrawPrimal from "../../../public/images/about-me/primal.png";
import Me from "../../../public/images/about-me/me-and-sea.jpg";
import Rio from "../../../public/images/about-me/pao-de-acucar.jpg";
import { IBox } from "@/interface/IBox";

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
const BoxGrid = memo(() => (
  <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
    {aboutMeBoxes.map(({ className, image, text }, index) => (
      <div
        key={index}
        className={twMerge(
          "glass-dark flex min-h-[70svh] items-center overflow-hidden rounded-lg",
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
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-zinc-950/85 to-transparent p-10">
            <SubTitle className="text-left">{text}</SubTitle>
          </div>
        )}
      </div>
    ))}
  </div>
));

export default BoxGrid;
