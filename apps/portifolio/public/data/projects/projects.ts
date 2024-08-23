import { IProject } from "@/interface/IProject";
import { tripperVisualization } from "./tripperVisualization";

export const projects: IProject[] = [
  {
    slug: "tripper",
    description: `Tripper is a React Native application designed to showcase routes for road trips that traverse scenic
                  landscapes, restaurants, or tourist attractions. Users have the ability to create and share their own routes, with
                  the added feature of voting on routes to elevate their visibility within the community.`,
    name: "Tripper",
    techStack: ["React Native", "TypeScript"],
    timeline: null,
    gitLink: "https://github.com/brcls/tripper",
    members: ["Erick Barcelos"],
    projectVisualization: tripperVisualization,
    coverImage: "/images/projects/tripper/splashScreen.png",
  },
  {
    slug: "alan-turing",
    description: `Tripper is a React Native application designed to showcase routes for road trips that traverse scenic
                  landscapes, restaurants, or tourist attractions. Users have the ability to create and share their own routes, with
                  the added feature of voting on routes to elevate their visibility within the community.`,
    name: "Introduction To Computer Theory",
    techStack: ["React", "TypeScript", "Webpack"],
    timeline: null,
    gitLink: "https://github.com/brcls/alan-turing",
    microRoute: "/alan-turing",
    members: ["Erick Barcelos"],
    coverImage: "/images/projects/alan-turing/alan-turing.png",
  },
  {
    slug: "lojinha-simples",
    description: `Tripper is a React Native application designed to showcase routes for road trips that traverse scenic
                  landscapes, restaurants, or tourist attractions. Users have the ability to create and share their own routes, with
                  the added feature of voting on routes to elevate their visibility within the community.`,
    name: "Simple Little Store",
    techStack: ["React", "TypeScript", "Webpack"],
    timeline: null,
    gitLink: "https://github.com/brcls/lojinha-simples",
    microRoute: "/lojinha-simples",
    members: ["Erick Barcelos"],
    coverImage: "/images/projects/lojinha-simples/lojinha.png",
  },
  {
    slug: "dost",
    description: `Tripper is a React Native application designed to showcase routes for road trips that traverse scenic
                  landscapes, restaurants, or tourist attractions. Users have the ability to create and share their own routes, with
                  the added feature of voting on routes to elevate their visibility within the community.`,
    name: "dost",
    techStack: ["React", "TypeScript", "Tailwind", "Next.js"],
    timeline: null,
    link: "https://dostproject.vercel.app/",
    members: ["Erick Barcelos"],
    projectVisualization: tripperVisualization,
    coverImage: "/images/projects/dost/dostHome.png",
  },
  {
    slug: "joystick",
    description: `Tripper is a React Native application designed to showcase routes for road trips that traverse scenic
                  landscapes, restaurants, or tourist attractions. Users have the ability to create and share their own routes, with
                  the added feature of voting on routes to elevate their visibility within the community.`,
    name: "Joystick",
    techStack: ["React", "JavaScript", "MongoDB", "Node.js"],
    timeline: null,
    gitLink: "https://github.com/brcls/joystick",
    members: ["Erick Barcelos"],
    microRoute: "/joystick",
    coverImage: "/images/projects/joystick/home.png",
  },
  {
    slug: "secret-santa",
    description: `Tripper is a React Native application designed to showcase routes for road trips that traverse scenic
                  landscapes, restaurants, or tourist attractions. Users have the ability to create and share their own routes, with
                  the added feature of voting on routes to elevate their visibility within the community.`,
    name: "Secret Santa",
    techStack: ["React", "JavaScript", "MongoDB", "Node.js"],
    timeline: null,
    gitLink: "https://github.com/brcls/secret-santa",
    members: ["Erick Barcelos"],
    microRoute: "/secret-santa",
    coverImage: "/images/projects/secret-santa/home.png",
  },
];
