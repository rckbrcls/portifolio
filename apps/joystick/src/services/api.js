import axios from "axios";

const DEFAULT_API = "http://localhost:3000";
// Resolve BASE_URL from Vite (import.meta.env) if available, then webpack DefinePlugin (process.env), then fallback
let resolvedBase;
try {
  // import.meta is available in ESM; if not, this will throw and be caught
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

export const atualizarToken = () => {
  api({
    method: "get",
    url: `/users`,
    headers: {
      "x-access-token": sessionStorage.getItem("token"),
    },
  })
    .then((data) => {
      api({
        method: "post",
        url: `/users/refresh-token`,
        headers: {
          "x-access-token": sessionStorage.getItem("token"),
        },
        data: {
          id: data.id,
        },
      })
        .then((otherData) => {
          sessionStorage.setItem("token", otherData.data.token);
        })
        .catch((erro) => {
          alert(erro);
        });
    })
    .catch((erro) => {
      alert(erro);
    });
};
export default api;
