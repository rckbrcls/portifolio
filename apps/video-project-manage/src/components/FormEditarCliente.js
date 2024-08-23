import React, { useState, useEffect } from "react";
import {
  Button,
  Formulario,
  Container,
  StyledInput,
  Titulo,
} from "../styles";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function FormEditarCliente() {
  const [id, setID] = useState();
  const [cnpj, setCnpj] = useState();
  const [nome, setNome] = useState();
  const [telefone, setTelefone] = useState();
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setCnpj(localStorage.getItem("CNPJ"));
    setNome(localStorage.getItem("Nome"));
    setTelefone(localStorage.getItem("Telefone"));
    setEmail(localStorage.getItem("Email"));
  }, []);

  function handleAtualizaCliente(e) {
    e.preventDefault();

    const data = {
      cnpj,
      nome,
      telefone,
      email,
    };

    api
      .put(`http://localhost:3000/cliente/${id}`, data)
      .then(() => {
        navigate("/clientes");
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <Container>
      <Titulo>Editar cliente</Titulo>
      <Formulario onSubmit={handleAtualizaCliente}>
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
          Atualizar
        </Button>
      </Formulario>
    </Container>
  );
}

export default FormEditarCliente;
