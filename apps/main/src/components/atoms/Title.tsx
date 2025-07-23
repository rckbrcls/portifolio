import React from "react";
import { ClassNameValue, twMerge } from "tailwind-merge";
import BlurIn from "../ui/blur-in";
import TypingAnimation from "../ui/typing-animation";
import WordRotate from "../ui/word-rotate"; // Importe o componente WordRotate

// Interface para os parâmetros
interface ITitleProps {
  word: string;
  className?: ClassNameValue;
  gradient?: boolean;
  type?: "typing" | "blur" | "rotate";
}

export default function Title({
  word,
  className,
  gradient = false,
  type = "typing",
}: ITitleProps) {
  if (!word?.length) return null; // Retorna nulo se a palavra estiver vazia ou indefinida

  // Classes padrão aplicadas a qualquer tipo
  const baseClasses = `text-6xl md:text-8xl font-black ${
    gradient &&
    "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text pb-4 inline-block text-transparent"
  }`;

  // Escolhe o componente baseado no tipo
  let Component: React.ComponentType<any>;
  let componentProps: Record<string, any> = {
    className: twMerge(baseClasses, className),
  };

  switch (type) {
    case "typing":
      Component = TypingAnimation;
      componentProps = { ...componentProps, text: word };
      break;
    case "blur":
      Component = BlurIn;
      componentProps = { ...componentProps, word };
      break;
    case "rotate":
      Component = WordRotate;
      componentProps = { ...componentProps, words: [word] };
      break;
    default:
      return null;
  }

  return <Component {...componentProps} />;
}
