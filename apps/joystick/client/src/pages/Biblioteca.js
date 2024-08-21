import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";
import ItemBiblioteca from "../components/ItemBiblioteca";
import api, { atualizarToken } from "../services/api";
import {
  MarginVert,
  StyledContainer,
  StyledList,
  StyledTitulo,
} from "../styles";

export default function Biblioteca() {
  const [library, setLibrary] = useState([]);
  const [jogos, setJogos] = useState([]);

  const [lastGame, setLastGame] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    atualizarToken();
    api({
      method: "get",
      url: `http://localhost:3000/users/library`,
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
      },
    })
      .then((data) => {
        if (library.length === 0) setLibrary(data.data);
      })
      .catch((erro) => {
        alert(erro);
      });
  }, []);

  useEffect(() => {
    library.map((id) => {
      setLastGame(id);
      api({
        method: "get",
        url: `http://localhost:3000/games/${id}`,
      })
        .then((data) => {
          if (lastGame !== id) setJogos((oldArray) => [...oldArray, data.data]);
        })
        .catch((erro) => {
          alert(erro);
        });
    });
  }, [library]);

  return (
    <StyledContainer>
      <Cabecalho />
      <StyledTitulo margem>Biblioteca</StyledTitulo>
      <StyledList>
        {jogos.map((item) => (
          <ItemBiblioteca
            key={item._id}
            _id={item._id}
            title={item.title}
            genders={item.genders}
            price={item.price}
            description={item.description}
          />
        ))}
      </StyledList>

      <MarginVert></MarginVert>
    </StyledContainer>
  );
}
