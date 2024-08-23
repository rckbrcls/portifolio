import React from "react";
import {
  LogoImage,
  StyledCabecalho,
  StyledNav,
  StyledLink,
  RoundButton,
} from "../styles";

import { FaUsers, FaVideo, FaArrowAltCircleRight } from "react-icons/fa";
import Logo from "../assets/fotografo.png";

function Cabecalho() {
  return (
    <StyledCabecalho>
      <LogoImage pequeno src={Logo} alt="video" />

      <StyledNav>
        <StyledLink to="/clientes">
          <RoundButton>
            <FaUsers />
          </RoundButton>
        </StyledLink>

        <StyledLink to="/home">
          <RoundButton>
            <FaVideo />
          </RoundButton>
        </StyledLink>

        <StyledLink to="/">
          <RoundButton>
            <FaArrowAltCircleRight />
          </RoundButton>
        </StyledLink>
      </StyledNav>
    </StyledCabecalho>
  );
}

export default Cabecalho;
