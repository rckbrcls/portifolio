import React, { ReactNode } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

export default function Title({
  children,
  className,
  gradient,
}: {
  children?: ReactNode;
  className?: ClassNameValue;
  gradient?: boolean;
}) {
  return (
    <p
      className={twMerge(
        `text-6xl md:text-8xl font-bold
        ${
          gradient &&
          "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text pb-4 inline-block text-transparent"
        }`,
        className
      )}
    >
      {children}
    </p>
  );
}
