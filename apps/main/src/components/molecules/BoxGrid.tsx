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
    text: `As a software engineering professional, 
    I'm driven by innovation and technology's ever-changing landscape. 
    I constantly seek new solutions, ensuring I stay ahead in this dynamic field.`,
    image: Me,
  },
  {
    className: "md:row-span-2",
    image: Ororu,
    text: `In my personal life, I cherish Ororu, my affectionate pitbull. Her joyful presence brings me endless happiness and companionship.`,
  },
  {
    className: "md:col-span-2",
    image: DrawPrimal,
    text: `I'm passionate about both art and sports. Creativity is my outlet for self-expression, while sports help me maintain a healthy balance of mind and body.`,
  },
  {
    className: "md:col-span-3",
    text: `Beyond technology, I love traveling to beaches and natural wonders. Exploring new horizons brings me profound joy and serenity.`,
    image: Rio,
  },
];

const BoxGrid = memo(() => (
  <div className="grid w-full gap-4 md:grid-cols-3">
    {aboutMeBoxes.map(({ className, image, text }, index) => (
      <div
        key={index}
        className={twMerge(
          "glass-dark flex h-[70svh] items-center overflow-hidden rounded-lg",
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
