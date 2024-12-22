import React from "react";
import {Titulo, StyledLink, RoundButton, Container2 } from "../styles";

import { AiOutlineVideoCameraAdd } from "react-icons/ai";

function TituloVideo() {
  return (
      <Container2>
        <StyledLink to="/cadastro-video">
          <RoundButton primary>
            <AiOutlineVideoCameraAdd />
          </RoundButton>
        </StyledLink>

        <Titulo>Vídeos</Titulo>
        <p></p>
      </Container2>
  );
}

export default TituloVideo;
