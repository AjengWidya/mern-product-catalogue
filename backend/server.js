import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/", (request, response) => {
  response.send("Server is ready");
});

/**
 * The first param is the port
 * The second param is the callback function
 */
app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});