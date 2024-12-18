// data/aboutMeData.ts
import Ororu from "../images/about-me/ororu.jpg";
import OroruLaid from "../images/about-me/ororu-laid.png";
import Draw2D from "../images/about-me/2D.png";
import DrawPrimal from "../images/about-me/primal.png";
import Sea from "../images/about-me/sea.jpg";
import Me from "../images/about-me/me-and-sea.jpg";
import Rio from "../images/about-me/pao-de-acucar.jpg";
import { IBox } from "@/interface/IBox";

export const aboutMeBoxes: IBox[] = [
  {
    className: "md:col-span-2",
    text: `As a software engineering professional, 
    I'm driven by innovation and technology's ever-changing landscape. 
    I constantly seek new solutions, ensuring I stay ahead in this dynamic field.`,
  },
  { className: "md:col-span-1", image: Me, align: "left" },
  { className: "md:row-span-2", image: Sea, align: "left" },
  {
    className: "md:col-span-2",
    text: `I'm passionate about both art and sports. Creativity is my outlet for self-expression, while sports help me maintain a healthy balance of mind and body.`,
    align: "right",
  },
  { className: "md:col-span-2", image: DrawPrimal, align: "bottom" },
  {
    className: "md:col-span-2",
    text: `In my personal life, I cherish Ororu, my affectionate pitbull. Her joyful presence brings me endless happiness and companionship.`,
  },
  { className: "md:col-span-1", image: Ororu },
  { className: "md:col-span-1", image: Draw2D },
  {
    className: "md:col-span-2",
    text: `Beyond technology, I love traveling to beaches and natural wonders. Exploring new horizons brings me profound joy and serenity.`,
    align: "right",
  },
  { className: "md:col-span-2", image: Rio },
  { className: "md:col-span-1", image: OroruLaid },
];
