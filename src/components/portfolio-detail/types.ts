export type PortfolioDetailActionType = "source" | "project" | "download";

export type PortfolioDetailActionItem = {
  type: PortfolioDetailActionType;
  href: string;
};
