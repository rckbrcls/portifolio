import type { LabProduct } from "@/interface/ILabProduct";

export const labProducts: LabProduct[] = [
  {
    slug: "duplizen",
    order: 1,
    name: "Duplizen",
    productType: "Game",
    summary:
      "A browser party game I made so friends could play impostor from their own phones.",
    icon: "/images/labs/duplizen/app-icon.png",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Zustand",
    ],
    actions: [
      {
        type: "project",
        href: "https://duplizen.erickbarcelos.com",
      },
    ],
  },
  {
    slug: "sparky",
    order: 2,
    name: "Sparky",
    productType: "Productivity",
    summary:
      "A local-first macOS app I built for myself: ideas, reminders, and focus sessions without an account.",
    icon: "/images/labs/sparky/app-icon.png",
    technologies: ["Swift", "SwiftUI", "SwiftData", "Sparkle"],
    actions: [
      {
        type: "download",
        href: "https://github.com/rckbrcls/sparky/releases/latest",
        options: [
          {
            kind: "command",
            label: "Install with curl",
            command:
              "curl -fsSL https://rckbrcls.com/api/sparky/install | bash",
            description: "macOS 26 or later · universal build",
          },
          {
            kind: "github-release",
            label: "GitHub Releases",
            href: "https://github.com/rckbrcls/sparky/releases/latest",
          },
        ],
      },
      {
        type: "source",
        href: "https://github.com/rckbrcls/sparky",
      },
    ],
  },
];
