import React from "react";
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

function CardVideo({
  TituloDoVideo,
  Cliente,
  Telefone,
  Entrega,
  Orcamento,
  Status,
}) {
  return (
    <Card>
      <Box2>
        <StyledDiv>
          <Titulo>{Cliente}</Titulo>
          <TituloMenor>{Telefone}</TituloMenor>
        </StyledDiv>
        <StyledDiv2>
          <StyledLink to="/editar-video">
            <RoundButton>
              <AiFillEdit />
            </RoundButton>
          </StyledLink>
          <RoundButton>
            <AiFillDelete />
          </RoundButton>
        </StyledDiv2>
      </Box2>
      <Box>
        <Titulo>{TituloDoVideo}</Titulo>
        <TituloMenor>{Entrega}</TituloMenor>
        <TituloMenor>{Orcamento}</TituloMenor>
        <TituloMenor>{Status}</TituloMenor>
      </Box>
    </Card>
  );
}

export default CardVideo;
