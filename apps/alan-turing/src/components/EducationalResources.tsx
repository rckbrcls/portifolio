import { Component } from "solid-js";
import { TextContainer } from "./TextContainer";

// Tipagem dos dados
type VideoContent = {
  title: string;
  items: { text: string; link: string }[];
};

type ArticleContent = {
  text: string;
  link: string;
};

type EducationalContent = {
  "Vídeos Explicativos": VideoContent[];
  "Artigos e Livros": ArticleContent[];
};

// Dados para preenchimento do componente
const educationalContent: EducationalContent = {
  "Vídeos Explicativos": [
    {
      title: "Documentários sobre a vida de Alan Turing:",
      items: [
        {
          text: '"The Imitation Game" é um filme biográfico que retrata a vida de Alan Turing, focando em seu trabalho durante a Segunda Guerra Mundial e seu papel crucial na decifração do código Enigma.',
          link: "https://www.imdb.com/title/tt2084970/",
        },
        {
          text: '"Codebreaker" é um documentário que explora a vida pessoal e profissional de Turing, destacando suas contribuições à matemática, computação e criptografia.',
          link: "https://www.imdb.com/title/tt2119396/",
        },
      ],
    },
    {
      title: "Palestras de Stephen Cook sobre complexidade computacional:",
      items: [
        {
          text: "Palestras acadêmicas em universidades renomadas como Harvard e Stanford, onde Stephen Cook discute a teoria da NP-completude e seu impacto na ciência da computação.",
          link: "https://www.youtube.com/results?search_query=stephen+cook+lecture",
        },
        {
          text: "Vídeos disponíveis no YouTube e outras plataformas educacionais que explicam conceitos-chave da complexidade computacional de forma acessível.",
          link: "https://www.youtube.com/results?search_query=computational+complexity",
        },
      ],
    },
    {
      title: "Entrevistas e palestras de Noam Chomsky:",
      items: [
        {
          text: "Entrevistas com Chomsky sobre linguística e seu impacto na teoria da computação, disponíveis em plataformas como YouTube e MIT OpenCourseWare.",
          link: "https://www.youtube.com/results?search_query=noam+chomsky+interview+language",
        },
        {
          text: "Palestras de Chomsky sobre política, mídia e suas teorias linguísticas, que podem ser encontradas em diversos canais de divulgação científica e educacional.",
          link: "https://www.youtube.com/results?search_query=noam+chomsky+lecture",
        },
      ],
    },
  ],
  "Artigos e Livros": [
    {
      text: "On Computable Numbers de Alan Turing: Este artigo seminal de 1936 introduz o conceito de 'Máquinas de Turing', que são fundamentais para a teoria da computação e formam a base dos computadores modernos.",
      link: "https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf",
    },
    {
      text: "The Complexity of Theorem-Proving Procedures de Stephen Cook: Publicado em 1971, este artigo estabelece a teoria da NP-completude, que é essencial para a compreensão dos limites da computação e a eficiência dos algoritmos.",
      link: "https://www.inf.unibz.it/~calvanese/teaching/14-15-tc/material/cook-1971-NP-completeness-of-SAT.pdf",
    },
    {
      text: "Syntactic Structures de Noam Chomsky: Revolucionou a linguística ao introduzir a teoria da gramática gerativa, que influenciou não apenas a linguística, mas também áreas da ciência da computação, como a análise de linguagens formais.",
      link: "https://www.amazon.com/Syntactic-Structures-Noam-Chomsky/dp/1614278040",
    },
    {
      text: "Aspects of the Theory of Syntax de Noam Chomsky: Expande as ideias de 'Syntactic Structures' e detalha a teoria da gramática gerativa transformacional.",
      link: "http://www.colinphillips.net/wp-content/uploads/2015/09/chomsky1965-ch1.pdf",
    },
    {
      text: "Manufacturing Consent de Noam Chomsky: Co-escrito com Edward S. Herman, este livro analisa o papel dos meios de comunicação na sociedade moderna, mostrando como a mídia pode ser usada para manipular a opinião pública.",
      link: "https://www.amazon.com.br/Manufacturing-Consent-Political-Economy-Media/dp/0375714499",
    },
  ],
};

export const EducationalResources: Component = () => {
  return (
    <div>
      {Object.entries(educationalContent).map(
        ([sectionTitle, sectionContent]) => (
          <TextContainer title={sectionTitle}>
            <div class="flex h-full flex-col divide-y divide-solid">
              {sectionContent.map((item) => (
                <div class="flex flex-1 flex-col items-start justify-center gap-2 border-zinc-800 pb-4 pt-10 md:gap-10 md:px-4">
                  {"items" in item ? (
                    <>
                      <p class="text-xl font-bold md:mb-2 md:text-2xl">
                        {item.title}
                      </p>
                      <ul class="ml-5 list-disc">
                        {item.items.map((subItem) => (
                          <li class="cursor-pointer underline max-md:text-sm md:hover:underline">
                            <a
                              href={subItem.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {subItem.text}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p class="cursor-pointer max-md:text-sm max-md:underline md:hover:underline">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.text}
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </TextContainer>
        ),
      )}
    </div>
  );
};
