import Rotas from "./routes";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "./store/store";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Rotas />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
