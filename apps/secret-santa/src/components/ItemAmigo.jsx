import { Form, Button, Accordion, Overlay } from "react-bootstrap";
import { useState, useRef } from "react";
import styled from "styled-components";
import api from "../services/api";

// Estilização do componente
const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  background-color: #19af93;
  border: none;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

// Componente responsável por renderizar um item da lista de amigos
// e permitir a edição e exclusão de um usuário
// Recebe como parâmetro um objeto user

export default function ItemAmigo({ user }) {
  const [newUser, setNewUser] = useState({});
  const [show, setShow] = useState(false); // Exibe o sucesso
  const target = useRef(null); // Referência para o elemento que será exibido

  // Função responsável por deletar um usuário
  function handleApagarUsuario(id, e) {
    e.preventDefault();
    api.delete(`/users/${id}`).catch((error) => {
      alert(error);
    });
  }
  // Função responsável por atualizar um usuário
  function handleAtualizarUsuario(id, e) {
    e.preventDefault();
    setShow(!show);
    api.put(`/users/${id}`, newUser).catch((error) => {
      alert(error);
    });
  }

  return (
    <Accordion.Item eventKey={user._id}>
      <Accordion.Header>{user.nome}</Accordion.Header>
      <Accordion.Body>
        <Form onSubmit={(e) => handleAtualizarUsuario(user._id, e)}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome"
              defaultValue={user.nome}
              onChange={(e) => setNewUser({ ...newUser, nome: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              defaultValue={user.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </Form.Group>

          <StyledButton ref={target} variant="secondary" type="submit">
            Atualizar
          </StyledButton>
          <Overlay
            transition
            target={target.current}
            show={show}
            placement="top"
            onEntered={() => {
              setTimeout(() => {
                setShow(false);
              }, 2000);
            }}
          >
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
              <div
                {...props}
                style={{
                  backgroundColor: "#19af93c0",
                  padding: "2px 10px",
                  color: "white",
                  borderRadius: 3,
                  ...props.style,
                }}
              >
                Amigo atualizado com sucesso!
              </div>
            )}
          </Overlay>
          <StyledButton
            onClick={(e) => handleApagarUsuario(user._id, e)}
            variant="danger"
          >
            Excluir
          </StyledButton>
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  );
}
