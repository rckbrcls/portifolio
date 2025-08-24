import axios from "axios";

const DEFAULT_API = "http://localhost:3000";
let resolvedBase;
try {
  resolvedBase = import.meta.env && import.meta.env.VITE_API_URL;
} catch (e) {
  resolvedBase = undefined;
}
if (!resolvedBase && typeof process !== "undefined" && process.env && process.env.VITE_API_URL) {
  resolvedBase = process.env.VITE_API_URL;
}
const BASE_URL = resolvedBase || DEFAULT_API;

const api = axios.create({
  baseURL: BASE_URL,
});

// Debug help: show which base URL the frontend resolves to at runtime
// (will appear in browser console when this module is loaded)
try {
  // eslint-disable-next-line no-console
  console.log("secret-santa api baseURL:", BASE_URL);
} catch (e) {
  // ignore
}

export default api;
