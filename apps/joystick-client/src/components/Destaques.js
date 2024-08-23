import React from "react";
import {
  StyledDestaque,
  StyledConteudo,
  StyledGeneros,
  StyledCategoria,
  StyledButton,
} from "../styles";

import Jogo from "../assets/jogo.jpeg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Image = styled.img`
  object-fit: contain;
  object-position: left;
  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;
`;

const StyledConteudo2 = styled(StyledConteudo)`
  text-align: start;
`;

export default function Destaques(props) {
  const navigate = useNavigate();

  function handleAbrirJogo() {
    navigate(`/detalhe-jogo/${props._id}`);
  }

  return (
    <StyledDestaque>
      <Image src={Jogo} alt="jogo" />
      <StyledConteudo2>
        <h1>{props.title}</h1>
        <StyledGeneros>
          <StyledCategoria> {props.genders[0]}</StyledCategoria>
          <StyledCategoria> {props.genders[1]}</StyledCategoria>
          <StyledCategoria> {props.genders[2]}</StyledCategoria>
        </StyledGeneros>
        <p>{props.description} </p>
        <h1>R${props.price},00</h1>
        <StyledButton noMargin onClick={handleAbrirJogo}>
          Comprar
        </StyledButton>
      </StyledConteudo2>
    </StyledDestaque>
  );
}
