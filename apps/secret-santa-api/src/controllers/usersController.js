import users from "../models/User.js";
import sortearAmigos from "../utils/sortearAmigos.js";
import validarEmail from "../utils/validarEmail.js";

// Classe responsável por controlar as requisições
class UserController {
  // Método responsável por listar todos os users
  static listarUsers = (req, res) => {
    users.find((err, users) => {
      res.status(200).json(users);
    });
  };

  // Método responsável por sortear os users
  static sortearUsers = (req, res) => {
    users.find((err, users) => {
      const sorteio = sortearAmigos(users);

      // Verifica se o número de participantes é par
      if (sorteio.length % 2 !== 0) {
        res.status(400).send({ message: "Número de participantes inválido" });
      } else {
        // Cria array de template para envio dos emails
        const amigosSorteados = sorteio.map((amigo) => {
          const { nome, email, amigoSecreto } = amigo;

          const templateParams = {
            user_name: nome,
            to_email: email,
            secret_friend: amigoSecreto.nome,
          };

          return templateParams;
        });

        res.status(200).send(amigosSorteados);
      }
    });
  };

  // Método responsável por listar um user por id
  static listarUserPorId = (req, res) => {
    const id = req.params.id;

    users.findById(id, (err, users) => {
      if (err) {
        res.status(400).send({ message: `${err} - Id do user não localizado` });
      } else {
        res.status(200).send(users);
      }
    });
  };

  // Método responsável por cadastrar um users
  static cadastrarUser = (req, res) => {
    let user = new users(req.body);

    // Valida se o email já existe
    validarEmail(user.email, (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        user.save((err) => {
          if (err) {
            res.status(500).send(err.message);
          } else {
            res.status(201).send(user.toJSON());
          }
        });
      }
    });
  };

  // Método responsável por atualizar um user
  static atualizarUser = (req, res) => {
    const id = req.params.id;

    users.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: "User atualizado com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  // Método responsável por excluir um user
  static excluirUser = (req, res) => {
    const id = req.params.id;

    users.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "User removido com sucesso" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}

export default UserController;
