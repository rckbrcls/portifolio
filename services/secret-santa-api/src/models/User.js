import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: { type: String, required: true },
    email: { type: String },
  },
  {
    versionKey: false,
  }
);

const users = mongoose.model("users", userSchema);

export default users;
