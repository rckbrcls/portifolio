import React, { useEffect, useState } from "react";
import api from "../services/api";
import {
  Card,
  Titulo,
  TituloMenor,
  Box,
  Box2,
  RoundButton,
  StyledDiv,
  StyledDiv2,
  StyledLink,
} from "../styles";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import { Flex } from "../styles";

function ListaVideo() {
  const [videos, setVideos] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    api
      .get("http://localhost:3000/video")
      .then(({ data }) => {
        setVideos(data);
      })
      .catch((error) => {
        alert(error);
      });

    api
      .get("http://localhost:3000/cliente")
      .then(({ data }) => {
        setClientes(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const setData = (data) => {
    let { id, titulo, briefing, orcamento, entrega, status, idCliente } = data;
    localStorage.setItem("ID Video", id);
    localStorage.setItem("Titulo", titulo);
    localStorage.setItem("Briefing", briefing);
    localStorage.setItem("Orcamento", orcamento);
    localStorage.setItem("Entrega", entrega);
    localStorage.setItem("Status", status);
    localStorage.setItem("Cliente ID", idCliente);
  };

  const getData = () => {
    api
      .get("http://localhost:3000/video")
      .then(({ data }) => {
        setVideos(data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const onDelete = (id) => {
    api
      .delete(`http://localhost:3000/video/${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Flex>
      {videos
        .sort((a, b) =>
          a.entrega
            .split("/")
            .reverse()
            .join()
            .localeCompare(
              b.entrega
                .split("/")
                .reverse()
                .join()
            )
        )
        .map((video) => (
          <Card key={video.id}>
            <Box2>
              <StyledDiv>
                <Titulo>
                  {clientes
                    .filter((cliente) => cliente.id === video.idCliente)
                    .map((cliente) => cliente.nome)}
                </Titulo>
                <TituloMenor>
                  {clientes
                    .filter((cliente) => cliente.id === video.idCliente)
                    .map((cliente) => cliente.telefone)}
                </TituloMenor>
              </StyledDiv>
              <StyledDiv2>
                <StyledLink to="/editar-video">
                  <RoundButton onClick={() => setData(video)}>
                    <AiFillEdit />
                  </RoundButton>
                </StyledLink>
                <RoundButton onClick={() => onDelete(video.id)}>
                  <AiFillDelete />
                </RoundButton>
              </StyledDiv2>
            </Box2>
            <Box>
              <Titulo>{video.titulo}</Titulo>
              <TituloMenor>Entrega: {video.entrega}</TituloMenor>
              <TituloMenor>Orçamento: R$ {video.orcamento}</TituloMenor>
              <TituloMenor>Status: {video.status}</TituloMenor>
            </Box>
          </Card>
        ))}
    </Flex>
  );
}

// Titulo, Nome do Cliente, telefone do cliente, data de entrega,
// preço do vídeo e status.
export default ListaVideo;
