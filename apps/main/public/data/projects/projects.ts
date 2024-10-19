import { IProject } from "@/interface/IProject";
import { tripperVisualization } from "./tripperVisualization";

export const projects: IProject[] = [
  {
    slug: "tripper",
    description: `An application for creating personalized travel 
    itineraries, developed using Swift and Go, with real-time navigation 
    and user reviews integration.`,
    name: "Tripper",
    techStack: ["Swift", "Go"],
    timeline: null,
    gitLink: "https://github.com/spktrm-io/tripper",
    members: ["Erick Barcelos"],
    projectVisualization: tripperVisualization,
    coverImage: "/images/projects/tripper/splashScreen.png",
    status: "working",
  },
  {
    slug: "alan-turing",
    description: `A comprehensive project created for a course at USP, titled
     ‘Introduction to Computer Theory.’ The site explores the influence of Alan 
     Turing, Stephen Cook, and Noam Chomsky on computational theory, alongside 
     educational content from the course.`,
    name: "Introduction To Computer Theory",
    techStack: ["Solid.js", "TypeScript", "Webpack"],
    timeline: null,
    gitLink:
      "https://github.com/brcls/portifolio-monorepo/tree/main/apps/alan-turing",
    microRoute: process.env.NEXT_PUBLIC_ALAN_TURING_URL as string,
    members: ["Erick Barcelos"],
    coverImage: "/images/projects/alan-turing/alan-turing.png",
    status: "finished",
  },
  {
    slug: "lojinha-simples",
    description: `One of my earliest React projects, a simple store 
    application that utilizes a mock store API. It was developed as a study 
    tool for learning React and API calls.`,
    name: "Simple Little Store",
    techStack: ["React", "TypeScript", "Webpack"],
    timeline: null,
    gitLink:
      "https://github.com/brcls/portifolio-monorepo/tree/main/apps/lojinha-simples",
    microRoute: process.env.NEXT_PUBLIC_LOJINHA_SIMPLES_URL as string,
    members: ["Erick Barcelos"],
    coverImage: "/images/projects/lojinha-simples/lojinha.png",
    status: "finished",
  },
  {
    slug: "dost",
    description: `Monorepo for dost clothing store, powered by Turborepo. 
    It includes a Node.js server, Next.js web client, and React Native mobile 
    app, all streamlined in a single codebase.`,
    name: "dost",
    techStack: [
      "React",
      "React Native",
      "TypeScript",
      "Tailwind",
      "Next.js",
      "Node.js",
      "MongoDB",
    ],
    timeline: null,
    gitLink: "https://github.com/spktrm-io/dost",
    link: "https://dostproject.vercel.app/",
    members: ["Erick Barcelos"],
    coverImage: "/images/projects/dost/SOLID-LOGO-SOLO.svg",
    status: "working",
  },
  {
    slug: "joystick",
    description: `A full-stack mock marketplace for video games, developed as
     part of a course on Introduction to Web Development. The project covers 
     the entire ecosystem from frontend to backend.`,
    name: "Joystick",
    techStack: ["React", "JavaScript", "MongoDB", "Node.js", "Webpack"],
    timeline: null,
    gitLink:
      "https://github.com/brcls/portifolio-monorepo/tree/main/apps/joystick-client",
    members: ["Erick Barcelos"],
    microRoute: process.env.NEXT_PUBLIC_JOYSTICK_URL as string,
    coverImage: "/images/projects/joystick/home.png",
    status: "finished",
  },
  {
    slug: "secret-santa",
    description: `A Secret Santa system where participants’ names and emails 
    are entered, and then a random draw is conducted. 
    Each participant receives an email revealing their Secret Santa match.`,
    name: "Secret Santa",
    techStack: ["React", "JavaScript", "MongoDB", "Node.js", "Webpack"],
    timeline: null,
    gitLink:
      "https://github.com/brcls/portifolio-monorepo/tree/main/apps/secret-santa-client",
    members: ["Erick Barcelos"],
    microRoute: process.env.NEXT_PUBLIC_SECRET_SANTA_URL as string,
    coverImage: "/images/projects/secret-santa/home.png",
    status: "finished",
  },
  {
    slug: "video-project-manage",
    description: `A simulator for a video/film production company’s management 
    system, where clients and projects are handled, and all administrative 
    tasks are managed.`,
    name: "Video Project Manage",
    techStack: ["React", "JavaScript", "Webpack"],
    timeline: null,
    gitLink:
      "https://github.com/brcls/portifolio-monorepo/tree/main/apps/video-project-manage",
    members: ["Erick Barcelos"],
    microRoute: process.env.NEXT_PUBLIC_VIDEO_PROJECT_MANAGE_URL as string,
    coverImage: "/images/projects/video-project-manage/home.png",
    status: "finished",
  },
  {
    slug: "electoral-system",
    description: `A system developed for a Database course, designed to manage 
    electoral candidates, including their political and candidacy information. 
    The project was created to study SQL, its queries, triggers, and other 
    database-related topics`,
    name: "Electoral System",
    techStack: [
      "Solid.js",
      "TypeScript",
      "Python",
      "Flask",
      "Webpack",
      "PostgreSQL",
    ],
    timeline: null,
    gitLink:
      "https://github.com/brcls/portifolio-monorepo/tree/main/apps/electoral-system-client",
    members: ["Erick Barcelos"],
    microRoute: process.env.NEXT_PUBLIC_ELECTORAL_SYSTEM_URL as string,
    coverImage: "/images/projects/electoral-system/home.png",
    status: "finished",
  },
  {
    slug: "rgbwallet",
    description: `An internal project developed at ICMC Junior (USP’s Junior 
    Enterprise) for managing the wallet balances of the company’s participants, 
    with each member having their own account balance`,
    name: "RGBWallet",
    techStack: [
      "React",
      "JavaScript",
      "MongoDB",
      "Node.js",
      "Webpack",
      "Webpack",
    ],
    timeline: null,
    gitLink:
      "https://github.com/brcls/portifolio-monorepo/tree/main/apps/rgbwallet",
    members: ["Erick Barcelos"],
    microRoute: "/rgbwallet",
    coverImage: "/images/projects/rgbwallet/rgbwallet-logo.png",
    status: "finished",
  },
  {
    slug: "guit",
    description: `GUI tool to facilitate GitFlow with support for conventional commits, built with Rust.`,
    name: "GUIT",
    techStack: ["Rust"],
    timeline: null,
    gitLink: "https://github.com/spktrm-io/guit",
    members: ["Erick Barcelos"],
    coverImage: "/images/projects/guit/guit-logo.png",
    status: "working",
  },
  {
    slug: "barter",
    description: `A gamified bartering application where users can trade goods
     and services, customize avatars, earn rewards, and engage with the 
     community. Developed with Flutter, Deno and Go.`,
    name: "Barter",
    techStack: ["Flutter", "Deno", "Go"],
    timeline: null,
    gitLink: "https://github.com/spktrm-io/barter",
    members: ["Erick Barcelos"],
    coverImage: "/images/projects/barter/barter.webp",
    status: "designing",
  },
  {
    slug: "spktrm",
    description: `spktrm institutional website made in Svelte and Bun`,
    name: "spktrm",
    techStack: ["Svelte", "Bun"],
    timeline: null,
    gitLink: "https://github.com/spktrm-io/spktrm-web",
    members: ["Erick Barcelos"],
    coverImage: "/images/projects/spktrm/ghostspktrmblack.png",
    status: "designing",
  },
  {
    slug: "souvenir",
    description: `ML-powered photo app with advanced editing and organization features, built with Swift and Python.`,
    name: "Souvenir",
    techStack: ["Swift", "Python"],
    timeline: null,
    gitLink: "https://github.com/spktrm-io/souvenir",
    members: ["Erick Barcelos"],
    coverImage: "/images/projects/souvenir/souvenir-logo.png",
    status: "working",
  },
];
