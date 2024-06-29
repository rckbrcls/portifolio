import React from "react";
import Rotas from "./routes";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Rotas />
        </Provider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
