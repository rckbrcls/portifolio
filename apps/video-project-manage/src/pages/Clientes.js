import React from "react";

import Cabecalho from "../components/Cabecalho";
import TituloCliente from "../components/TituloCliente";
import ListaCliente from "../components/ListaCliente";

function Clientes() {
  return (
    <>
      <Cabecalho />
      <TituloCliente/>
      <ListaCliente/>
    </>
  );
}

export default Clientes;
