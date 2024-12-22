import React from "react";
import {
  Button,
  Formulario,
  Container,
  StyledInput,
  Titulo,
  LogoImage,
  StyledLink,
} from "../styles";

import Logo from "../assets/fotografo.png";
import styled from "styled-components";

const ContainerLogin = styled(Container)`
  margin-top: 70px;
  grid-gap: 30px;

  img{
    margin-bottom: 40px;
  }
`;

function FormLogin() {
  return (
    <ContainerLogin>
      <LogoImage src={Logo} alt="video" />
      <Titulo>Faça seu Login</Titulo>
      <Formulario>
        <StyledInput type={"email"} placeholder="Email" />
        <StyledInput type={"password"} placeholder="Senha" />
        <StyledLink to="/home">
          <Button primary>Entrar</Button>
        </StyledLink>
      </Formulario>
    </ContainerLogin>
  );  
}

export default FormLogin;
