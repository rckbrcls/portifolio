import Image from "next/image";

import { cn } from "@/lib/utils";

export type LabMediaItem = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

interface LabMediaGridProps {
  items: LabMediaItem[];
  columns?: 1 | 2 | 3;
  className?: string;
}

export function LabMediaGrid({
  items,
  columns = 1,
  className,
}: LabMediaGridProps) {
  return (
    <div
      className={cn(
        "grid gap-portfolio-md",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <figure key={item.src} className="grid min-w-0 gap-3">
          <div className="overflow-hidden rounded-[var(--portfolio-radius-md)] border border-portfolio-border bg-portfolio-surface">
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              sizes={
                columns === 3
                  ? "(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"
                  : columns === 2
                    ? "(min-width: 640px) 48vw, 100vw"
                    : "100vw"
              }
              className="block h-auto w-full object-contain"
            />
          </div>
          <figcaption className="m-0 text-[0.82rem] leading-[1.55] text-portfolio-secondary">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
