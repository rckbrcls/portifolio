import React from "react";
import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";

function PaginaInexistente() {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h3"
        align="center"
        sx={{ fontFamily: "Roboto", mt: "20%" }}
      >
        ERRO 404
      </Typography>
      <Typography
        variant="h6"
        align="center"
        sx={{ fontFamily: "Roboto", mt: "3%" }}
      >
        Página inxistente! aperte no botão abaixo para retornar à página
        inicial.
      </Typography>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button fullWidth color="primary" sx={{ mt: "6%", boxShadow: 5 }}>
          <Home />
        </Button>
      </Link>
    </Container>
  );
}

export default PaginaInexistente;
