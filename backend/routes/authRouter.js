import express from "express";
import { registerLimiter, loginLimiter } from "../middleware/rateLimiter.js";
const router = express.Router();
import {
  registerUser,
  loginUser,
  checkUser,
  resetPassword,
  verifyResetToken,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
// Public routes
router.post("/register", registerLimiter, registerUser); // Signup endpoint
router.post("/login", loginLimiter, loginUser); // Login endpoint
router.post("/reset-password", resetPassword); // Reset password endpoint
router.post("/verify-reset-token", verifyResetToken); // Verify reset token endpoint
// Protected route to check user authentication status
router.get("/check-user", authenticateToken, checkUser);

export default router;



