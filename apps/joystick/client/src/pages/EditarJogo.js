import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

export default function EditarJogo() {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [newGame, setNewGame] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`http://localhost:3000/games/${id}`)
      .then(({ data }) => {
        setGame(data);
        setNewGame(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  function handleEditarJogo(e) {
    e.preventDefault();

    api({
      method: "put",
      url: `http://localhost:3000/games/admin/${id}`,
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
      },
      data: newGame,
    })
      .then(() => {
        navigate("/lista-de-jogos");
        alert("Informações editadas");
      })
      .catch((erro) => {
        alert(erro);
      });
  }

  return (
    <StyledContainer>
      <Cabecalho />
      <StyledForm onSubmit={handleEditarJogo}>
        <h1>Editar Jogo</h1>
        <StyledInput
          required
          placeholder="Titulo"
          type="text"
          defaultValue={game.title}
          onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
        />
        <StyledTextarea
          required
          placeholder="Descrição"
          defaultValue={game.description}
          onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
        />
        <StyledInput
          required
          placeholder="Preço"
          type="number"
          defaultValue={game.price}
          onChange={(e) => setNewGame({ ...newGame, price: e.target.value })}
        />

        <label>Mostra no carrossel?</label>
        <StyledSelect
          required
          defaultValue={game.carousel}
          onChange={(e) => setNewGame({ ...newGame, carousel: e.target.value })}
        >
          <option></option>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </StyledSelect>
        <label>Mostrar nos melhores</label>
        <StyledSelect
          required
          defaultValue={game.best}
          onChange={(e) => setNewGame({ ...newGame, best: e.target.value })}
        >
          <option></option>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </StyledSelect>

        <label>Lançamento?</label>
        <StyledSelect
          required
          defaultValue={game.release}
          onChange={(e) => setNewGame({ ...newGame, release: e.target.value })}
        >
          <option></option>
          <option value={true}>Sim</option>
          <option value={false}>Não</option>
        </StyledSelect>
        <StyledButton type="submit">Editar jogo</StyledButton>
      </StyledForm>
      <MarginVert></MarginVert>
    </StyledContainer>
  );
}
