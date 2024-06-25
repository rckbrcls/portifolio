"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: Number,
    index: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  genders: [
    {
      type: String,
      required: false,
    },
  ],
  carousel: {
    type: Boolean,
    required: true,
  },
  best: {
    type: Boolean,
    required: true,
  },
  release: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Game", schema);
