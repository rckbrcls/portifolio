import React, { useEffect, useState } from "react";
import Cabecalho from "../components/Cabecalho";
import {
  StyledContainer,
  StyledForm,
  StyledInput,
  StyledLink,
  StyledButton,
} from "../styles";
import api from "../services/api";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    console.log(email);
    console.log(password);

    api
      .post(`http://localhost:3000/users/authenticate`, {
        email: email,
        password: password,
      })
      .then(({ data }) => {
        console.log(data);
        sessionStorage.setItem("token", data.token);
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <StyledContainer>
      <Cabecalho />
      <StyledForm onSubmit={handleLogin}>
        <h1>Login</h1>
        <StyledInput
          required
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <StyledInput
          required
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <StyledButton type="submit">Login</StyledButton>
        <p>Não possui cadastro?</p>
        <StyledLink to="/cadastro">
          <StyledButton>Cadastro</StyledButton>
        </StyledLink>
      </StyledForm>
    </StyledContainer>
  );
}
