import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Grid, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
function TelaIncial() {
    return (_jsxs(Grid, { container: true, sx: { mt: "10%" }, direction: "column", justifyContent: "center", alignItems: "center", children: [_jsx(StorefrontTwoToneIcon, { sx: { width: "10%", height: "10%", color: "#22bffd" } }), _jsx(Typography, { variant: "h4", align: "center", sx: { mt: "1rem", fontWeight: "700" }, children: "Bem vindo \u00E0 Lojinha!" }), _jsx(Typography, { variant: "h6", align: "center", sx: { mt: "1rem" }, children: "Fa\u00E7a seu cadastro! Se j\u00E1 possui conta, fa\u00E7a seu login abaixo." }), _jsxs(Container, { maxWidth: "xs", sx: { mt: "1rem" }, children: [_jsx(Link, { to: "/cadastro", style: { textDecoration: "none" }, children: _jsx(Button, { sx: { mt: "0.5rem" }, variant: "outlined", fullWidth: true, children: "Cadastro" }) }), _jsx(Link, { to: "/login", style: { textDecoration: "none" }, children: _jsx(Button, { sx: { mt: "0.5rem" }, variant: "outlined", fullWidth: true, children: "Login" }) })] })] }));
}
export default TelaIncial;
