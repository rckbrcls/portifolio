import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";
import api from "../services/api";
import {
  StyledContainer,
  StyledForm,
  StyledInput,
  StyledLink,
  StyledButton,
} from "../styles";

export default function Cadastro() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function handleNovoUsuario(e) {
    e.preventDefault();

    api
      .post("http://localhost:3000/users", user)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <StyledContainer>
      <Cabecalho />
      <StyledForm onSubmit={handleNovoUsuario}>
        <h1>Cadastro</h1>
        <StyledInput
          required
          placeholder="Name"
          type="text"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <StyledInput
          required
          placeholder="Username"
          type="text"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <StyledInput
          required
          placeholder="E-mail"
          type="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <StyledInput
          required
          placeholder="Password"
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <StyledButton type="submit">Cadastro</StyledButton>
        <p>Já possui cadastro?</p>
        <StyledLink to="/login">
          <StyledButton>Login</StyledButton>
        </StyledLink>
      </StyledForm>
    </StyledContainer>
  );
}
