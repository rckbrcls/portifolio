"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();
const router = express.Router();

mongoose.set("strictQuery", false);
// Connecta ao banco
mongoose.connect(config.connectionString);

// Carrega os Models
const Game = require("./models/game");
const User = require("./models/user");

// Carrega as Rotas
const indexRoute = require("./routes/index-route");
const gameRoute = require("./routes/game-route");
const userRoute = require("./routes/user-route");

app.use(
  bodyParser.json({
    limit: "5mb",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Habilita o CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use("/", indexRoute);
app.use("/games", gameRoute);
app.use("/users", userRoute);

module.exports = app;
