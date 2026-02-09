import fs from "fs";
import database from "../config/database.js";

async function setupDatabase() {
  try {
    const sql = fs.readFileSync("./models/tables.sql", "utf8");
    await database.promise().query(sql);
    console.log("Database tables created ✅");
    process.exit(0);
  } catch (err) {
    console.error("Error setting up database:", err);
    process.exit(1);
  }
}

setupDatabase();
