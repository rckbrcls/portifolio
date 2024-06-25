import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";
import ItemCarrinho from "../components/ItemCarrinho";
import api, { atualizarToken } from "../services/api";
import {
  MarginVert,
  StyledButton,
  StyledContainer,
  StyledFlex,
  StyledList,
  StyledTitulo,
  StyledInput,
  StyledForm,
  StyledLink,
} from "../styles";

export default function FinalizarCompra() {
  const navigate = useNavigate();

  function handleFinalizar(e) {
    e.preventDefault();
    api({
      method: "post",
      url: `http://localhost:3000/users/finish`,
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
      },
    })
      .then(() => {
        atualizarToken();
        alert("Compra finalizada");
        navigate("/biblioteca");
      })
      .catch((erro) => {
        alert(erro);
      });
  }

  return (
    <StyledContainer>
      <Cabecalho />
      <StyledForm onSubmit={handleFinalizar}>
        <h1>Finalizar compra</h1>
        <StyledInput required placeholder="Número do cartão" type="number" />
        <StyledInput required placeholder="CPF" type="number" />
        <StyledInput required placeholder="Nome" type="text" />
        <label>Data de validade</label>
        <StyledInput required placeholder="Data de validade" type="date" />
        <StyledInput required placeholder="CVV" type="number" />
        <StyledLink to="/">
          <StyledButton type="submit">Comprar</StyledButton>
        </StyledLink>
      </StyledForm>
    </StyledContainer>
  );
}
