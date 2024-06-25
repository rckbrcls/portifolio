import { useState } from "react";
import { brincadeira } from "./data/brincadeira";

const finalMessage =
  "Em cada batida do meu coração, ecoa o suave sussurro do meu amor por você. " +
  "Você é a luz que ilumina os meus dias e o aconchego que aquece as minhas noites. " +
  "Te amo além das palavras, meu eterno amor.";

export default function Messages() {
  const [index, setIndex] = useState(0);

  const handleClickButton = () =>
    setIndex(index < brincadeira.length - 1 ? index + 1 : 0);

  const buttonStyle = {
    transform: `translate(${brincadeira[index].x}vw, ${brincadeira[index].y}vh)`,
    transition: "transform 0.3s ease-in-out",
  };

  return (
    <div className="flex flex-col w-full h-[100svh] justify-center items-center text-center gap-8">
      {index < brincadeira.length - 1 ? (
        <>
          <p className="text-2xl md:text-4xl lg:text-5xl font-bold w-full md:w-1/2 xl:w-1/3">
            {brincadeira[index].mensagem}
          </p>
          <button
            style={buttonStyle}
            className="p-4 bg-purple-600 rounded-lg font-bold hover:scale-105 transition duration-300"
            onClick={handleClickButton}
          >
            Aperte aqui
          </button>
        </>
      ) : (
        <p className="text-2xl md:text-4xl lg:text-5xl font-bold w-4/5 md:w-1/2 xl:w-1/3">
          {finalMessage}
        </p>
      )}
    </div>
  );
}
