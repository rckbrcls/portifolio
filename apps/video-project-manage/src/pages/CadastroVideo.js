import React from "react";

import OutButton from "../components/OutButton";
import FormCadastroVideo from "../components/FormCadastroVideo";

function CadastroVideo() {
  return (
    <>
      <OutButton onde={"/home"}/>
      <FormCadastroVideo />
    </>
  );
}

export default CadastroVideo;
