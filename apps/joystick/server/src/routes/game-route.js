"use strict";

const express = require("express");
const router = express.Router();
const controller = require("../controllers/game-controller");
const authService = require("../services/auth-service");

router.get("/", controller.get);
router.get("/:id", controller.getById);
router.post("/", authService.isAdmin, controller.post);
router.put("/admin/:id", authService.isAdmin, controller.put);
router.delete("/admin/:id", authService.isAdmin, controller.delete);

module.exports = router;
