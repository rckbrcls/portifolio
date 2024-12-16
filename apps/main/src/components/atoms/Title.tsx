import React from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";
import BlurIn from "../ui/blur-in";
import TypingAnimation from "../ui/typing-animation";

// Interface para os parâmetros
interface ITitleProps {
  word: string;
  className?: ClassNameValue;
  gradient?: boolean;
  type?: "typing" | "blur";
}

export default function Title({
  word,
  className,
  gradient = false,
  type = "typing",
}: ITitleProps) {
  if (!word?.length) return null; // Retorna nulo se a palavra estiver vazia ou indefinida

  // Classes padrão aplicadas a qualquer tipo
  const baseClasses = `text-6xl md:text-8xl font-bold ${
    gradient &&
    "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text pb-4 inline-block text-transparent"
  }`;

  // Escolhe o componente baseado no tipo
  const Component = type === "typing" ? TypingAnimation : BlurIn;

  return (
    <Component
      text={word} // Para TypingAnimation
      word={word} // Para BlurIn
      className={twMerge(baseClasses, className)}
    />
  );
}
