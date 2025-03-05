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

app.get("/api/products", async (request, response) => {
  try {
    const products = await Product.find({});
    response.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fetching products:", error.message);
    response.status(500).json({ success: false, message: "Server Error" });
  }
});

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
    console.error("Error in creating product:", error.message);
    response.status(500).json({ success: false, message: "Server Error" });
  }
});

app.delete("/api/products/:id", async (request, response) => {
  const { id } = request.params;
  
  try {
    await Product.findByIdAndDelete(id);
    response.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("Error in deleting product:", error.message);
    response.status(404).json({ success: false, message: "Product not found" });
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