import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CadastroCliente from "./pages/CadastroCliente";
import CadastroVideo from "./pages/CadastroVideo";
import EditarCliente from "./pages/EditarCliente";
import EditarVideo from "./pages/EditarVideo";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import PaginaInexistente from "./pages/PaginaInexistente";

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro-cliente" element={<CadastroCliente />} />
        <Route path="/cadastro-video" element={<CadastroVideo />} />
        <Route path="/editar-cliente" element={<EditarCliente />} />
        <Route path="/editar-video" element={<EditarVideo />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path='*' element={<PaginaInexistente />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
