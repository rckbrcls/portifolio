import axios from "axios";

const DEFAULT_API = "https://rgbwallet-api.erickbarcelos.com";
let resolvedBase;
try {
  resolvedBase = import.meta.env && import.meta.env.VITE_API_URL;
} catch (e) {
  resolvedBase = undefined;
}
if (
  !resolvedBase &&
  typeof process !== "undefined" &&
  process.env &&
  process.env.VITE_API_URL
) {
  resolvedBase = process.env.VITE_API_URL;
}
const BASE_URL = resolvedBase || DEFAULT_API;

const api = axios.create({
  baseURL: BASE_URL,
});
api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response &&
      error.response.status &&
      error.response.status === 401
    ) {
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
export default api;
