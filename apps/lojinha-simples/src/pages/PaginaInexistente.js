import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";
function PaginaInexistente() {
    return (_jsxs(Container, { maxWidth: "sm", children: [_jsx(Typography, { variant: "h3", align: "center", sx: { fontFamily: "Roboto", mt: "20%" }, children: "ERRO 404" }), _jsx(Typography, { variant: "h6", align: "center", sx: { fontFamily: "Roboto", mt: "3%" }, children: "P\u00E1gina inxistente! aperte no bot\u00E3o abaixo para retornar \u00E0 p\u00E1gina inicial." }), _jsx(Link, { to: "/", style: { textDecoration: "none" }, children: _jsx(Button, { fullWidth: true, color: "primary", sx: { mt: "6%", boxShadow: 5 }, children: _jsx(Home, {}) }) })] }));
}
export default PaginaInexistente;
