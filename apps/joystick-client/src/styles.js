import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";

export const GlobalStyle = createGlobalStyle`
* {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: white;
  border: none;
  background: none;
}
`;

export const StyledTitulo = styled.h1`
  margin: ${(props) => (props.margem ? "50px 0px 10px 30px" : "10px")};
`;

export const StyledSubTitulo = styled.h3`
  margin: ${(props) => (props.margem ? "10px 0px 10px 30px" : "10px")};
  color: ${(props) => (props.cinza ? "#aaa" : "white")};
`;

export const StyledContainer = styled.body`
  background-color: #272650;
  position: absolute;
  min-height: 100%;
  min-width: 100%;
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

export const StyledCardLink = styled(Link)`
  display: block;
  height: 100%;
  width: 100%;
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const StyledCabecalho = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  margin: 20px;

  div {
    display: flex;
    align-items: center;
  }

  img {
    width: 40px;
    height: 40px;
    margin: 5px 20px;
  }
`;

export const StyledSearch = styled.div`
  display: flex;
  margin: auto 20px auto 2px;
  align-items: center;
  background: rgba(0, 0, 0, 0.35);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  padding: 13px;
  height: 12px;

  input {
    font-weight: 600;
    background: none;
  }

  button {
    margin: 7px;
  }
`;

export const StyledDestaque = styled.div`
  max-width: 80%;
  height: 500px;
  margin: 0 auto;

  background: linear-gradient(
    180deg,
    rgba(178, 173, 210, 0.29) 0%,
    rgba(191, 182, 252, 0.05) 100%
  );
  filter: drop-shadow(5px 5px 20px rgba(0, 0, 0, 0.25));
  backdrop-filter: blur(4px);
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);

  border-radius: 50px;
  display: flex;

  button {
    width: 90%;
    background: linear-gradient(180deg, #005eda 0%, #9100a9 138%);
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.125);
    border-radius: 56px;
  }

  p {
    color: white;
  }
`;

export const StyledJogo = styled.div`
  width: 40%;
  margin: 0 auto;

  background: linear-gradient(
    180deg,
    rgba(178, 173, 210, 0.29) 0%,
    rgba(191, 182, 252, 0.05) 100%
  );
  filter: drop-shadow(5px 5px 20px rgba(0, 0, 0, 0.25));
  backdrop-filter: blur(4px);
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);

  border-radius: 50px;
  display: flex;
  flex-direction: column;
  text-align: center;

  img {
    position: relative;
    z-index: -1;
    width: 100%;
    max-height: 40%;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
  }

  button {
    width: 90%;
    background: linear-gradient(180deg, #005eda 0%, #9100a9 138%);
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.125);
    border-radius: 56px;
    margin: 10px auto 30px;
  }

  p {
    color: white;
    margin: 20px;
  }
  div {
    margin: 10px auto;
  }
`;

export const StyledConteudo = styled.div`
  margin: 100px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const StyledGeneros = styled.div`
  display: flex;
  margin: 0px 0 20px;
`;

export const StyledCategoria = styled.div`
  padding: 5px;
  margin: 10px;
  font-weight: 600;
  font-size: small;
  background: linear-gradient(
    180deg,
    #9a5bff 0%,
    #62006f 137.99%,
    #f800ee 138%
  );
  box-shadow: 0px 2.87425px 2.87425px rgba(0, 0, 0, 0.25);
  border-radius: 40.2395px;
`;

export const StyledCardGame = styled.div`
  max-width: 100%;
  width: 600px;
  height: ${(props) => (props.baixo ? "200px" : "360px")};
  margin: 20px;
  flex: 1 1 600px;
  background: #222;
  position: relative;
  align-items: center;

  background: linear-gradient(
    180deg,
    rgba(178, 173, 210, 0.29) 0%,
    rgba(191, 182, 252, 0.05) 100%
  );
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  backdrop-filter: blur(4px);
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.25);

  border-radius: 50px;
  display: flex;

  img {
    height: 100%;
    border-bottom-left-radius: 50px;
    border-top-left-radius: 50px;
  }

  button {
    width: 100%;
    background: linear-gradient(180deg, #005eda 0%, #9100a9 138%);
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.125);
    border-radius: 56px;
  }

  p {
    margin: 20px;
  }
`;

export const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;

export const StyledForm = styled.form`
  margin: 0 auto;
  width: 50%;
  border-radius: 5px;
  text-align: center;

  h1 {
    margin: 50px auto 20px;
  }

  p {
    margin: 0px auto 15px;
  }

  label {
    font-weight: 600;
  }
`;

export const StyledProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 500px;
  margin: 30px auto;
`;

export const StyledInput = styled.input`
  background: #0b0339;
  box-shadow: 0px 2.87425px 2.87425px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2.87425px);

  color: white;
  height: 25px;
  width: 100%;
  padding: 5px 0px 5px 15px;
  font-weight: 600;
  border-radius: 100px;
  margin: 7px auto;
  transition: 0.5s;

  &:hover {
    background: #0b0360;
    transform: scale(1.05);
    transition: 0.5s;
  }
`;

export const StyledTextarea = styled.textarea`
  background: #0b0339;
  box-shadow: 0px 2.87425px 2.87425px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2.87425px);
  resize: none;
  color: white;
  height: 300px;
  width: 100%;
  padding: 15px 0px 5px 15px;
  font-weight: 600;
  border-radius: 20px;
  margin: 7px auto;
  transition: 0.5s;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  &:hover {
    background: #0b0360;
    transform: scale(1.05);
    transition: 0.5s;
  }
`;

export const StyledButton = styled.button`
  background: #0b0339;
  font-weight: 600;
  margin: ${(props) => (props.noMargin ? "0px" : "20px")};
  height: 35px;
  padding: 5px 0px 5px 15px;
  border-radius: 50px;
  box-shadow: 0px 2px 10px rgba(1, 1, 1, 0.3);
  min-width: ${(props) => (props.pequeno ? "300px" : "80%")};
  transition: 0.5s;

  &:hover {
    background: #0b0360;
    transform: scale(1.05);
    transition: 0.5s;
  }
`;

export const StyledRoundButton = styled.button`
  background: #0b0339;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  box-shadow: 0px 2px 10px rgba(1, 1, 1, 0.3);
  transition: 0.5s;
  margin: 0px 10px 0px 10px;

  &:hover {
    background: #0b0360;
    transform: scale(1.05);
    transition: 0.5s;
  }
`;

export const StyledFlex = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const MarginVert = styled.div`
  margin-top: 100px;
`;

export const StyledSelect = styled.select`
  background: #0b0339;
  box-shadow: 0px 2.87425px 2.87425px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2.87425px);

  color: white;
  height: 25px;
  width: 100%;
  padding: 15px;
  font-weight: 600;
  border-radius: 100px;
  margin: 7px auto;
  transition: 0.5s;

  &:hover {
    background: #aaa;
    transform: scale(1.05);
    transition: 0.5s;
  }

  option {
    text-align: center;
    color: white;
    font-weight: bold;
  }

  option:checked {
    font-weight: bold;
    color: #eee;
    background: #0b0390;
  }
`;
