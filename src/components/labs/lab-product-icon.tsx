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
      width={80}
      height={80}
      sizes="40px"
      className="block size-10 shrink-0 rounded-[var(--portfolio-radius-md)]"
    />
  );
}
