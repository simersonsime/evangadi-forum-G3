import express from "express";
import {authenticateToken} from "../middleware/authMiddleware.js";

const router = express.Router();

import {
  getAllQuestions,
  postQuestion,
  getQuestionById,
  editQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

// Public routes  
router.get("/all-questions", getAllQuestions);
router.get("/api/question/:question_id", getQuestionById);

// Protected routes
router.put("/edit-question/:id", authenticateToken, editQuestion);
router.delete("/delete-question/:id", authenticateToken, deleteQuestion);
router.post("/post-question", authenticateToken, postQuestion);

export default router;
