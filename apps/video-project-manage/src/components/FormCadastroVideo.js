import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Button,
  Formulario,
  Container,
  StyledInput,
  Titulo,
  TituloMenor,
  StyledLabel,
  StyledTextArea,
  DivData,
  StyledSelect,
} from "../styles";

function FormCadastroVideo() {
  const [titulo, setTitulo] = useState();
  const [briefing, setBriefing] = useState();
  const [orcamento, setOrcamento] = useState();
  const [entrega, setEntrega] = useState();
  const [idCliente, setIDCliente] = useState();
  const [clientes, setClientes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("http://localhost:3000/cliente")
      .then(({ data }) => {
        setClientes(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  function handleNovoVideo(e) {
    e.preventDefault();

    const data = {
      titulo,
      briefing,
      orcamento,
      entrega,
      idCliente,
      status: "pendente",
    };

    api
      .post("http://localhost:3000/video", data)
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <Container>
      <Titulo>Cadastro do vídeo</Titulo>
      <TituloMenor>Preencha as informações abaixo</TituloMenor>
      <Formulario onSubmit={handleNovoVideo}>
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
          onChange={(e) => setIDCliente(parseInt(e.target.value, 10))}
        >
          <option></option>

          {clientes.map((cliente) => (
            <option value={cliente.id} key={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </StyledSelect>

        <Button primary type="submit">
          Cadastrar
        </Button>
      </Formulario>
    </Container>
  );
}

export default FormCadastroVideo;
