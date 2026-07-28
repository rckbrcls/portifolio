export type PortfolioDetailActionType = "source" | "project" | "download";

/**
 * Modular download / install channels for the Download action menu.
 * Extend with new kinds as products need them (pnpm, stores, etc.).
 */
export type PortfolioDownloadOptionKind =
  | "command"
  | "github-release"
  | "app-store"
  | "play-store"
  | "link";

export type PortfolioDownloadCommandOption = {
  kind: "command";
  /** Visible label, e.g. "Install with curl", "pnpm". */
  label: string;
  /** Shell one-liner or package manager command to copy. */
  command: string;
  description?: string;
};

export type PortfolioDownloadLinkOption = {
  kind: "github-release" | "app-store" | "play-store" | "link";
  label: string;
  href: string;
  description?: string;
};

export type PortfolioDownloadOption =
  | PortfolioDownloadCommandOption
  | PortfolioDownloadLinkOption;

export type PortfolioDetailActionItem = {
  type: PortfolioDetailActionType;
  /** Primary / fallback URL (used for simple links and as download default). */
  href: string;
  /**
   * When set on a `download` action, the button opens a modular options menu
   * instead of navigating directly.
   */
  options?: readonly PortfolioDownloadOption[];
};
