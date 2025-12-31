import express from "express";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import db from "../config/database.js";
// import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
// router.post("/login", login);


// router.get("/check", authMiddleware, checkUser);

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!email || !password || !firstname || !lastname || !username) {
    console.log("here");
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const [user] = await db.query(
      "SELECT username, userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (user && user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email or username already registered" });
    }

    // Check if the password length is valid
    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password must be at least 7 characters" });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert new user into the database
    await db.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    return res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again later" });
  }
}
export default router;
