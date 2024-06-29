import { Component } from "solid-js";
import { TextContainer } from "./TextContainer";

export const Applications: Component = () => {
  return (
    <TextContainer title="Aplicações">
      <div class="mt-10 flex h-full flex-col items-center justify-around gap-4 divide-solid md:flex-row md:divide-x">
        <div class="flex h-1/4 flex-col items-center justify-center gap-10 border-zinc-800 py-4 md:h-full md:flex-1 md:px-4">
          <img
            src="https://uhe.edu.pk/wp-content/uploads/2022/10/1.png"
            alt=""
            class="rounded-xl object-cover md:h-1/2"
          />
          <div>
            <p class="mb-2 text-xl font-bold md:text-2xl">
              Computação e Criptografia
            </p>
            <p class="max-md:text-sm">
              O trabalho de Alan Turing na decifração de códigos durante a
              Segunda Guerra Mundial lançou as bases para a criptografia
              moderna, que é essencial para a segurança da informação.
            </p>
          </div>
        </div>
        <div class="flex h-1/4 flex-col items-center justify-center gap-10 border-zinc-800 py-4 md:h-full md:flex-1 md:px-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Complexity_subsets_pspace.svg/1920px-Complexity_subsets_pspace.svg.png"
            alt=""
            class="rounded-xl object-contain md:h-1/2"
          />
          <div>
            <p class="mb-2 text-xl font-bold md:text-2xl">
              Complexidade Computacional
            </p>
            <p class="max-md:text-sm">
              Os conceitos introduzidos por Stephen Cook são fundamentais para a
              otimização e ciência de dados, ajudando a identificar quais
              problemas podem ser resolvidos eficientemente.
            </p>
          </div>
        </div>
        <div class="flex h-1/4 flex-col items-center justify-center gap-10 border-zinc-800 py-4 md:h-full md:flex-1 md:px-4 md:py-0">
          <img
            src="https://www.colorado.edu/lab/clear/sites/default/files/styles/medium/public/block/infographs-16_1.png?itok=HJRrMXs0"
            alt=""
            class="rounded-xl object-cover md:h-1/2"
          />
          <div>
            <p class="mb-2 text-xl font-bold md:text-2xl">
              Linguística Computacional
            </p>
            <p class="max-md:text-sm">
              As teorias de Noam Chomsky sobre a estrutura da linguagem
              influenciam o desenvolvimento de tecnologias de processamento de
              linguagem natural, usadas em assistentes virtuais, tradução
              automática e muito mais.
            </p>
          </div>
        </div>
      </div>
    </TextContainer>
  );
};
