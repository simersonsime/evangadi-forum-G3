import express from "express";
import { registerUser } from "../controllers/authController.js";
import { loginUser } from "../controllers/authController.js";
// import { checkUser } from "../controllers/authController.js";
// import { authenticateToken } from "../middlewares/authMiddleware.js";
import { registerLimiter, loginLimiter } from "../middleware/rateLimiter.js";
const router = express.Router();
// Public routes
router.post("/register", registerLimiter, registerUser); // Signup endpoint
router.post("/login", loginLimiter, loginUser); // Login endpoint