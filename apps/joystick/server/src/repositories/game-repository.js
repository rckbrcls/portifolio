"use strict";
const mongoose = require("mongoose");
const Game = mongoose.model("Game");

exports.get = async () => {
  const res = await Game.find();
  return res;
};

exports.getById = async (id) => {
  const res = await Game.findById(id);
  return res;
};

exports.create = async (data) => {
  var game = new Game(data);
  await game.save();
};

exports.update = async (id, data) => {
  await Game.findByIdAndUpdate(id, {
    $set: {
      title: data.title,
      description: data.description,
      price: data.price,
      genders: data.genders,
      carousel: data.carousel,
      best: data.best,
      release: data.release,
    },
  });
};

exports.delete = async (id) => {
  await Game.findOneAndRemove(id);
};
