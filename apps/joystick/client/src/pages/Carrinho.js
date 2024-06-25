import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cabecalho from "../components/Cabecalho";
import ItemCarrinho from "../components/ItemCarrinho";
import api, { atualizarToken } from "../services/api";
import {
  MarginVert,
  StyledButton,
  StyledContainer,
  StyledFlex,
  StyledLink,
  StyledList,
  StyledTitulo,
} from "../styles";

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
  const [jogos, setJogos] = useState([]);
  const [lastGame, setLastGame] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    atualizarToken();

    api({
      method: "get",
      url: `http://localhost:3000/users/cart`,
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
      },
    })
      .then((data) => {
        if (carrinho.length === 0) setCarrinho(data.data);
      })
      .catch((erro) => {
        alert(erro);
      });
  }, []);

  useEffect(() => {
    carrinho.map((id) => {
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
  }, [carrinho]);

  function handleEsvaziar(e) {
    e.preventDefault();
    api
      .delete(`http://localhost:3000/users/cart`, {
        headers: {
          "x-access-token": sessionStorage.getItem("token"),
        },
      })
      .then(() => {
        atualizarToken();
        alert("Jogos deletados");
        navigate(0);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function handleFinalizar(e) {
    e.preventDefault();
    api({
      method: "post",
      url: `http://localhost:3000/users/finish`,
      headers: {
        "x-access-token": sessionStorage.getItem("token"),
      },
    })
      .then(() => {
        atualizarToken();
        alert("Compra finalizada");
        navigate("/biblioteca");
      })
      .catch((erro) => {
        alert(erro);
      });
  }

  function handleCalcTotal() {
    let total = 0;
    jogos.map((jogo) => (total += jogo.price));

    return total;
  }

  return (
    <StyledContainer>
      <Cabecalho />
      <StyledTitulo margem>Carrinho</StyledTitulo>
      <StyledList>
        {jogos.map((item) => (
          <ItemCarrinho key={item._id} _id={item._id} title={item.title} genders={item.genders} price={item.price} />
        ))}
      </StyledList>
      <StyledTitulo margem>Sub-total: R${handleCalcTotal()}</StyledTitulo>
      <StyledFlex>
        <StyledLink to={"/finalizar-compra"}>
          <StyledButton pequeno onClick={handleFinalizar}>
            Finalizar compra
          </StyledButton>
        </StyledLink>
        <StyledButton pequeno onClick={handleEsvaziar}>
          Esvaziar carrinho
        </StyledButton>
      </StyledFlex>
      <MarginVert></MarginVert>
    </StyledContainer>
  );
}
