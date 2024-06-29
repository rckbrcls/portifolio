import { Component, JSX } from "solid-js";
import { ClassNameValue, twMerge } from "tailwind-merge";

interface IProps {
  children?: JSX.Element;
  title: string;
  className?: ClassNameValue;
}

export const TextContainer: Component<IProps> = ({
  children,
  title,
  className,
}) => {
  return (
    <div
      class={twMerge(
        "flex flex-col px-8 pb-16 pt-0 md:h-lvh md:snap-center md:snap-always md:pt-16",
        className,
      )}
    >
      <p class="text-2xl font-bold md:text-4xl">{title}</p>
      {children}
    </div>
  );
};
