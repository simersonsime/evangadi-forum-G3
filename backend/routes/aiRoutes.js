import express from "express";
import { assistQuestion } from "../controllers/aiController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// AI tag suggestion for a question
router.post("/question-assist", authenticateToken, assistQuestion);

export default router;
