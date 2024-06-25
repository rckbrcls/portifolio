"use strict";

const repository = require("../repositories/game-repository");
var config = require("../config");

exports.get = async (req, res, next) => {
  try {
    var data = await repository.get();
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    var data = await repository.getById(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.post = async (req, res, next) => {
  try {
    await repository.create({
      id: Math.random(),
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      genders: req.body.genders,
      carousel: req.body.carousel,
      best: req.body.best,
      release: req.body.release,
    });
    res.status(201).send({
      message: "Jogo cadastrado com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.put = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);

    res.status(200).send({
      message: "Jogo atualizado com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    await repository.delete(req.params.id);
    res.status(200).send({
      message: "Jogo removido com sucesso!",
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};
