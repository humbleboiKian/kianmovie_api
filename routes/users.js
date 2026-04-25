const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all users
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, username, email, created_at FROM users"
    );
    res.json(rows);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET single user by id
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, username, email, created_at FROM users WHERE id = ?",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("GET USER BY ID ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// CREATE user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const [result] = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password]
    );

    res.status(201).json({
      message: "User created",
      userId: result.insertId,
    });
  } catch (error) {
    console.error("CREATE USER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await db.query(
      "DELETE FROM users WHERE id = ?",
      [req.params.id]
    );

    res.json({ message: "User deleted" });
  } catch (error) {
    console.error("DELETE USER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;