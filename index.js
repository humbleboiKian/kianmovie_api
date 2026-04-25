require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const movieRoutes = require("./routes/movies");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users"); // ✅ ADD THIS

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/users", usersRoutes); // ✅ ADD THIS

app.get("/", (req, res) => {
  res.send("Movie API is running");
});

module.exports = app;