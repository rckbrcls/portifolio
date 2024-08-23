import React, { useEffect, useState } from "react";
import Cabecalho from "../components/Cabecalho";
import CardJogo from "../components/CardJogo";
import Destaques from "../components/Destaques";
import Background from "../assets/lastofus.jpg";

import {
  StyledList,
  StyledContainer,
  StyledTitulo,
  StyledSubTitulo,
} from "../styles";
import api from "../services/api";
import styled from "styled-components";
import { Carousel } from "react-bootstrap";

const StyledContainer2 = styled(StyledContainer)`
  background-image: linear-gradient(
      to bottom,
      rgba(245, 246, 252, 0.2),
      rgba(39, 38, 80, 2),
      rgba(39, 38, 80, 2)
    ),
    url(${Background});
  background-repeat: no-repeat;
`;

export default function Home() {
  const [jogos, setJogos] = useState([]);

  useEffect(() => {
    api
      .get("http://localhost:3000/games")
      .then(({ data }) => {
        setJogos(data);
      })
      .catch((error) => {
        alert(error);
      });
    console.log(jogos);
  }, []);

  return (
    <StyledContainer2>
      <Cabecalho />
      <Carousel>
        {jogos &&
          jogos
            .filter((jogo) => jogo.carousel === true)
            .map((jogo) => (
              <Carousel.Item key={jogo._id}>
                <Destaques
                  _id={jogo._id}
                  title={jogo.title}
                  genders={jogo.genders}
                  description={jogo.description}
                  price={jogo.price}
                />
              </Carousel.Item>
            ))}
      </Carousel>

      <StyledTitulo margem>Melhores Jogos</StyledTitulo>
      <StyledSubTitulo cinza margem>
        Explore os melhores projetos da plataforma
      </StyledSubTitulo>
      <StyledList>
        {jogos.map((jogo) => (
          <CardJogo
            key={jogo._id}
            _id={jogo._id}
            title={jogo.title}
            genders={jogo.genders}
            description={jogo.description}
            price={jogo.price}
          />
        ))}
      </StyledList>
    </StyledContainer2>
  );
}
