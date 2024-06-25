import React from "react";

import OutButton from "../components/OutButton";
import FormEditarVideo from "../components/FormEditarVideo";

function EditarVideo() {
  return (
    <>
      <OutButton onde={"/home"}/>
      <FormEditarVideo />
    </>
  );
}

export default EditarVideo;
