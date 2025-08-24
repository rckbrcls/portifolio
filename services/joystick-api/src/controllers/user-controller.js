"use strict";

const repository = require("../repositories/user-repository");
const md5 = require("md5");
const authService = require("../services/auth-service");

exports.post = async (req, res, next) => {
  console.log("Controller.post - start");
  try {
    const sanitized = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      isAdmin: req.body.isAdmin,
    };
    console.log("Controller.post - payload (sanitized):", sanitized);

    const newUser = {
      id: Math.random() * 100,
      ...sanitized,
      password: md5(req.body.password),
    };

    console.log("Controller.post - creating user with id:", newUser.id);
    await repository.create(newUser);
    console.log("Controller.post - user created:", sanitized.username);

    res.status(201).send({
      message: "Cliente cadastrado com sucesso!",
    });
  } catch (e) {
    console.error("Controller.post - error:", e);
    res.status(500).send({
      message: e,
    });
  }
};

exports.authenticate = async (req, res, next) => {
  console.log("Controller.authenticate - start");
  try {
    console.log("Controller.authenticate - attempt for email:", req.body.email);
    const user = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password),
    });

    if (!user) {
      console.warn("Controller.authenticate - invalid credentials for:", req.body.email);
      res.status(404).send({
        message: "Usuário ou senha inválidos",
      });
      return;
    }

    console.log("Controller.authenticate - user found:", user.email);
    const token = await authService.generateToken({
      id: user._id,
      email: user.email,
      name: user.name,
      username: user.username,
      games: user.games,
      cart: user.cart,
      isAdmin: user.isAdmin,
    });
    console.log("Controller.authenticate - token generated for:", user.email);

    res.status(201).send({
      token: token,
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    console.error("Controller.authenticate - error:", e);
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};

exports.refreshToken = async (req, res, next) => {
  console.log("Controller.refreshToken - start");
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    console.log("Controller.refreshToken - token received:", token ? `${String(token).slice(0, 10)}...` : "none");

    const data = await authService.decodeToken(token);
    console.log("Controller.refreshToken - decoded token data:", { id: data && data.id, email: data && data.email });

    const user = await repository.getById(data.id);

    if (!user) {
      console.warn("Controller.refreshToken - user not found for id:", data.id);
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

    console.log("Controller.refreshToken - new token generated for user:", user.email);
    res.status(201).send({
      token: tokenData,
      data: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (e) {
    console.error("Controller.refreshToken - error:", e);
    res.status(500).send({
      message: e,
    });
  }
};

exports.get = async (req, res, next) => {
  console.log("Controller.get - start");
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    console.log("Controller.get - token received:", token ? `${String(token).slice(0, 10)}...` : "none");
    const data = await authService.decodeToken(token);
    console.log("Controller.get - decoded data:", { id: data && data.id, email: data && data.email });
    res.status(200).send(data);
  } catch (e) {
    console.error("Controller.get - error:", e);
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};

exports.getCart = async (req, res, next) => {
  console.log("Controller.getCart - start");
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    console.log("Controller.getCart - cart size:", data && data.cart ? data.cart.length : 0);
    res.status(200).send(data.cart);
  } catch (e) {
    console.error("Controller.getCart - error:", e);
    res.status(500).send({
      message: e,
    });
  }
};

exports.getLibrary = async (req, res, next) => {
  console.log("Controller.getLibrary - start");
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    console.log("Controller.getLibrary - games count:", data && data.games ? data.games.length : 0);
    res.status(200).send(data.games);
  } catch (e) {
    console.error("Controller.getLibrary - error:", e);
    res.status(500).send({
      message: e,
    });
  }
};

exports.update = async (req, res, next) => {
  console.log("Controller.update - start");
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    console.log("Controller.update - user id from token:", data && data.id);

    let body = req.body;
    if (req.body.password) {
      body.password = md5(req.body.password);
      console.log("Controller.update - password will be updated (hashed).");
    }
    console.log("Controller.update - update payload keys:", Object.keys(body));
    await repository.update(data.id, body);
    console.log("Controller.update - update request sent to repository for id:", data.id);

    res.status(200).send({
      message: "Usuário atualizado com sucesso!",
    });
  } catch (e) {
    console.error("Controller.update - error:", e);
    res.status(500).send({
      message: e,
    });
  }
};

exports.putGame = async (req, res, next) => {
  console.log("Controller.putGame - start");
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    console.log("Controller.putGame - adding game:", req.params.game, "to user id:", data && data.id);

    await repository.insertGame(data.id, req.params.game);
    console.log("Controller.putGame - repository.insertGame completed for:", req.params.game);

    res.status(200).send({
      message: "Jogo adicionado com sucesso!",
    });
  } catch (e) {
    console.error("Controller.putGame - error:", e);
    res.status(500).send({
      message: e,
    });
  }
};

exports.deleteGame = async (req, res, next) => {
  console.log("Controller.deleteGame - start");
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    console.log("Controller.deleteGame - user id:", data && data.id, "removing game:", req.params.game);

    let cart = data.cart || [];
    const newCart = cart.filter((value) => {
      return value != req.params.game;
    });
    console.log("Controller.deleteGame - new cart size:", newCart.length);

    await repository.updateCart(data.id, newCart);
    console.log("Controller.deleteGame - repository.updateCart completed for id:", data.id);

    // refreshToken will send a response, so call it first
    await this.refreshToken(req, res, next);
    console.log("Controller.deleteGame - refreshToken called");

    // still send an acknowledgment if refreshToken didn't end response
    if (!res.headersSent) {
      res.status(200).send({
        message: "Jogo removido com sucesso!",
      });
    } else {
      console.log("Controller.deleteGame - response already sent by refreshToken");
    }
  } catch (e) {
    console.error("Controller.deleteGame - error:", e);
    res.status(500).send({
      message: e,
    });
  }
};

exports.cleanCart = async (req, res, next) => {
  console.log("Controller.cleanCart - start");
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    console.log("Controller.cleanCart - clearing cart for user id:", data && data.id);

    await repository.updateCart(data.id, []);
    console.log("Controller.cleanCart - repository.updateCart completed for id:", data.id);

    res.status(200).send({
      message: "Carrinho limpo!",
    });
  } catch (e) {
    console.error("Controller.cleanCart - error:", e);
    res.status(500).send({
      message: e,
    });
  }
};

exports.finish = async (req, res, next) => {
  console.log("Controller.finish - start");
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    const data = await authService.decodeToken(token);
    console.log("Controller.finish - user id:", data && data.id, "cart size:", data && data.cart ? data.cart.length : 0);

    await repository.buyGame(data.id, data.cart);
    console.log("Controller.finish - repository.buyGame completed for id:", data.id);

    await repository.updateCart(data.id, []);
    console.log("Controller.finish - repository.updateCart (clear) completed for id:", data.id);

    res.status(200).send({
      message: "Compra finalizada com sucesso!",
    });
  } catch (e) {
    console.error("Controller.finish - error:", e);
    res.status(500).send({
      message: e,
    });
  }
};
