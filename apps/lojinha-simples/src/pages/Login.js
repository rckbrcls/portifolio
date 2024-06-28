import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TextField, Button, Container, Typography, Box, IconButton, } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowCircleLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erros, setErros] = useState("");
    const navigate = useNavigate();
    function onChange(ev) {
        const { name, value } = ev.target;
        setErros("");
        if (name === "email")
            setEmail(value);
        if (name === "senha")
            setSenha(value);
    }
    function validate(email, senha) {
        let erros;
        if (email === "")
            erros = "Insira um email válido";
        else if (senha === "")
            erros = "Insira uma senha válida";
        else
            erros = "Email e/ou senha incorretos";
        return erros;
    }
    function onSubmit(ev) {
        ev.preventDefault();
        if (email === "erick" && senha === "123")
            navigate("/produtos");
        else
            setErros(validate(email, senha));
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
                }, children: _jsx(IconButton, { children: _jsx(ArrowCircleLeft, {}) }) }), _jsxs(Container, { maxWidth: "sm", sx: { display: "flex", flexDirection: "column", gap: 2 }, children: [_jsx(Typography, { variant: "h5", align: "left", sx: { fontWeight: "bold" }, children: "Login" }), _jsxs("form", { style: { display: "flex", flexDirection: "column", gap: 10 }, onSubmit: onSubmit, children: [_jsx(TextField, { name: "email", onChange: onChange, label: "Email", variant: "outlined", size: "small", fullWidth: true }), _jsx(TextField, { name: "senha", onChange: onChange, label: "Senha", variant: "outlined", type: "password", size: "small", fullWidth: true }), _jsx("label", { style: { color: "red" }, children: erros }), _jsx(Button, { fullWidth: true, type: "submit", variant: "outlined", children: "Login" })] })] })] }));
}
export default Login;
