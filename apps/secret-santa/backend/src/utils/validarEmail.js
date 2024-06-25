import users from "../models/User.js";

// Função que recebe um email e retorna um erro caso o email já esteja cadastrado
export default function validarEmail(email, callback) {
  users.findOne({ email: email }, (err, res) => {
    if (res && res.email === email) {
      callback(new Error("Email já cadastrado"));
    } else {
      callback(null);
    }
  });
}
