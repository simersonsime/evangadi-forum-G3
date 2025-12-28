import express from "express";
import { postAnswer } from "../controllers/answerController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * POST /api/answer
 * Protected route
 */
router.post("/", authMiddleware, postAnswer);

export default router;
