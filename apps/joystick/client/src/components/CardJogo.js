import React from "react";
import {
  StyledCardGame,
  StyledConteudo,
  StyledGeneros,
  StyledCategoria,
  StyledButton,
} from "../styles";
import ImgJogo from "../assets/jogo.jpeg";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Image = styled.img`
  object-fit: contain;
  object-position: left;
  border-bottom-left-radius: 50px;
  border-top-left-radius: 50px;
`;

export default function CardJogo(props) {
  const navigate = useNavigate();

  function handleAbrirJogo() {
    navigate(`/detalhe-jogo/${props._id}`);
  }

  return (
    <StyledCardGame>
      <Image src={ImgJogo} alt="jogo" />
      <StyledConteudo>
        <h1>{props.title}</h1>
        <StyledGeneros>
          <StyledCategoria> {props.genders[0]}</StyledCategoria>
          <StyledCategoria> {props.genders[1]}</StyledCategoria>
          <StyledCategoria> {props.genders[2]}</StyledCategoria>
        </StyledGeneros>
        <h1>R${props.price},00</h1>
        <StyledButton noMargin onClick={handleAbrirJogo}>
          Comprar
        </StyledButton>
      </StyledConteudo>
    </StyledCardGame>
  );
}
