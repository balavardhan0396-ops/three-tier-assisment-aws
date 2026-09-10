const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Basic application route
app.get("/", (req, res) => {
  res.send("Employee Management Backend Running");
});

// Health check for ALB
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

// Employee API routes
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log("Shutting down application...");

  server.close(() => {
    db.end((err) => {
      if (err) {
        console.error("Error closing database connection:", err);
      } else {
        console.log("Database connection closed");
      }

      process.exit(0);
    });
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
