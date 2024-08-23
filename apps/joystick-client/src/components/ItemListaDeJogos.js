import React from "react";
import { FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ImgJogo from "../assets/jogo.jpeg";
import api from "../services/api";
import {
  StyledCardGame,
  StyledCategoria,
  StyledConteudo,
  StyledFlex,
  StyledGeneros,
  StyledLink,
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

export default function ItemListaDeJogos(props) {
  const navigate = useNavigate();

  function handleRemoveItem(e) {
    e.preventDefault();
    api
      .delete(`http://localhost:3000/games/admin/${props._id}`, {
        headers: {
          "x-access-token": sessionStorage.getItem("token"),
        },
      })
      .then(() => {
        alert("Jogo deletado!");
        navigate(0);
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
            <StyledCategoria>{props.genders[0] ? props.genders[0] : "teste"}</StyledCategoria>
            <StyledCategoria>{props.genders[1] ? props.genders[1] : "teste"}</StyledCategoria>
            <StyledCategoria>{props.genders[2] ? props.genders[2] : "teste"}</StyledCategoria>
          </StyledGeneros>
          <StyledTitulo>R${props.price},00</StyledTitulo>
        </StyledConteudo>
        <p>{props.description}</p>
      </StyledCardGame>
      <StyledButtonCart onClick={handleRemoveItem}>
        <GiCancel />
      </StyledButtonCart>
      <StyledLink to={`/editar-jogo/${props._id}`}>
        <StyledButtonCart>
          <FaEdit />
        </StyledButtonCart>
      </StyledLink>
    </StyledFlex2>
  );
}
