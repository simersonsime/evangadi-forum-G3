import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const database = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, // your database (defaultdb)
  port: Number(process.env.DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false }, // required for Aiven SSL
  multipleStatements: true, // allow running multiple SQL commands at once
});

database.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log(`MySQL connected to ${process.env.DB_NAME} ✅`);
  connection.release();
});

export default database;
