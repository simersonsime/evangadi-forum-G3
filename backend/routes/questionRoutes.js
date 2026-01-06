import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  getAllQuestions,
  postQuestion,
  getQuestionById,
  editQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

// Public routes
router.get("/", getAllQuestions); // GET /api/question
router.get("/:question_id", getQuestionById); // GET /api/question/1

// Protected routes
router.post("/", authenticateToken, postQuestion); // POST /api/question
router.put("/:question_id", authenticateToken, editQuestion); // PUT /api/question/1
router.delete("/:question_id", authenticateToken, deleteQuestion); // DELETE /api/question/1

export default router;
