import React from "react";
import { GlobalStyle } from "./styles";
import Rotas from "./routes";

function App() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GlobalStyle />
      <Rotas />
    </div>
  );
}

export default App;
