import React from "react";
import { Container, Typography, Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowCircleLeft } from "@mui/icons-material";
import { useAppSelector } from "../hooks";
import { cartState } from "../store/cartSlice";

function PaginaFinalizado() {
  const { subTotal } = useAppSelector(cartState);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Link
        to="/produtos"
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
      <Container maxWidth="lg" sx={{ mr: "12%" }}>
        <Typography
          variant="h3"
          align="center"
          sx={{ fontFamily: "Roboto", mt: "5%" }}
        >
          Seu pedido foi finalizado!
        </Typography>
        <Typography
          variant="h6"
          align="center"
          sx={{ fontFamily: "Roboto", mt: "3%", mb: "3%" }}
        >
          O valor total do seu pedido: {subTotal}
        </Typography>
      </Container>
    </Grid>
  );
}

export default PaginaFinalizado;
