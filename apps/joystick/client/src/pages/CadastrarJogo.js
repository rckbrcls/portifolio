import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";
import api from "../services/api";
import {
  MarginVert,
  StyledButton,
  StyledContainer,
  StyledForm,
  StyledInput,
  StyledSelect,
  StyledTextarea,
} from "../styles";

export default function CadastrarJogo() {
  const [newGame, setNewGame] = useState({});

  const navigate = useNavigate();

  function handleNovoJogo(e) {
    e.preventDefault();

    api({
      method: "post",
      url: `http://localhost:3000/games`,
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
      },
      data: newGame,
    })
      .then(() => {
        navigate("/lista-de-jogos");
        alert("Jogo adicionado");
      })
      .catch((erro) => {
        alert(erro);
      });
  }

  return (
    <StyledContainer>
      <Cabecalho />
      <StyledForm onSubmit={handleNovoJogo}>
        <h1>Cadastro de Jogo</h1>
        <StyledInput
          required
          placeholder="Titulo"
          type="text"
          onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
        />
        <StyledTextarea
          required
          placeholder="Descrição"
          onChange={(e) =>
            setNewGame({ ...newGame, description: e.target.value })
          }
        />
        <StyledInput
          required
          placeholder="Preço"
          type="number"
          onChange={(e) => setNewGame({ ...newGame, price: e.target.value })}
        />

        <label>Mostra no carrossel?</label>
        <StyledSelect
          required
          onChange={(e) => setNewGame({ ...newGame, carousel: e.target.value })}
        >
          <option></option>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </StyledSelect>
        <label>Mostrar nos melhores</label>
        <StyledSelect
          required
          onChange={(e) => setNewGame({ ...newGame, best: e.target.value })}
        >
          <option></option>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </StyledSelect>

        <label>Lançamento?</label>
        <StyledSelect
          required
          onChange={(e) => setNewGame({ ...newGame, release: e.target.value })}
        >
          <option></option>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </StyledSelect>
        <StyledButton type="submit">Cadastrar jogo</StyledButton>
      </StyledForm>
      <MarginVert></MarginVert>
    </StyledContainer>
  );
}
