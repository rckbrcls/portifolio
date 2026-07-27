import type { LabProduct } from "@/interface/ILabProduct";

export const labProducts: LabProduct[] = [
  {
    slug: "duplizen",
    order: 1,
    name: "Duplizen",
    productType: "Web game",
    summary:
      "A browser-based social-deduction game built for quick group play across desktop and mobile.",
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
        label: "Play now",
        href: "https://duplizen.erickbarcelos.com",
        kind: "primary",
      },
    ],
  },
  {
    slug: "sparky",
    order: 2,
    name: "Sparky",
    productType: "macOS app",
    summary:
      "A local-first macOS companion for capturing memories, organizing plans, and moving into focused work.",
    technologies: ["Swift", "SwiftUI", "SwiftData", "Sparkle"],
    actions: [
      {
        label: "Download for macOS",
        href: "https://github.com/rckbrcls/sparky/releases/latest",
        kind: "primary",
      },
      {
        label: "View source",
        href: "https://github.com/rckbrcls/sparky",
        kind: "secondary",
      },
    ],
  },
];
