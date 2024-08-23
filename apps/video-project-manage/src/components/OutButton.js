import React from "react";
import { RoundButton, StyledLink } from "../styles";

import { FaArrowAltCircleLeft } from "react-icons/fa";

function OutButton({onde}) {
  return (
    <StyledLink to={`${onde}`}>
      <RoundButton primary>
        <FaArrowAltCircleLeft />
      </RoundButton>
    </StyledLink>
  );
}

export default OutButton;
