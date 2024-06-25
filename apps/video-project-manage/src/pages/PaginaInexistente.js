import React from "react";
import {
  Container,
  Titulo,
  Image,
  TituloMenor,
  Button,
  StyledLink,
} from "../styles";

import styled from "styled-components";
import ErrorImage from "../assets/error-404.png";

const ContainerInexistente = styled(Container)`
  margin: 15px auto;

  h1 {
    margin-top: -50px;
    font-size: 150px;
  }

  h4 {
    margin-top: -30px;
    font-size: 25px;
  }
  button {
    width: 30%;
  }
`;

function PaginaInexistente() {
  return (
    <ContainerInexistente>
      <Image src={ErrorImage} alt="video" />
      <Titulo>404</Titulo>
      <TituloMenor>Pagina inexistente.</TituloMenor>
      <StyledLink to="/home">
        <Button>Home</Button>
      </StyledLink>
    </ContainerInexistente>
  );
}

export default PaginaInexistente;
