import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TelaInicial from "./pages/TelaInicial";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import PaginaInexistente from "./pages/PaginaInexistente";
import Carrinho from "./pages/Carrinho";
import PedidoFinalizado from "./pages/PedidoFinalizado";
import Produtos from "./pages/Produtos";
function Rotas() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(TelaInicial, {}) }), _jsx(Route, { path: "/cadastro", element: _jsx(Cadastro, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/carrinho", element: _jsx(Carrinho, {}) }), _jsx(Route, { path: "/pedido-finalizado", element: _jsx(PedidoFinalizado, {}) }), _jsx(Route, { path: "/produtos", element: _jsx(Produtos, {}) }), _jsx(Route, { path: "*", element: _jsx(PaginaInexistente, {}) })] }) }));
}
export default Rotas;
