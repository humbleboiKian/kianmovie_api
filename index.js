require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const movieRoutes = require("./api/movies");
const authRoutes = require("./api/auth");
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("Movie API is running");
});

module.exports = app;