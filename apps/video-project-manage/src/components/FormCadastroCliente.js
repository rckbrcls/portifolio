import React, { useState } from "react";
import {
  Button,
  Formulario,
  Container,
  StyledInput,
  Titulo,
  TituloMenor,
} from "../styles";

import { useNavigate } from "react-router-dom";
import api from "../services/api";

function FormCadastroCliente() {
  const [cnpj, setCnpj] = useState();
  const [nome, setNome] = useState();
  const [telefone, setTelefone] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  function handleNovoCliente(e) {
    e.preventDefault();

    const data = {
      cnpj,
      nome,
      telefone,
      email,
    };

    api
      .post("http://localhost:3000/cliente", data)
      .then(() => {
        navigate("/clientes");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <Container>
      <Titulo>Cadastro do cliente</Titulo>
      <TituloMenor>Preencha as informações abaixo</TituloMenor>
      <Formulario onSubmit={handleNovoCliente}>
        <StyledInput
          type={"number"}
          placeholder="CNPJ"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />
        <StyledInput
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <StyledInput
          type={"number"}
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />
        <StyledInput
          type={"email"}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button primary type="submit">
          Cadastrar
        </Button>
      </Formulario>
    </Container>
  );
}

export default FormCadastroCliente;
