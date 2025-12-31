import express from "express";
import { loginUser } from "../controllers/authController.js";
import {loginLimiter} from "../utils/rateLimiter.js"

const router = express.Router()


router.post("/login", loginLimiter, loginUser); // Login endpoint

export default router