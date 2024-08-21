"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/user-controller");
const authService = require("../services/auth-service");

router.post("/", controller.post);
router.get("/", controller.get);
router.get("/cart", controller.getCart);
router.get("/library", controller.getLibrary);
router.post("/authenticate", controller.authenticate);
router.post("/refresh-token", authService.authorize, controller.refreshToken);
router.put("/:game", authService.authorize, controller.putGame);
router.put("/", authService.authorize, controller.update);
router.delete("/cart/:game", authService.authorize, controller.deleteGame);
router.delete("/cart", authService.authorize, controller.cleanCart);
router.post("/finish", authService.authorize, controller.finish);

module.exports = router;
