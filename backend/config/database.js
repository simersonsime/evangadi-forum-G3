import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import mysql from "mysql2";
const database = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

database.getConnection((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database.");
  }
});
app.listen(4000, () => {
  console.log(`Server is running on port ${4000}`);
});
export default database;
