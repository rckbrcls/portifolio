import React, { ReactNode } from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";

export default function SubTitle({
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
        `text-3xl font-bold md:text-4xl ${
          gradient &&
          "inline-block bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        }`,
        className,
      )}
    >
      {children}
    </p>
  );
}
