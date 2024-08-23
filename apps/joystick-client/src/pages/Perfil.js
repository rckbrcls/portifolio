import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImgPerfil from "../assets/perfil.jpg";
import Cabecalho from "../components/Cabecalho";
import api, { atualizarToken } from "../services/api";
import { StyledButton, StyledContainer, StyledForm, StyledInput, StyledLink, StyledProfileImg } from "../styles";

export default function Perfil() {
  const [user, setUser] = useState({});
  const [newUser, setNewUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    atualizarToken();
    api
      .get(`http://localhost:3000/users`, {
        headers: {
          "x-access-token": sessionStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleAtualizarUser(e) {
    e.preventDefault();

    api({
      method: "put",
      url: `http://localhost:3000/users`,
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
      },
      data: newUser,
    })
      .then(() => {
        atualizarToken();
        alert("Informações editadas");
      })
      .catch((erro) => {
        alert(erro);
      });
  }

  function handleSair(e) {
    e.preventDefault();

    sessionStorage.removeItem("token");
    navigate("/");
  }

  return (
    <StyledContainer>
      <Cabecalho />
      <StyledForm onSubmit={handleAtualizarUser}>
        <h1>Perfil</h1>
        <StyledProfileImg src={ImgPerfil} alt="foto de perfil" />
        <StyledInput
          placeholder="Name"
          type="text"
          defaultValue={user.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <StyledInput
          placeholder="Username"
          type="text"
          defaultValue={user.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <StyledInput
          placeholder="E-mail"
          type="email"
          id="email"
          defaultValue={user.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <StyledInput
          placeholder="Password"
          type="text"
          id="password"
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <StyledButton type="submit">Salvar</StyledButton>

        <StyledButton onClick={handleSair}>Sair</StyledButton>

        {user.isAdmin ? (
          <StyledLink to="/lista-de-jogos">
            <StyledButton>Lista de jogos</StyledButton>
          </StyledLink>
        ) : (
          <div></div>
        )}
      </StyledForm>
    </StyledContainer>
  );
}
