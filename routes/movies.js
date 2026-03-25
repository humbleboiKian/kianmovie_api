const express = require("express");
const router = express.Router();
const db = require("../db");

// 1. GET all movies
router.get("/", (req, res) => {
  db.query("SELECT * FROM movies", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// 2. GET movie by ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM movies WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
});

// 3. POST new movie
router.post("/", (req, res) => {
  const { name, release_date, director, type, subtitle, image_url } = req.body;

  db.query(
    "INSERT INTO movies (name, release_date, director, type, subtitle, image_url) VALUES (?, ?, ?, ?, ?, ?)",
    [name, release_date, director, type, subtitle, image_url],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Movie added", id: result.insertId });
    }
  );
});

// 4. UPDATE rating (REQUIRED endpoint)
router.put("/:id/rating", (req, res) => {
  const { rating } = req.body;

  db.query(
    "UPDATE movies SET rating = ? WHERE id = ?",
    [rating, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Rating updated" });
    }
  );
});

// 5. DELETE movie
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM movies WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Movie deleted" });
  });
});

module.exports = router;