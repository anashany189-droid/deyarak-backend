import express from "express";
import db from "../database/db.js";

const router = express.Router();

// Add product belonging to a supplier
router.post("/add-product", async (req, res) => {
  const { name, price, category, supplier_id } = req.body;

  if (!name || !price || !category || !supplier_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  await db.run(
    "INSERT INTO products (name, price, category, supplier_id) VALUES (?, ?, ?, ?)",
    [name, price, category, supplier_id]
  );

  res.json({ message: "Product added successfully" });
});

// Get all products for a supplier
router.get("/products/:id", async (req, res) => {
  const supplier_id = req.params.id;

  const products = await db.all(
    "SELECT * FROM products WHERE supplier_id = ?",
    [supplier_id]
  );

  res.json(products);
});

export default router;
