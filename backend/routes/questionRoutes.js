import express from "express";
import {
  getAllQuestions,
  getQuestionById,
  postQuestion,
} from "../controllers/questionController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllQuestions);
router.get("/:question_id", getQuestionById);

// Protected route (requires JWT)
router.post("/", authenticateToken, postQuestion);

export default router;
