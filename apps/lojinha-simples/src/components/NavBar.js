import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppBar, Toolbar, Typography, Stack, IconButton, Button, Badge, } from "@mui/material";
import StorefrontTwoToneIcon from "@mui/icons-material/StorefrontTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { cartState } from "../store/cartSlice";
function NavBar() {
    const cart = useAppSelector(cartState);
    return (_jsx(AppBar, { sx: { height: "4rem" }, position: "static", children: _jsxs(Stack, { direction: "row", justifyContent: "space-between", alignItems: "center", height: "100%", spacing: 2, children: [_jsx(Toolbar, { children: _jsx(Link, { to: "/carrinho", children: _jsx(IconButton, { children: _jsx(Badge, { badgeContent: cart.quantity, color: "info", children: _jsx(ShoppingCartTwoToneIcon, { fontSize: "large", sx: { color: "#003d55" } }) }) }) }) }), _jsx(Toolbar, { children: _jsx(Link, { to: "/produtos", style: { textDecoration: "none" }, children: _jsx(Button, { startIcon: _jsx(StorefrontTwoToneIcon, { fontSize: "large", sx: { color: "#003d55" } }), children: _jsx(Typography, { variant: "h5", color: "#003d55", children: "Lojinha" }) }) }) }), _jsx(Toolbar, { children: _jsx(Link, { to: "/", children: _jsx(IconButton, { children: _jsx(LogoutTwoToneIcon, { fontSize: "large", sx: { color: "#003d55" } }) }) }) })] }) }));
}
export default NavBar;
