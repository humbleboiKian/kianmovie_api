require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const app = express();
app.use(cors());
app.use(express.json());

const movieRoutes = require("./routes/movies");

app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("Movie API is running");
});

module.exports = app;