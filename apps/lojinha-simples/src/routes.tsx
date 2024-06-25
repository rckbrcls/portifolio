import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TelaInicial from "./pages/TelaInicial";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import PaginaInexistente from "./pages/PaginaInexistente";
import Carrinho from "./pages/Carrinho";
import PedidoFinalizado from "./pages/PedidoFinalizado";
import Produtos from "./pages/Produtos";

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/pedido-finalizado" element={<PedidoFinalizado />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="*" element={<PaginaInexistente />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
