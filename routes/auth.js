const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ REGISTER
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "User registered successfully" });
    }
  );
});

// ✅ LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length > 0) {
        res.json({
          message: "Login success",
          user: results[0],
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  );
});

module.exports = router;