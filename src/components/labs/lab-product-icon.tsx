import Image from "next/image";

interface LabProductIconProps {
  src: string;
  alt: string;
}

export function LabProductIcon({ src, alt }: LabProductIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={120}
      height={120}
      sizes="60px"
      className="block size-[3.75rem] shrink-0 rounded-[var(--portfolio-radius-lg)]"
    />
  );
}
