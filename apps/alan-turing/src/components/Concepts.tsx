import { Component } from "solid-js";
import { TextContainer } from "./TextContainer";

export const Concepts: Component = () => {
  return (
    <TextContainer title="Conceitos">
      <div class="mt-10 flex h-full flex-col items-center justify-around gap-4 divide-solid md:flex-row md:divide-x">
        <div class="flex h-1/4 flex-col items-center justify-center gap-10 border-zinc-800 md:h-full md:flex-1 md:px-4">
          <img
            src="https://images.squarespace-cdn.com/content/v1/558dd098e4b04b60d9638dc5/1462150953462-S2SSX0RG5F5ZHQS5TKMN/image-asset.jpeg"
            alt=""
            class="rounded-xl object-cover md:h-1/2"
          />
          <div>
            <p class="mb-2 text-xl font-bold md:text-2xl">Máquina de Turing</p>
            <p class="max-md:text-sm">
              A Máquina de Turing é um modelo teórico que define uma máquina que
              manipula símbolos em uma fita de acordo com um conjunto de regras.
              Esse modelo é fundamental para a teoria da computação e ajuda a
              entender o que pode ser computado.
            </p>
          </div>
        </div>
        <div class="flex h-1/4 flex-col items-center justify-center gap-10 border-zinc-800 md:h-full md:flex-1 md:px-4">
          <img
            src="https://miro.medium.com/v2/resize:fit:746/0*nedxMbwYe3CzPGga.png"
            alt=""
            class="rounded-xl bg-white object-contain p-4 md:h-1/2"
          />
          <div>
            <p class="mb-2 text-xl font-bold md:text-2xl">NP-Completude</p>
            <p class="max-md:text-sm">
              Problemas NP-completos são uma classe de problemas que são, ao
              mesmo tempo, difíceis de resolver e fáceis de verificar. Esses
              problemas são fundamentais para a compreensão dos limites da
              computação.
            </p>
          </div>
        </div>
        <div class="flex h-1/4 flex-col items-center justify-center gap-10 border-zinc-800 md:h-full md:flex-1 md:px-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Verb_Movement.jpg/562px-Verb_Movement.jpg"
            alt=""
            class="rounded-xl object-cover md:h-1/2"
          />
          <div>
            <p class="mb-2 text-xl font-bold md:text-2xl">Gramática gerativa</p>
            <p class="max-md:text-sm">
              A gramática gerativa é uma teoria que sugere que a capacidade de
              gerar e compreender frases gramaticais é inata aos seres humanos.
              Essa teoria transformou o estudo da linguística e influenciou
              várias outras disciplinas.
            </p>
          </div>
        </div>
      </div>
    </TextContainer>
  );
};
