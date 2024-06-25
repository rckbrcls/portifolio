import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ArrowCircleLeft } from "@mui/icons-material";

export interface IUser {
  nome: string;
  email: string;
  cpf: string;
  nascimento: string;
  senha: string;
}

function Cadastro() {
  const [user, setUser] = useState<IUser>({} as IUser);
  const navigation = useNavigate();

  function validateFields() {
    if (!user.nome) {
      alert(`O nome está vazio`);
      return false;
    }
    if (!user.email) {
      alert(`O e-mail está vazio`);
      return false;
    }
    if (!user.cpf) {
      alert(`O CPF está vazio`);
      return false;
    }
    if (!user.nascimento) {
      alert(`O nascimento está vazio`);
      return false;
    }
    if (!user.senha) {
      alert(`O senha está vazia`);
      return false;
    }
    return true;
  }

  function handleCadastro() {
    if (!validateFields()) return;
    sessionStorage.setItem("user", JSON.stringify(user));
    navigation("/produtos");
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          position: "absolute",
          left: 10,
          top: 10,
        }}
      >
        <IconButton>
          <ArrowCircleLeft />
        </IconButton>
      </Link>
      <Container sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h5" align="left" sx={{ fontWeight: "bold" }}>
          Cadastro
        </Typography>

        <TextField
          value={user.nome}
          onChange={(event) => {
            setUser((old) => {
              return { ...old, nome: event.target.value };
            });
          }}
          id="nome"
          label="Nome"
          fullWidth
          size="small"
        />
        <TextField
          value={user.email}
          onChange={(event) => {
            setUser((old) => {
              return { ...old, email: event.target.value };
            });
          }}
          id="email"
          label=" Email"
          type={"email"}
          fullWidth
          size="small"
        />
        <TextField
          value={user.cpf}
          onChange={(event) => {
            setUser((old) => {
              return { ...old, cpf: event.target.value };
            });
          }}
          id="CPF"
          label="CPF"
          fullWidth
          size="small"
        />
        <TextField
          value={user.nascimento}
          onChange={(event) => {
            setUser((old) => {
              return { ...old, nascimento: event.target.value };
            });
          }}
          id="DataDeNascimento"
          type={"date"}
          fullWidth
          size="small"
        />

        <TextField
          value={user.senha}
          onChange={(event) => {
            setUser((old) => {
              return { ...old, senha: event.target.value };
            });
          }}
          id="senha"
          label=" Senha"
          type={"password"}
          fullWidth
          size="small"
        />
        <Button onClick={() => handleCadastro()} variant="outlined" fullWidth>
          Cadastrar
        </Button>
      </Container>
    </Box>
  );
}

export default Cadastro;
