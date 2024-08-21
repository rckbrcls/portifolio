import { Container, Accordion } from "react-bootstrap";
import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../services/api";
import ItemAmigo from "./ItemAmigo";

// Estilização do componente
const StyledContainer = styled(Container)`
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: #fbfbfb;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  max-width: 60%;
`;

const StyledTitle = styled.h2`
  text-align: center;
`;

// Componente responsável por listar todos os usuários cadastrados
export default function ListaUsers() {
  const [users, setUsers] = useState([]);

  // Função responsável por buscar todos os usuários cadastrados
  useEffect(() => {
    api
      .get("/users")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [users]);

  return (
    <StyledContainer>
      {users == 0 ? (
        <StyledTitle>Sem nenhum amigo secreto</StyledTitle>
      ) : (
        <StyledTitle>Amigos</StyledTitle>
      )}

      <Accordion>
        {users ? (
          users.map((user) => <ItemAmigo key={user._id} user={user} />)
        ) : (
          <></>
        )}
      </Accordion>
    </StyledContainer>
  );
}
