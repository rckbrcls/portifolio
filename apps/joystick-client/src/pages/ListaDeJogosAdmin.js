import React, { useEffect, useState } from "react";
import Cabecalho from "../components/Cabecalho";
import ItemListaDeJogos from "../components/ItemListaDeJogos";
import api, { atualizarToken } from "../services/api";
import { MarginVert, StyledButton, StyledContainer, StyledLink, StyledList, StyledTitulo } from "../styles";

export default function ListaDeJogosAdmin() {
  const [jogos, setJogos] = useState([]);
  useEffect(() => {
    atualizarToken();
    api
      .get("http://localhost:3000/games")
      .then(({ data }) => {
        setJogos(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <StyledContainer>
      <Cabecalho />
      <StyledTitulo margem>Jogos da loja</StyledTitulo>
      <StyledLink to="/cadastrar-jogo">
        <StyledButton>Adicionar jogo</StyledButton>
      </StyledLink>
      <StyledList>
        {jogos.map((jogo) => (
          <ItemListaDeJogos
            key={jogo._id}
            _id={jogo._id}
            title={jogo.title}
            genders={jogo.genders}
            price={jogo.price}
            description={jogo.description}
          />
        ))}
      </StyledList>
      <MarginVert></MarginVert>
    </StyledContainer>
  );
}
