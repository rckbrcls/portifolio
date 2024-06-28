import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import NavBar from "../components/NavBar";
import { Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { cartState, cleanCart } from "../store/cartSlice";
import Produto from "../components/Produto";
import AlertComponent from "../components/Alert/Alert";
import { useControlVisibilityAlert } from "../components/Alert/hooks";
function Produtos() {
    const cart = useAppSelector(cartState);
    const dispatch = useAppDispatch();
    const control = useControlVisibilityAlert(dispatch);
    const navigate = useNavigate();
    function handleOnFinishOrder() {
        if (cart.subTotal > 0) {
            dispatch(cleanCart());
            navigate("/pedido-finalizado");
        }
        else
            control("Carrinho vazio", "info");
    }
    function handleCleanCart() {
        dispatch(cleanCart());
        control("Carrinho esvaziado", "error");
    }
    return (_jsxs(_Fragment, { children: [_jsx(NavBar, {}), _jsxs("div", { style: {
                    padding: "40px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    minHeight: "calc(100svh - 7rem - 40px)",
                    justifyContent: "space-between",
                }, children: [_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 40 }, children: [_jsx(Typography, { variant: "h5", children: "Seu carrinho de compras:" }), _jsx(Grid, { direction: "row", justifyContent: "start", alignItems: "center", container: true, spacing: 4, columns: { xs: 2, sm: 8, md: 12 }, children: cart.subTotal !== 0 ? (cart.products.map((item, Key) => (_jsx(Grid, { item: true, xs: 2, sm: 4, md: 4, children: _jsx(Produto, { produto: item, isCartView: true }) }, Key)))) : (_jsx(Grid, { item: true, xs: 2, sm: 4, md: 4, children: _jsx(Typography, { variant: "h5", children: "Nada por aqui..." }) })) })] }), _jsxs("div", { style: {
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 10,
                        }, children: [_jsx(Button, { onClick: () => handleCleanCart(), color: "error", variant: "contained", children: "Esvaziar carrinho" }), _jsxs("div", { style: { display: "flex", gap: 20, alignItems: "center" }, children: [_jsxs(Typography, { variant: "h6", children: ["Subtotal: ", cart.subTotal] }), _jsx(Button, { onClick: () => handleOnFinishOrder(), variant: "contained", children: "Finalizar compra" })] })] })] }), _jsx(AlertComponent, {})] }));
}
export default Produtos;
