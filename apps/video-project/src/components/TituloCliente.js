import React from "react";
import {Titulo, StyledLink, RoundButton, Container2 } from "../styles";

import { AiOutlineUserAdd } from "react-icons/ai";

function TituloCliente() {
  return (
      <Container2>
        <StyledLink to="/cadastro-cliente">
          <RoundButton primary>
            <AiOutlineUserAdd />
          </RoundButton>
        </StyledLink>

        <Titulo>Clientes</Titulo>
        <p></p>
      </Container2>
  );
}

export default TituloCliente;
