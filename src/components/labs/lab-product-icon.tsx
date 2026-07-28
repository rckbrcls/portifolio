import Image from "next/image";

interface LabProductIconProps {
  src: string;
  alt: string;
  /**
   * Reserved for theme-aware monochrome marks. Currently unused — prefer a
   * mid-gray PNG that already works in light and dark.
   */
  monochrome?: boolean;
}

export function LabProductIcon({ src, alt }: LabProductIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={80}
      height={80}
      sizes="40px"
      className="block size-10 shrink-0 rounded-[var(--portfolio-radius-md)] opacity-90 dark:opacity-100 dark:brightness-125"
    />
  );
}
