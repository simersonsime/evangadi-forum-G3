import bcrypt from "bcryptjs";
import db from "../config/database.js";
import dotenv from "dotenv";
import generateToken from "../utils/generateToken.js";

dotenv.config();

/**
 * Helper: Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Register a new user
 * Endpoint: POST /api/user/register
 */
export const registerUser = async (req, res) => {
  try {
    // Extract user details from request body
    const { username, first_name, last_name, email, password } = req.body;

    // 1. Validate required fields
    if (!username || !first_name || !last_name || !email || !password) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    // 2. Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid email format",
      });
    }

    // 3. Validate username length
    if (username.length < 3 || username.length > 20) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Username must be 3-20 characters long",
      });
    }

    // 4. Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Password must be at least 8 characters",
      });
    }

    // 5. Check if user exists
    const [existingUser] = await db
      .promise()
      .query("SELECT user_id FROM users WHERE username = ? OR email = ?", [
        username,
        email,
      ]);

    if (existingUser.length > 0) {
      return res.status(409).json({
        error: "Conflict",
        message: "User already existed",
      });
    }

    // 6. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 7. Insert user into database
    await db
      .promise()
      .query(
        "INSERT INTO users (username, first_name, last_name, email, password) VALUES (?, ?, ?, ?, ?)",
        [username, first_name, last_name, email, hashedPassword]
      );

    // 8. Success response
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Register user error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// /**
//  * Login user
//  * Endpoint: POST /api/user/login
//  */

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate required fields
  if (!email || !password) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  // 2. Validate email
  if (!isValidEmail(email)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Invalid email format",
    });
  }

  try {
    // 2. Fetch user by email
    const [rows] = await db
      .promise()
      .query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }

    // 3. Compare passwords
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid username or password",
      });
    }

    // 4. Reset rate limiter
    res.locals.loginSuccess = true;

    // 5. Generate token
    const token = generateToken(user);

    // 8. Success response
    return res.status(200).json({
      message: "User login successful",
      token,
      user: {
        id: user.user_id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * Check current authenticated user
 * Endpoint: GET /api/user/checkUser
 * Protected route (requires JWT)
 */
export const checkUser = (req, res) => {
  try {
    // 1. Check if user is authenticated
    if (!req.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Authentication invalid",
      });
    }

    // 2. Send user info
    res.status(200).json({
      message: "Valid user",
      username: req.user.username,
      id: req.user.id,
    });
  } catch (error) {
    console.error("Check user error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};
