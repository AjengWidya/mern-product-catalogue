import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const app = express();

/**
 * Below is a middleware (a function that runs before send response
 * back to the client)
 * that allows us to accept JSON data
 * in the request body
 */
app.use(express.json());

app.post("/api/products", async (request, response) => {
  const product = request.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return response.status(400).json({
      success: false,
      message: "Please provide all fields"
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    response.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error when creating product: ", error.message);
    response.status(500).json({ success: false, message: "Server Error" });
  }
});

/**
 * The first param is the port
 * The second param is the callback function
 */
app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});