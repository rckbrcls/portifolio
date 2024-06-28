import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Typography, Grid, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowCircleLeft } from "@mui/icons-material";
import { useAppSelector } from "../hooks";
import { cartState } from "../store/cartSlice";
function PaginaFinalizado() {
    const { subTotal } = useAppSelector(cartState);
    return (_jsxs(Grid, { container: true, direction: "row", justifyContent: "space-between", alignItems: "flex-start", children: [_jsx(Link, { to: "/produtos", style: {
                    textDecoration: "none",
                    position: "absolute",
                    left: 10,
                    top: 10,
                }, children: _jsx(IconButton, { children: _jsx(ArrowCircleLeft, {}) }) }), _jsxs(Container, { maxWidth: "lg", sx: { mr: "12%" }, children: [_jsx(Typography, { variant: "h3", align: "center", sx: { fontFamily: "Roboto", mt: "5%" }, children: "Seu pedido foi finalizado!" }), _jsxs(Typography, { variant: "h6", align: "center", sx: { fontFamily: "Roboto", mt: "3%", mb: "3%" }, children: ["O valor total do seu pedido: ", subTotal] })] })] }));
}
export default PaginaFinalizado;
