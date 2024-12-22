import React from "react";
import {
  Card,
  Titulo,
  TituloMenor,
  Box,
  Box2,
  StyledDiv,
  StyledDiv2,
  RoundButton,
  StyledLink,
} from "../styles";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function CardCliente({ cliente }, setData, onDelete) {
  return (
    <Card>
      <Box2>
        <StyledDiv>
          <Titulo>teste</Titulo>
          <TituloMenor>teste</TituloMenor>
        </StyledDiv>
        <StyledDiv2>
          <StyledLink to="/editar-cliente">
            <RoundButton onClick={() => setData(cliente)}>
              <AiFillEdit />
            </RoundButton>
          </StyledLink>
          <RoundButton onClick={() => onDelete(cliente.id)}>
            <AiFillDelete />
          </RoundButton>
        </StyledDiv2>
      </Box2>
      <Box>
        <Titulo>{cliente.nome}</Titulo>
        <TituloMenor>{cliente.telefone}</TituloMenor>
        <TituloMenor>{cliente.email}</TituloMenor>
        <TituloMenor>{cliente.cnpj}</TituloMenor>
      </Box>
    </Card>
  );
}

export default CardCliente;
