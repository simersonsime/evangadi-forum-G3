import express from "express";
// import { registerUser } from "../controllers/authController.js";
// import { loginUser } from "../controllers/authController.js";

// import { checkUser } from "../controllers/authController.js";
// import { authenticateToken } from "../middlewares/authMiddleware.js";
import { registerLimiter, loginLimiter } from "../middleware/rateLimiter.js";
const router = express.Router();
const {
  registerUser,
  loginUser,
  checkUser,
  resetPassword,
  verifyResetToken,
} = require("../controller/userController");
export const authMiddleware = require("../middleware/authMiddleware");
// Public routes
router.post("/register", registerLimiter, registerUser); // Signup endpoint
router.post("/login", loginLimiter, loginUser); // Login endpoint
router.post("/reset-password", resetPassword); // Reset password endpoint
router.post("/verify-reset-token", verifyResetToken); // Verify reset token endpoint
// Protected route to check user authentication status
router.get("/check-user", authMiddleware.authenticateToken, checkUser);
module.exports = router;
