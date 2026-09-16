const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST || "mysql",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "employee_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Employee backend is running"
  });
});

// Get employees
app.get("/employees", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM employees");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      error: "Failed to fetch employees"
    });
  }
});

// Add employee
app.post("/employees", async (req, res) => {
  try {
    const { name, email, department } = req.body;

    if (!name || !email || !department) {
      return res.status(400).json({
        error: "Name, email and department are required"
      });
    }

    const [result] = await db.query(
      "INSERT INTO employees (name, email, department) VALUES (?, ?, ?)",
      [name, email, department]
    );

    res.status(201).json({
      message: "Employee added successfully",
      id: result.insertId
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({
      error: "Failed to add employee"
    });
  }
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log("Shutting down application...");

  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
