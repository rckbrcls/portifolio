import type { LabProduct } from "@/interface/ILabProduct";

export const labProducts: LabProduct[] = [
  {
    slug: "duplizen",
    order: 1,
    name: "Duplizen",
    productType: "Web game",
    summary:
      "A browser party game I built so friends could play impostor from their own phones — rooms, hidden roles, and realtime state.",
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
    productType: "macOS app",
    summary:
      "A local-first macOS app I built for myself — capture ideas, remember what matters, schedule custom reminders, and get into focus.",
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
            description: "Download the latest .zip release",
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
