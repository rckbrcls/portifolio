import React from "react";
import {
  StyledCabecalho,
  StyledLink,
  StyledRoundButton,
  StyledSearch,
  StyledSubTitulo,
} from "../styles";
import ImgControle from "../assets/controle-de-video-game.png";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

export default function Cabecalho() {
  return (
    <>
      <StyledCabecalho>
        <div>
          <StyledLink to="/">
            <img src={ImgControle} alt="Logo" />
          </StyledLink>

          <StyledSearch>
            <input type="text" placeholder="Buscar" name="search" />
            <button type="submit">
              <FaSearch />
            </button>
          </StyledSearch>
          <StyledLink to="/">
            <StyledSubTitulo>Home</StyledSubTitulo>
          </StyledLink>
          <StyledLink to="/explorar">
            <StyledSubTitulo>Explorar</StyledSubTitulo>
          </StyledLink>
          <StyledLink to={`/biblioteca`}>
            <StyledSubTitulo>Biblioteca</StyledSubTitulo>
          </StyledLink>
        </div>

        <div>
          <StyledLink to={`/carrinho`}>
            <StyledRoundButton>
              <FaShoppingCart />
            </StyledRoundButton>
          </StyledLink>
          <StyledLink to={`/perfil`}>
            <StyledRoundButton>
              <FaUser />
            </StyledRoundButton>
          </StyledLink>
        </div>
      </StyledCabecalho>
    </>
  );
}
