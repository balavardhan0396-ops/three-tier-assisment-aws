const mysql = require("mysql2");

let connection;

function connectDatabase() {
  connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  connection.connect((err) => {
    if (err) {
      console.log("❌ MySQL not ready. Retrying in 5 seconds...");
      setTimeout(connectDatabase, 5000);
    } else {
      console.log("✅ MySQL Connected Successfully");
    }
  });

  connection.on("error", (err) => {
    console.log("Database Error:", err);

    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      connectDatabase();
    }
  });
}

connectDatabase();

module.exports = {
  getConnection: () => connection,
};
