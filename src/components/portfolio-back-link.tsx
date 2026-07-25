import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type PortfolioBackLinkProps = {
  href: "/work" | "/labs" | "/blog";
};

export function PortfolioBackLink({ href }: PortfolioBackLinkProps) {
  return (
    <Link
      href={href}
      className="group/back inline-flex items-center gap-2 justify-self-start rounded-[var(--portfolio-radius-md)] bg-portfolio-neutral px-3 py-2 font-mono text-[0.72rem] font-semibold uppercase leading-none tracking-normal text-portfolio-secondary no-underline transition-[background-color,color,transform] duration-portfolio-150 ease-portfolio hover:bg-portfolio-surface hover:text-portfolio-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent active:scale-[0.97] motion-reduce:transform-none motion-reduce:active:transform-none"
    >
      <ArrowLeft className="h-4 w-4 transition-transform duration-portfolio-150 ease-portfolio group-hover/back:-translate-x-0.5 motion-reduce:transform-none motion-reduce:group-hover/back:transform-none" />
      Back
    </Link>
  );
}
