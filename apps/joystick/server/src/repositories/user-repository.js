"use strict";
const mongoose = require("mongoose");
const User = mongoose.model("User");

exports.get = async () => {
  console.log("Repository Get User");
  const res = await User.find();
  return res;
};

exports.getById = async (id) => {
  const res = await User.findById(id);
  return res;
};

exports.create = async (data) => {
  var user = new User(data);
  await user.save();
};

exports.authenticate = async (data) => {
  const res = await User.findOne({
    email: data.email,
    password: data.password,
  });
  return res;
};

exports.update = async (id, data) => {
  await User.findByIdAndUpdate(id, {
    $set: data,
  });
};

exports.insertGame = async (id, data) => {
  const res = await User.findByIdAndUpdate(id, {
    $push: { cart: data },
  });
  return res;
};

exports.updateCart = async (id, data) => {
  const res = await User.findByIdAndUpdate(id, {
    $set: { cart: data },
  });
  return res;
};

exports.buyGame = async (id, data) => {
  const res = await User.findByIdAndUpdate(id, {
    $push: { games: { $each: data } },
  });
  return res;
};
