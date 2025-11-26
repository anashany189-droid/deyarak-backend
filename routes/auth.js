import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../database/db.js";

const router = express.Router();

// Register supplier
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = bcrypt.hashSync(password, 10);

  try {
    await db.run(
      "INSERT INTO suppliers (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed]
    );

    res.json({ message: "Supplier registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
});

// Login supplier
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const supplier = await db.get(
    "SELECT * FROM suppliers WHERE email = ?",
    [email]
  );

  if (!supplier) return res.status(400).json({ error: "Invalid email or password" });

  const match = bcrypt.compareSync(password, supplier.password);
  if (!match) return res.status(400).json({ error: "Invalid email or password" });

  const token = jwt.sign(
    { id: supplier.id },
    process.env.JWT_SECRET || "secret123",
    { expiresIn: "7d" }
  );

  res.json({ token });
});

export default router;
