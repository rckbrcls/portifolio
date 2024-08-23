import React, { useEffect, useState } from "react";
import {
  StyledJogo,
  StyledConteudo,
  StyledGeneros,
  StyledCategoria,
  StyledButton,
} from "../styles";

import ImgJogo from "../assets/jogo.jpeg";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Jogo(props) {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  function handleComprarJogo(e) {
    e.preventDefault();

    const config = {
      headers: {
        "x-access-token": token,
      },
    };

    api({
      method: "put",
      url: `http://localhost:3000/users/${props._id}`,
      headers: {
        "x-access-token": token,
      },
    }).then(() => {
      navigate("/carrinho");
    });
  }
  return (
    <StyledJogo>
      <img src={ImgJogo} alt="jogo" />
      <StyledConteudo>
        <h1>{props.title}</h1>
        <StyledGeneros>
          <StyledCategoria>{props.genders[0]}</StyledCategoria>
          <StyledCategoria> {props.genders[1]}</StyledCategoria>
          <StyledCategoria> {props.genders[2]}</StyledCategoria>
        </StyledGeneros>
        <p>{props.description}</p>
        <StyledButton noMargin onClick={handleComprarJogo}>
          Comprar
        </StyledButton>
      </StyledConteudo>
    </StyledJogo>
  );
}
