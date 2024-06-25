import express from "express";
import UserController from "../controllers/usersController.js";

const router = express.Router();

// Rotas para o CRUD de users
router
  .get("/users", UserController.listarUsers)
  .get("/users/sortear", UserController.sortearUsers)
  .get("/users/:id", UserController.listarUserPorId)
  .post("/users", UserController.cadastrarUser)
  .put("/users/:id", UserController.atualizarUser)
  .delete("/users/:id", UserController.excluirUser);

export default router;
