import React from "react";

import OutButton from "../components/OutButton";
import FormEditarCliente from "../components/FormEditarCliente";

function EditarCliente() {
  return (
    <>
      <OutButton onde={"/clientes"}/>
      <FormEditarCliente />
    </>
  );
}

export default EditarCliente;
