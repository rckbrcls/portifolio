import type { TWorkCategory } from "@/interface/TWorkCategory";

export function getWorkCategoryLabel(category: TWorkCategory) {
  if (category === "professional") {
    return "Professional";
  }

  if (category === "research") {
    return "Research";
  }

  if (category === "community") {
    return "Community";
  }

  return "Independent";
}
