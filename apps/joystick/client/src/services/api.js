import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const atualizarToken = () => {
  api({
    method: "get",
    url: `http://localhost:3000/users`,
    headers: {
      "x-access-token": sessionStorage.getItem("token"),
    },
  })
    .then((data) => {
      api({
        method: "post",
        url: `http://localhost:3000/users/refresh-token`,
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
