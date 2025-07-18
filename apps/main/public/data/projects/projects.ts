import { IProject } from "@/interface/IProject";

export const projects: IProject[] = [
  {
    slug: "polterware",
    description: `Website for my software studio, Polterware, created to showcase
     my most solid, robust, and professional personal projects.`,
    name: "polterware",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind"],
    timeline: null,
    link: "https://polterware.com",
    members: ["Erick Barcelos"],
    coverImage: "/images/projects/polterware/polterware.png",
    status: "finished",
  },
  {
    slug: "dost",
    description: `Dost is a clothing store platform with a Next.js web client 
    and a Node.js server hosted on AWS EC2. It uses MongoDB as the main database, 
    leverages Amazon SES for transactional emails, and Redis for caching and 
    session management. The mobile version (React Native) is currently under development.`,
    name: "dost",
    techStack: [
      "React",
      "React Native",
      "TypeScript",
      "Tailwind",
      "Next.js",
      "Node.js",
      "MongoDB",
      "AWS",
      "Redis",
    ],
    timeline: null,
    link: "https://dostproject.vercel.app/",
    members: ["Erick Barcelos"],
    coverImage: "/images/projects/dost/SOLID-LOGO-SOLO.svg",
    status: "working",
  },
  {
    slug: "alan-turing",
    description: `A comprehensive project created for a course at USP, titled
     ‘Introduction to Computer Theory.’ The site explores the influence of Alan 
     Turing, Stephen Cook, and Noam Chomsky on computational theory, alongside 
     educational content from the course.`,
    name: "Computer Theory",
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
    slug: "secret-santa",
    description: `A Secret Santa system where participants’ names and emails 
    are entered, and then a random draw is conducted. 
    Each participant receives an email revealing their Secret Santa match.`,
    name: "Secret Santa",
    techStack: ["React", "JavaScript", "MongoDB", "Node.js", "Webpack"],
    timeline: null,
    gitLink:
      "https://github.com/brcls/portifolio-monorepo/tree/main/apps/secret-santa",
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
      "https://github.com/brcls/portifolio-monorepo/tree/main/apps/electoral-system",
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
    slug: "liga-academica",
    description: `Institutional website for the Academic League of Psychiatry, developed with Next.js and TypeScript. The site provides information on events, activities, and educational materials for students and professionals interested in mental health.`,
    name: "Liga Acadêmica de Psiquiatria",
    techStack: ["Next.js", "React", "TypeScript"],
    timeline: null,
    gitLink: "https://github.com/rckbrcls/academic-league-of-psychiatry",
    microRoute: process.env.NEXT_PUBLIC_LIGA_URL as string,
    members: ["Erick Barcelos"],
    coverImage: "/images/projects/liga-academica/liga.png",
    status: "finished",
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
      "https://github.com/brcls/portifolio-monorepo/tree/main/apps/joystick",
    members: ["Erick Barcelos"],
    microRoute: process.env.NEXT_PUBLIC_JOYSTICK_URL as string,
    coverImage: "",
    status: "finished",
  },
  // {
  //   slug: "tagit",
  //   description: `GUI tool to facilitate GitFlow with support for conventional commits, built with Rust.`,
  //   name: "TAGIT",
  //   techStack: ["Rust"],
  //   timeline: null,
  //   gitLink: "https://github.com/polterware/tagit",
  //   members: ["Erick Barcelos"],
  //   coverImage: "/images/projects/tagit/tagit-logo.png",
  //   status: "working",
  // },
  // {
  //   slug: "barter",
  //   description: `A gamified bartering application where users can trade goods
  //    and services, customize avatars, earn rewards, and engage with the
  //    community. Developed with Flutter, Deno and Go.`,
  //   name: "Barter",
  //   techStack: ["Flutter", "Dart", "Deno", "Go"],
  //   timeline: null,
  //   gitLink: "https://github.com/polterware/barter",
  //   members: ["Erick Barcelos"],
  //   coverImage: "/images/projects/barter/barter.webp",
  //   status: "designing",
  // },

  // {
  //   slug: "souvenir",
  //   description: `ML-powered photo app with advanced editing and organization features, built with Swift and Python.`,
  //   name: "Souvenir",
  //   techStack: ["Swift", "Python"],
  //   timeline: null,
  //   gitLink: "https://github.com/polterware/souvenir",
  //   members: ["Erick Barcelos"],
  //   coverImage: "/images/projects/souvenir/souvenir-logo.png",
  //   status: "working",
  // },
  // {
  //   slug: "tripper",
  //   description: `An application for creating personalized travel
  //   itineraries, developed using Swift and Go, with real-time navigation
  //   and user reviews integration.`,
  //   name: "Tripper",
  //   techStack: ["Swift", "Go"],
  //   timeline: null,
  //   gitLink: "https://github.com/polterware/tripper",
  //   members: ["Erick Barcelos"],
  //   coverImage: "/images/projects/tripper/splashScreen.png",
  //   status: "working",
  // },
];
