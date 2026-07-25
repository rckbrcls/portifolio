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
    slug: "converge",
    order: 2,
    name: "Converge",
    productType: "macOS app",
    summary:
      "A native macOS focus timer built around calm sessions, local history, statistics, and notifications.",
    technologies: ["Swift", "SwiftUI", "Swift Charts", "Sparkle"],
    actions: [
      {
        label: "Download for macOS",
        href: "https://github.com/rckbrcls/converge/releases",
        kind: "primary",
      },
      {
        label: "View source",
        href: "https://github.com/rckbrcls/converge",
        kind: "secondary",
      },
    ],
  },
];
