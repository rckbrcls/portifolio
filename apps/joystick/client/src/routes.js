import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Carrinho from "./pages/Carrinho";
import Biblioteca from "./pages/Biblioteca";
import Explorar from "./pages/Explorar";
import DetalheJogo from "./pages/DetalheJogo";
import CadastrarJogo from "./pages/CadastrarJogo";
import ListaDeJogosAdmin from "./pages/ListaDeJogosAdmin";
import EditarJogo from "./pages/EditarJogo";
import FinalizarCompra from "./pages/FinalizarCompra";

import RequireAuth from "./RequireAuth";

//  Para acessar as paginas de admin, digite a url
// (http://localhost:3001/lista-de-jogos) e (http://localhost:3001/cadastrar-jogo)

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/explorar" element={<Explorar />} />
        <Route path="/detalhe-jogo/:idJogo" element={<DetalheJogo />} />
        <Route path="/cadastrar-jogo" element={<CadastrarJogo />} />
        <Route path="/lista-de-jogos" element={<ListaDeJogosAdmin />} />
        <Route path="/editar-jogo/:id" element={<EditarJogo />} />
        <Route path="/finalizar-compra" element={<FinalizarCompra />} />
        <Route
          path="/perfil/"
          element={
            <RequireAuth>
              <Perfil />
            </RequireAuth>
          }
        />
        <Route
          path="/carrinho"
          element={
            <RequireAuth>
              <Carrinho />
            </RequireAuth>
          }
        />
        <Route
          path="/biblioteca"
          element={
            <RequireAuth>
              <Biblioteca />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default Rotas;
