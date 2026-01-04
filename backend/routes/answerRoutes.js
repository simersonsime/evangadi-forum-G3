import express from "express";
import { postAnswer, getAllAnswer } from "../controllers/answerController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * POST /api/answer
 * Protected route
 */
router.post("/:question_id", authenticateToken, postAnswer);
router.get("/:question_id", getAllAnswer);


export default router;
