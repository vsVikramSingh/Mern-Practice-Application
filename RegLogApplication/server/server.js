const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "reglogindb",
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Create User table
db.query(
  "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY,username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, age INT, gender VARCHAR(10), dateofbirth DATE, maritalstatus VARCHAR(20), fathername VARCHAR(255), mothername VARCHAR(255), city VARCHAR(255), state VARCHAR(255), country VARCHAR(255));",
  (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    }
  }
);

// Register Route
app.post("/api/register", async (req, res) => {
  try {
    const { username, password, email, age, gender, dateofbirth, maritalstatus, fathername, mothername, city, state, country } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into MySQL database
    db.query(
      "INSERT INTO users (username, password, email, age, gender, dateofbirth, maritalstatus, fathername, mothername, city, state, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [username, hashedPassword, email, age, gender, dateofbirth, maritalstatus, fathername, mothername, city, state, country],
      (err) => {
        if (err) {
          console.error("Error registering user:", err);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          res.status(201).json({ message: "User registered successfully" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve user from MySQL database
    db.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      async (err, results) => {
        if (err) {
          console.error("Error retrieving user:", err);
          res.status(500).json({ error: "Internal Server Error" });
        } else if (results.length > 0) {
          const user = results[0];

          if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username }, "your-secret-key");
            res.status(200).json({ token });
          } else {
            res.status(401).json({ error: "Invalid credentials" });
          }
        } else {
          res.status(401).json({ error: "Invalid credentials" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
