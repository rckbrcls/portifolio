import mongoose from "mongoose";
import { mongodbURI } from "./dbConfig.js";

mongoose.set("strictQuery", false);
// Coneção com o banco de dados
mongoose.connect(mongodbURI);

let db = mongoose.connection;

export default db;
