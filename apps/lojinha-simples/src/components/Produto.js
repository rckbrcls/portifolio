import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Paper, styled } from "@mui/material";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
import RemoveShoppingCartTwoToneIcon from "@mui/icons-material/RemoveShoppingCartTwoTone";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addItem, removeItem, cartState } from "../store/cartSlice";
import { useControlVisibilityAlert } from "./Alert/hooks";
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: "50px 20px 20px",
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "250px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
}));
const ProdutoCard = ({ produto, isCartView = false }) => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(cartState);
    const control = useControlVisibilityAlert(dispatch);
    function addItemCart() {
        const isExist = cart.products.find((item) => item.id === produto.id);
        if (isExist) {
            control("Produto já está no carrinho", "info");
            return;
        }
        control("Produto adicionado ao carrinho", "success");
        dispatch(addItem(produto));
    }
    function removeItemCart() {
        control("Produto removido do carrinho", "error");
        dispatch(removeItem(produto));
    }
    function handlePressButton() {
        if (isCartView)
            removeItemCart();
        else
            addItemCart();
    }
    const buttonColor = isCartView ? "error" : "primary";
    return (_jsxs(Item, { children: [_jsx("img", { width: "150px", height: "150px", className: "ProdImg", src: produto.image, alt: produto.title }), _jsx("h3", { children: produto.title }), _jsxs("div", { style: {
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "space-between",
                }, children: [_jsxs("h2", { style: { whiteSpace: "nowrap" }, children: ["R$ ", produto.price] }), _jsx(Button, { color: buttonColor, variant: "contained", onClick: () => handlePressButton(), children: isCartView ? (_jsx(RemoveShoppingCartTwoToneIcon, {})) : (_jsx(AddShoppingCartTwoToneIcon, {})) })] })] }));
};
export default ProdutoCard;
