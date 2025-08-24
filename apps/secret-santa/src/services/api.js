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

export default api;
