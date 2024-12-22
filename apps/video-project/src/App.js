import React from "react";
import { GlobalStyle } from "./styles";
import Rotas from "./routes";
import { makeServer } from "./mirage/server";
import { store } from "./app/store";
import { Provider } from "react-redux";

if (
  process.env.NODE_ENV === "development" ||
  process.env.REACT_APP_USE_MOCKS === "true"
) {
  makeServer({ environment: "development" });
}

function App() {
  return (
    <div>
      <Provider store={store}>
        <GlobalStyle />
        <Rotas />
      </Provider>
    </div>
  );
}

export default App;
