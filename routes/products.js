import express from "express";
import db from "../database/db.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await db.all("SELECT * FROM products");
  res.json(products);
});

export default router;
