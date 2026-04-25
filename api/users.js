import mysql from "mysql2/promise";

export default async function handler(req, res) {
  try {
    // Create connection (same as movies.js)
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME, // should be movie_db
    });

    // Handle GET request
    if (req.method === "GET") {
      const [rows] = await connection.execute(
        "SELECT id, username, email, created_at FROM users"
      );

      res.status(200).json(rows);
    }

    // Handle POST request (optional - create user)
    else if (req.method === "POST") {
      const { username, email, password } = req.body;

      const [result] = await connection.execute(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, password]
      );

      res.status(201).json({
        message: "User created",
        userId: result.insertId,
      });
    }

    // Method not allowed
    else {
      res.status(405).json({ message: "Method not allowed" });
    }

    await connection.end();
  } catch (error) {
    console.error("USERS API ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}