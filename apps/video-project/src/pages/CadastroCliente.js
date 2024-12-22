import React from "react";

import OutButton from "../components/OutButton";
import FormCadastroCliente from "../components/FormCadastroCliente";

function CadastroCliente() {
  return (
    <>
      <OutButton onde={"/clientes"}/>
      <FormCadastroCliente />
    </>
  );
}

export default CadastroCliente;
