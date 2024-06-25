import { Component } from "solid-js";
import { TextContainer } from "./TextContainer";

// Tipagem dos dados
type ContentSection = {
  title: string;
  items: { subtitle: string; text: string; link?: string }[];
};

type InfluenceAndLegacyContent = {
  "Impacto na Ciência da Computação": ContentSection[];
  "Reconhecimento e Prêmios": ContentSection[];
};

// Dados para preenchimento do componente
const influenceAndLegacyContent: InfluenceAndLegacyContent = {
  "Impacto na Ciência da Computação": [
    {
      title: "Alan Turing",
      items: [
        {
          subtitle: "",
          text: "Considerado o pai da ciência da computação e da inteligência artificial. Sua criação das Máquinas de Turing forneceu um modelo matemático para a computação, e seu trabalho em criptografia durante a Segunda Guerra Mundial foi crucial para a vitória dos Aliados.",
        },
        {
          subtitle: "",
          text: 'A "Turing Test" (Teste de Turing) continua sendo uma referência fundamental no campo da inteligência artificial para avaliar a capacidade de uma máquina de exibir comportamento inteligente equivalente ao de um humano.',
        },
      ],
    },
    {
      title: "Stephen Cook",
      items: [
        {
          subtitle: "",
          text: "A teoria da NP-completude, introduzida por Cook, transformou a forma como os cientistas da computação entendem a complexidade dos problemas computacionais. Seu trabalho fornece a base para a maioria das pesquisas em teoria da complexidade e algoritmos.",
        },
        {
          subtitle: "",
          text: 'A "Cook-Levin Theorem" é um pilar central na teoria da complexidade computacional, estabelecendo a base para a classificação de problemas NP-completos.',
        },
      ],
    },
    {
      title: "Noam Chomsky",
      items: [
        {
          subtitle: "",
          text: "Chomsky revolucionou a linguística com suas teorias de gramática gerativa, que têm aplicações diretas na ciência da computação, especialmente na teoria das linguagens formais e na construção de compiladores.",
        },
        {
          subtitle: "",
          text: "Suas ideias sobre a estrutura e a aquisição da linguagem influenciam o desenvolvimento de sistemas de processamento de linguagem natural (NLP), que são fundamentais para tecnologias como assistentes virtuais e tradução automática.",
        },
      ],
    },
  ],
  "Reconhecimento e Prêmios": [
    {
      title: "Alan Turing",
      items: [
        {
          subtitle: "",
          text: "Em 2013, recebeu um perdão póstumo do governo britânico por sua condenação por homossexualidade, um reconhecimento tardio de sua imensa contribuição à ciência e à sociedade.",
        },
        {
          subtitle: "",
          text: "Em 2019, foi escolhido para aparecer na nota de £50 do Banco da Inglaterra, simbolizando seu impacto duradouro.",
        },
      ],
    },
    {
      title: "Stephen Cook",
      items: [
        {
          subtitle: "",
          text: 'Recebeu o Prêmio Turing em 1982 por suas contribuições à teoria da complexidade computacional. Este prêmio é considerado o "Nobel da Computação" e destaca a importância de seu trabalho.',
        },
      ],
    },
    {
      title: "Noam Chomsky",
      items: [
        {
          subtitle: "",
          text: "Além de inúmeras honrarias acadêmicas, Chomsky recebeu prêmios como a Medalha Benjamin Franklin em Ciência Cognitiva e a Medalha de Ouro da Fundação Catalã para Pesquisa e Inovação.",
        },
        {
          subtitle: "",
          text: "Chomsky continua ativo tanto na academia quanto na arena pública, influenciando debates sobre linguística, política e mídia.",
        },
      ],
    },
  ],
};

export const InfluenceAndLegacy: Component = () => {
  return (
    <div>
      {Object.keys(influenceAndLegacyContent).map((sectionTitle) => (
        <TextContainer title={sectionTitle}>
          <div class="flex h-full flex-col divide-y divide-solid">
            {(influenceAndLegacyContent as any)[sectionTitle].map(
              (item: any) => (
                <div class="flex flex-1 flex-col items-start justify-center gap-2 border-zinc-800 pb-4 pt-10 md:gap-10 md:px-4">
                  <p class="text-xl font-bold md:mb-2 md:text-2xl">
                    {item.title}
                  </p>
                  <ul class="ml-5 list-disc">
                    {item.items.map(
                      (subItem: { text: string; link?: string }) => (
                        <li class="max-md:text-sm">
                          {subItem.link ? (
                            <a
                              href={subItem.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {subItem.text}
                            </a>
                          ) : (
                            subItem.text
                          )}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              ),
            )}
          </div>
        </TextContainer>
      ))}
    </div>
  );
};
