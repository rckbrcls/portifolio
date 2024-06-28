import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TextField, Button, Container, Typography, Box, IconButton, } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ArrowCircleLeft } from "@mui/icons-material";
function Cadastro() {
    const [user, setUser] = useState({});
    const navigation = useNavigate();
    function validateFields() {
        if (!user.nome) {
            alert(`O nome está vazio`);
            return false;
        }
        if (!user.email) {
            alert(`O e-mail está vazio`);
            return false;
        }
        if (!user.cpf) {
            alert(`O CPF está vazio`);
            return false;
        }
        if (!user.nascimento) {
            alert(`O nascimento está vazio`);
            return false;
        }
        if (!user.senha) {
            alert(`O senha está vazia`);
            return false;
        }
        return true;
    }
    function handleCadastro() {
        if (!validateFields())
            return;
        sessionStorage.setItem("user", JSON.stringify(user));
        navigation("/produtos");
    }
    return (_jsxs(Box, { sx: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }, children: [_jsx(Link, { to: "/", style: {
                    textDecoration: "none",
                    position: "absolute",
                    left: 10,
                    top: 10,
                }, children: _jsx(IconButton, { children: _jsx(ArrowCircleLeft, {}) }) }), _jsxs(Container, { sx: { display: "flex", flexDirection: "column", gap: 2 }, children: [_jsx(Typography, { variant: "h5", align: "left", sx: { fontWeight: "bold" }, children: "Cadastro" }), _jsx(TextField, { value: user.nome, onChange: (event) => {
                            setUser((old) => {
                                return { ...old, nome: event.target.value };
                            });
                        }, id: "nome", label: "Nome", fullWidth: true, size: "small" }), _jsx(TextField, { value: user.email, onChange: (event) => {
                            setUser((old) => {
                                return { ...old, email: event.target.value };
                            });
                        }, id: "email", label: " Email", type: "email", fullWidth: true, size: "small" }), _jsx(TextField, { value: user.cpf, onChange: (event) => {
                            setUser((old) => {
                                return { ...old, cpf: event.target.value };
                            });
                        }, id: "CPF", label: "CPF", fullWidth: true, size: "small" }), _jsx(TextField, { value: user.nascimento, onChange: (event) => {
                            setUser((old) => {
                                return { ...old, nascimento: event.target.value };
                            });
                        }, id: "DataDeNascimento", type: "date", fullWidth: true, size: "small" }), _jsx(TextField, { value: user.senha, onChange: (event) => {
                            setUser((old) => {
                                return { ...old, senha: event.target.value };
                            });
                        }, id: "senha", label: " Senha", type: "password", fullWidth: true, size: "small" }), _jsx(Button, { onClick: () => handleCadastro(), variant: "outlined", fullWidth: true, children: "Cadastrar" })] })] }));
}
export default Cadastro;
