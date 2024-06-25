import { Component } from "solid-js";
import { TextContainer } from "./TextContainer";

export const IntroductionSection: Component = () => {
  return (
    <TextContainer title="Introdução">
      <div class="flex w-full flex-col items-center gap-10 md:h-full md:flex-row">
        <div class="flex w-full flex-col justify-between gap-10 pt-6 md:h-full md:w-1/2">
          <p class="max-md:text-sm">
            Bem-vindo ao nosso site sobre Teoria da Computação! Este site foi
            criado como parte de um trabalho de extensão para a matéria de
            Introdução à Teoria da Computação. Aqui, exploramos as vidas e
            contribuições de Alan Turing, Stephen Cook e Noam Chomsky, três
            gigantes cujas obras moldaram o campo da ciência da computação.
            Esperamos que este site inspire você a aprender mais sobre essa
            fascinante área e sua importância para o mundo moderno.
          </p>
          <ul class="flex flex-1 flex-col justify-around gap-4">
            <div class="flex items-center gap-5">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Alan_Turing_%281912-1954%29_in_1936_at_Princeton_University.jpg/640px-Alan_Turing_%281912-1954%29_in_1936_at_Princeton_University.jpg"
                class="h-10 w-10 rounded-full object-cover md:h-20 md:w-20"
                alt=""
              />
              <li class="max-md:text-sm">
                "A única maneira de descobrir os limites do possível é ir além
                deles para o impossível." <p class="font-bold">- Alan Turing</p>
              </li>
            </div>
            <div class="flex items-center gap-5">
              <img
                src="https://www.utoronto.ca/sites/default/files/stephen-cook.jpg"
                class="h-10 w-10 rounded-full object-cover md:h-20 md:w-20"
                alt=""
              />
              <li class="max-md:text-sm">
                "A complexidade de um problema é a quantidade de recursos
                necessários para resolvê-lo."{" "}
                <p class="font-bold">- Stephen Cook</p>
              </li>
            </div>
            <div class="flex items-center gap-5">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/46/Noam_Chomsky_portrait_2017_retouched.jpg"
                class="h-10 w-10 rounded-full object-cover md:h-20 md:w-20"
                alt=""
              />
              <li class="max-md:text-sm">
                "A linguagem é um processo de livre criação; suas leis e
                princípios são fixos, mas a maneira como os princípios da
                geração são usados é livre e infinitamente variada."{" "}
                <p class="font-bold">- Noam Chomsky</p>
              </li>
            </div>
          </ul>
        </div>
        <div class="flex w-full flex-col gap-4 md:h-full md:w-1/2">
          <img
            src="/images/image.png"
            class="w-full rounded-2xl bg-white object-contain md:h-1/2"
            alt=""
          />
          <img
            src="https://s22.cs251.com/Text/04_Deterministic_Finite_Automata/media_upload/dfa.png"
            class="w-full rounded-2xl bg-white object-cover md:h-1/2"
            alt=""
          />
        </div>
      </div>
    </TextContainer>
  );
};
