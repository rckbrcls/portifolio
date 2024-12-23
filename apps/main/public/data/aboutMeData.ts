// data/aboutMeData.ts
import Ororu from "../images/about-me/ororu.jpg";
import DrawPrimal from "../images/about-me/primal.png";
import Me from "../images/about-me/me-and-sea.jpg";
import Rio from "../images/about-me/pao-de-acucar.jpg";
import { IBox } from "@/interface/IBox";

export const aboutMeBoxes: IBox[] = [
  {
    className: "col-span-2",
    text: `As a software engineering professional, 
    I'm driven by innovation and technology's ever-changing landscape. 
    I constantly seek new solutions, ensuring I stay ahead in this dynamic field.`,
    align: "left",
    image: Me,
  },
  {
    className: "row-span-2",
    image: Ororu,
    align: "left",
    text: `In my personal life, I cherish Ororu, my affectionate pitbull. Her joyful presence brings me endless happiness and companionship.`,
  },
  {
    className: "col-span-2",
    image: DrawPrimal,
    align: "left",
    text: `I'm passionate about both art and sports. Creativity is my outlet for self-expression, while sports help me maintain a healthy balance of mind and body.`,
  },
  {
    className: "col-span-2",
    text: `Beyond technology, I love traveling to beaches and natural wonders. Exploring new horizons brings me profound joy and serenity.`,
    align: "left",
    image: Rio,
  },
];
