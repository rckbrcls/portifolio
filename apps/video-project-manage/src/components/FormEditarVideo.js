import React, { useState, useEffect } from "react";
import {
  Button,
  Formulario,
  Container,
  StyledInput,
  Titulo,
  StyledLabel,
  StyledTextArea,
  DivData,
  StyledSelect,
} from "../styles";

import api from "../services/api";
import { useNavigate } from "react-router-dom";

function FormEditarVideo() {
  const [id, setId] = useState();
  const [titulo, setTitulo] = useState();
  const [briefing, setBriefing] = useState();
  const [orcamento, setOrcamento] = useState();
  const [entrega, setEntrega] = useState();
  const [status, setStatus] = useState();
  const [idCliente, setIdCliente] = useState();
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("ID Video"));
    setTitulo(localStorage.getItem("Titulo"));
    setBriefing(localStorage.getItem("Briefing"));
    setOrcamento(localStorage.getItem("Orcamento"));
    setEntrega(localStorage.getItem("Entrega"));
    setStatus(localStorage.getItem("Status"));
    setIdCliente(localStorage.getItem("Cliente ID"));

    api
      .get("http://localhost:3000/cliente")
      .then(({ data }) => {
        setClientes(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  console.log(idCliente);

  function handleAtualizaVideo(e) {
    e.preventDefault();

    const data = {
      id,
      titulo,
      briefing,
      orcamento,
      entrega,
      status,
      idCliente: parseInt(idCliente, 10),
    };

    api
      .put(`http://localhost:3000/video/${id}`, data)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        alert(error);
      });
  }
  return (
    <Container>
      <Titulo>Editar vídeo</Titulo>
      <Formulario onSubmit={handleAtualizaVideo}>
        <StyledInput
          placeholder="Título do Vídeo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <StyledTextArea
          placeholder="Briefing"
          value={briefing}
          onChange={(e) => setBriefing(e.target.value)}
        />
        <StyledInput
          type={"number"}
          placeholder="Orçamento"
          value={orcamento}
          onChange={(e) => setOrcamento(e.target.value)}
        />
        <DivData>
          <StyledLabel>Data de entrega</StyledLabel>
          <StyledInput
            type={"date"}
            value={entrega}
            onChange={(e) => setEntrega(e.target.value)}
          />
        </DivData>
        <StyledSelect
          value={idCliente}
          onChange={(e) => setIdCliente(parseInt(e.target.value, 10))}
        >
          <option></option>

          {clientes.map((cliente) => (
            <option value={cliente.id} key={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </StyledSelect>

        <StyledSelect
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value={"Pendente"}>Pendente</option>
          <option value={"Em Produção"}>Em Produção</option>
          <option value={"Concluído"}>Concluído</option>
        </StyledSelect>

        <Button primary>Salvar</Button>
      </Formulario>
    </Container>
  );
}

export default FormEditarVideo;
