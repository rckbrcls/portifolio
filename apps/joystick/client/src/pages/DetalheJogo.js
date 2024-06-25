import React, { useEffect, useState } from "react";
import { MarginVert, StyledContainer } from "../styles";

import Cabecalho from "../components/Cabecalho";
import Jogo from "../components/Jogo";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function DetalheJogo() {
  const { idJogo } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [genders, setGenders] = useState([]);
  const [carousel, setCarousel] = useState();
  const [best, setBest] = useState();
  const [isFree, setIsFree] = useState();

  useEffect(() => {
    api
      .get(`http://localhost:3000/games/${idJogo}`)
      .then(({ data }) => {
        setTitle(data.title);
        setDescription(data.description);
        setPrice(data.price);
        setGenders(data.genders);
        setCarousel(data.carousel);
        setBest(data.best);
        setIsFree(data.isFree);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <StyledContainer>
      <Cabecalho />
      <Jogo
        title={title}
        description={description}
        price={price}
        genders={genders}
        carousel={carousel}
        best={best}
        isFree={isFree}
        _id={idJogo}
      />
      <MarginVert></MarginVert>
    </StyledContainer>
  );
}
