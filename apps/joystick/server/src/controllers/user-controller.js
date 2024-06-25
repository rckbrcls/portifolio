"use strict";

const repository = require("../repositories/user-repository");
const md5 = require("md5");
const authService = require("../services/auth-service");

exports.post = async (req, res, next) => {
  console.log("Method Post User");
  try {
    await repository.create({
      id: Math.random() * 100,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
      password: md5(req.body.password + global.SALT_KEY),
    });

    res.status(201).send({
      message: "Cliente cadastrado com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.authenticate = async (req, res, next) => {
  console.log("Method authenticate");
  try {
    const user = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY),
    });

    if (!user) {
      res.status(404).send({
        message: "Usuário ou senha inválidos",
      });
      return;
    }

    const token = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
      games: user.games,
      cart: user.cart,
      isAdmin: user.isAdmin,
    });

    res.status(201).send({
      token: token,
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);

    const user = await repository.getById(data.id);

    if (!user) {
      res.status(404).send({
        message: "Cliente não encontrado",
      });
      return;
    }

    const tokenData = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
      games: user.games,
      cart: user.cart,
      isAdmin: user.isAdmin,
    });

    res.status(201).send({
      token: tokenData,
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.get = async (req, res, next) => {
  console.log("Controller Get User");
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    console.log(token);
    const data = await authService.decodeToken(token);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    res.status(200).send(data.cart);
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.getLibrary = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    res.status(200).send(data.games);
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    let body = req.body;
    req.body.password &&
      (body.password = md5(req.body.password + global.SALT_KEY));
    repository.update(data.id, body);

    res.status(200).send({
      message: "Usuário atualizado com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.putGame = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    repository.insertGame(data.id, req.params.game);

    res.status(200).send({
      message: "Jogo adicionado com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.deleteGame = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    let cart = data.cart;
    cart = cart.filter((value) => {
      return value != req.params.game;
    });
    repository.updateCart(data.id, cart);

    this.refreshToken(req, res, next);
    res.status(200).send({
      message: "Jogo removido com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.cleanCart = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    repository.updateCart(data.id, []);

    res.status(200).send({
      message: "Carrinho limpo!",
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.finish = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    console.log(data);
    repository.buyGame(data.id, data.cart);
    repository.updateCart(data.id, []);
    res.status(200).send({
      message: "Compra finalizada com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};
