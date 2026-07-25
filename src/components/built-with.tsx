interface BuiltWithProps {
  technologies: readonly string[];
}

export function BuiltWith({ technologies }: BuiltWithProps) {
  if (technologies.length === 0) {
    return null;
  }

  return (
    <div className="!mt-9 border-t border-portfolio-border pt-6">
      <p className="portfolio-kicker">Built with</p>
      <p className="mb-0 mt-3 text-sm leading-7 text-portfolio-secondary">
        {technologies.join(" / ")}
      </p>
    </div>
  );
}
