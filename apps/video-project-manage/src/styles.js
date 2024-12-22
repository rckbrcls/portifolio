import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  font-family: "Roboto";
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-weight: 600;
  background: #eee;
}
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  background: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const Container = styled.div`
  text-align: center;
  width: 100%;
  margin: 0px 0;
  display: grid;
  grid-gap: 20px;
`;

export const Titulo = styled.h1`
  background: none;
  color: #333;
  font-size: clamp(1em, 1em + 1vw, 1.5em);
`;

export const TituloMenor = styled.h4`
  background: none;
  color: #555;
`;

export const StyledLabel = styled.label`
  background: none;
  color: #555;
`;

export const StyledCabecalho = styled.header`
  background-color: #64cac5;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
  flex-wrap: wrap;

  img {
    margin: 0px;
  }
`;

export const StyledNav = styled.nav`
  display: flex;
  background: none;

  button {
    margin: 10px;
  }
`;

export const Button = styled.button`
  background: ${(props) => (props.primary ? "#64cac5" : "white")};
  color: ${(props) => (props.primary ? "white" : "#64cac5")};

  font-size: 17px;
  margin: 10px 2%;
  padding: 0.6em 2em;
  border: 0;
  border-radius: 50px;
  box-shadow: 0px 2px 10px rgba(1, 1, 1, 0.3);
  width: 80%;
  transition: 0.5s;

  &:hover {
    background: #105b72c2;
    transform: scale(1.05);
    transition: 0.5s;
  }

  svg {
    background: none;
    width: 30px;
    height: 30px;
  }
`;

export const RoundButton = styled.button`
  background: ${(props) => (props.primary ? "#64cac5" : "white")};
  color: ${(props) => (props.primary ? "white" : "#64cac5")};

  margin: 2%;
  border: 0 none;
  border-radius: 50%;
  box-shadow: 0px 2px 10px rgba(1, 1, 1, 0.3);
  min-width: 50px;
  min-height: 50px;
  transition: 0.5s;

  &:hover {
    background: #105b72c2;
    transform: scale(1.2);
    transition: 0.5s;
  }

  svg {
    background: none;
    width: 30px;
    height: 30px;
  }
`;

export const Formulario = styled.form`
  padding: 10px;
  margin: 0 auto;
  background: #eee;
  width: 40%;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(1, 1, 1, 0.3);
`;

export const StyledInput = styled.input`
  border-radius: 50px;
  padding: 10px;
  border: 0 none;
  background: #eee;
  box-shadow: 0px 2px 10px rgba(1, 1, 1, 0.3);
  width: 80%;
  margin: 10px 2%;
  transition: 0.5s;

  &:hover {
    background: #ddd;
    transform: scale(1.05);
    transition: 0.5s;
  }
`;

export const StyledTextArea = styled.textarea`
  border-radius: 10px;
  padding: 10px;
  border: 0 none;
  background: #eee;
  box-shadow: 0px 2px 10px rgba(1, 1, 1, 0.3);
  width: 80%;
  height: 100px;
  margin: 10px 2%;
  resize: none;
  transition: 0.5s;

  &:hover {
    background: #ddd;
    transform: scale(1.05);
    transition: 0.5s;
  }
`;

export const DivData = styled.div`
  margin: 10px 0;
`;

export const LogoImage = styled.img`
  width: ${(props) => (props.pequeno ? "5%" : "10%")};
  width: ${(props) => (props.pequeno ? "70px" : "115px")};

  margin: auto;
  background: #64cac5;
  border-radius: 50%;
  box-shadow: 0px 2px 10px rgba(1, 1, 1, 0.5);
  display: block;
  transition: 0.5s;

  &:hover {
    transform: rotate(0.3turn);
    transition: 0.5s;
  }
`;

export const Box = styled.div`
  border-radius: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  padding: 30px;
  width: 100%;
  height: 100%;
  position: absolute;
  transition: 0.5s;
`;

export const Box2 = styled.div`
  border-radius: 30px;
  padding: 30px;
  width: 100%;
  height: 7.5em;
  bottom: 0;
  position: absolute;
  background: none;
  display: flex;
  justify-content: space-between;

  h1 {
    color: #eee;
  }

  h4 {
    color: #ddd;
  }
`;

export const Card = styled.div`
  border-radius: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  margin: 20px;
  flex: 1 1 400px;
  min-width: 340px;
  min-height: 200px;
  background: #222;
  position: relative;

  &:hover {
    ${Box} {
      transform: translateY(-7em);
      transition: 0.5s;
    }
  }
`;

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1200px
  background: none;
  margin: 0 auto;
`;

export const Container2 = styled(Container)`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

export const StyledDiv = styled.div`
  background: none;
`;

export const StyledDiv2 = styled.div`
  background: none;
  display: flex;

  button {
    margin: 5px;
    width: 50px;
    height: 50px;
  }
`;

export const Image = styled.img`
  margin: 0 auto;
  width: 400px;
  height: 400px;
`;

export const StyledSelect = styled.select`
  border-radius: 50px;
  padding: 10px;
  border: 0 none;
  background: #eee;
  box-shadow: 0px 2px 10px rgba(1, 1, 1, 0.3);
  width: 80%;
  margin: 10px 2%;
  transition: 0.5s;
  font-size: 15px;

  &:hover {
    background: #ddd;
    transform: scale(1.05);
    transition: 0.5s;
  }

  option {
    text-align: center;
    color: black;
    font-weight: bold;
    
  }

  option:checked {
    font-weight: bold;
    color: #eee;
    background: #555;
  }
  
`;
