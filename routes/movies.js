const express = require("express");
const router = express.Router();
const db = require("./../db");

// 1. GET all movies (already working)
router.get("/", (req, res) => {
  db.query("SELECT * FROM movies", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// 2. GET movie by ID (already working)
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM movies WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results[0]);
  });
});

// 3. POST new movie (already working, just added rating)
router.post("/", (req, res) => {
  const { name, release_date, director, type, subtitle, image_url, rating } = req.body;
  db.query(
    "INSERT INTO movies (name, release_date, director, type, subtitle, image_url, rating) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [name, release_date, director, type, subtitle, image_url, rating || 5.0],
    (err, result) => {
      if (err) return res.status(500).json(err);
      db.query("SELECT * FROM movies WHERE id = ?", [result.insertId], (err, newMovie) => {
        res.status(201).json(newMovie[0]);
      });
    }
  );
});

// 4. UPDATE rating only (NEW - for star ratings)
router.patch("/:id/rating", (req, res) => {
  const { rating } = req.body;
  db.query(
    "UPDATE movies SET rating = ? WHERE id = ?",
    [rating, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      db.query("SELECT * FROM movies WHERE id = ?", [req.params.id], (err, updated) => {
        res.json(updated[0]);
      });
    }
  );
});

// 5. UPDATE entire movie (NEW - for edit feature)
router.put("/:id", (req, res) => {
  const { name, release_date, director, type, subtitle, image_url, rating } = req.body;
  db.query(
    "UPDATE movies SET name=?, release_date=?, director=?, type=?, subtitle=?, image_url=?, rating=? WHERE id=?",
    [name, release_date, director, type, subtitle, image_url, rating, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      db.query("SELECT * FROM movies WHERE id = ?", [req.params.id], (err, updated) => {
        res.json(updated[0]);
      });
    }
  );
});

// 6. DELETE movie (NEW - for delete feature)
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM movies WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Movie deleted", id: req.params.id });
  });
});

module.exports = router;