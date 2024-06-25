import { Component } from "solid-js";
import { TextContainer } from "./TextContainer";

export const Timeline: Component = () => {
  return (
    <TextContainer title="Timeline" className="flex flex-col">
      <div class="flex h-full flex-col md:flex-row">
        <div class="mt-5 flex flex-1 flex-col md:mt-12">
          <p class="text-xl font-bold md:text-2xl">Alan Turing</p>
          <div class="mt-6 flex flex-1 flex-col justify-between gap-4 border-l border-dashed px-4 py-2">
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">1936: </p> Publicação de "On Computable
              Numbers".
            </div>
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">1940-1945:</p> Trabalho no Bletchley Park.
            </div>
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">1950:</p> Publicação do artigo "Computing
              Machinery and Intelligence".
            </div>
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">1954:</p> Morte de Alan Turing.
            </div>
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">2013:</p> Perdão oficial pelo governo
              britânico.
            </div>
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">2019:</p> Aparição na nota de £50.
            </div>
          </div>
        </div>

        <div class="mt-5 flex flex-1 flex-col md:mt-12">
          <p class="text-xl font-bold md:text-2xl">Stephen Cook</p>
          <div class="mt-6 flex flex-1 flex-col justify-between gap-4 border-l border-dashed px-4 py-2">
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">1939: </p> Nascimento.
            </div>
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">1966:</p> Doutorado em Harvard.
            </div>
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">1971:</p> Publicação de "The Complexity of
              Theorem-Proving Procedures".
            </div>
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">1982:</p> Recebimento do Prêmio Turing.
            </div>
          </div>
        </div>

        <div class="mt-5 flex flex-1 flex-col md:mt-12">
          <p class="text-xl font-bold md:text-2xl">Noam Chomsky</p>
          <div class="mt-6 flex flex-1 flex-col justify-between gap-4 border-l border-dashed px-4 py-2">
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">1928: </p> Nascimento.
            </div>
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">1957:</p> Publicação de "Syntactic
              Structures".
            </div>
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">1965:</p> Publicação de "Aspects of the
              Theory of Syntax".
            </div>
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">1988:</p> Publicação de "Manufacturing
              Consent".
            </div>
            <div class="flex items-start gap-1 max-md:text-sm">
              <p class="font-bold">Continua ativo:</p> como acadêmico e
              comentarista.
            </div>
          </div>
        </div>
      </div>
    </TextContainer>
  );
};
