import React from "react";
import { GlobalStyle } from "./styles";
import Rotas from "./routes";
import { AuthProvider } from "./providers/auth";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <AuthProvider>
        <GlobalStyle />
        <Rotas />
      </AuthProvider>
    </div>
  );
}

export default App;
