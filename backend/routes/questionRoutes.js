import express from "express";
import { getAllQuestions } from "../controllers/questionController.js";
import { getQuestionById } from "../controllers/questionController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { postQuestion } from "../controllers/questionController.js";

const router = express.Router();

// Public routes
router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);
// router.get("/user/:userId", postQuestion);

// Protected route
router.post("/", postQuestion);

export default router;
