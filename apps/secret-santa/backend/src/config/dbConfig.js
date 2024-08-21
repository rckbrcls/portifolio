import { config } from "dotenv";

config();

export const mongodbURI = process.env.MONGODB_URI;
