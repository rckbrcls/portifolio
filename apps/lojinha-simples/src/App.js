import { jsx as _jsx } from "react/jsx-runtime";
import Rotas from "./routes";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store";
const queryClient = new QueryClient();
const App = () => {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(Provider, { store: store, children: _jsx(Rotas, {}) }) }));
};
export default App;
