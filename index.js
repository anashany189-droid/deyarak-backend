import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import supplierRoutes from "./routes/supplier.js";
import db from "./database/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test endpoint
app.get("/", (req, res) => {
  res.send("Deyarak Backend Running Successfully 🚀");
});

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/supplier", supplierRoutes);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
