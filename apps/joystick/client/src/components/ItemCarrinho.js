import React from "react";
import { GiCancel } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ImgJogo from "../assets/jogo.jpeg";
import api, { atualizarToken } from "../services/api";
import {
  StyledCardGame,
  StyledCategoria,
  StyledConteudo,
  StyledFlex,
  StyledGeneros,
  StyledRoundButton,
  StyledTitulo,
} from "../styles";

const StyledButtonCart = styled(StyledRoundButton)`
  margin-right: 50px;
  font-size: 30px;
`;

const StyledFlex2 = styled(StyledFlex)`
  align-items: center;
`;

export default function ItemCarrinho(props) {
  const navigate = useNavigate();
  function handleRemoveItem(e) {
    e.preventDefault();

    api
      .delete(`http://localhost:3000/users/cart/${props._id}`, {
        headers: {
          "x-access-token": sessionStorage.getItem("token"),
        },
      })
      .then(() => {
        atualizarToken();
        alert("Jogo deletado");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <StyledFlex2>
      <StyledCardGame baixo>
        <img src={ImgJogo} alt="jogo" />
        <StyledConteudo>
          <h1>{props.title}</h1>
          <StyledGeneros>
            <StyledCategoria>{props.genders ? props.genders[0] : ""}</StyledCategoria>
            <StyledCategoria>{props.genders ? props.genders[1] : ""}</StyledCategoria>
            <StyledCategoria>{props.genders ? props.genders[2] : ""}</StyledCategoria>
          </StyledGeneros>
          <StyledTitulo>R${props.price}</StyledTitulo>
        </StyledConteudo>
      </StyledCardGame>
      <StyledButtonCart onClick={handleRemoveItem}>
        <GiCancel />
      </StyledButtonCart>
    </StyledFlex2>
  );
}
