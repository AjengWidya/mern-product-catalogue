import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import cors from "cors";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

// Middleware to connect to the database before handling requests (for Vercel)
app.use(async (request, response, next) => {
  try {
    // Ensure the DB is connected
    await connectDB();

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    response.status(500).json({ message: "Database connection failed" });
  }
});

// Use value from the env, otherwise 5000
// Uncomment for localhost
// const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(cors());

/**
 * Below is a middleware (a function that runs before send response
 * back to the client)
 * that allows us to accept JSON data
 * in the request body
 */
app.use(express.json());

app.use("/api/products", productRoutes);

// Check if the env is production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Export the app for Vercel
export default app;

/**
 * The first param is the port
 * The second param is the callback function
 * Commented out for deploying to Vercel, uncomment for localhost
 */
// app.listen(PORT, () => {
//   connectDB();
//   console.log(`Server started at http://localhost:${PORT}`);
// });