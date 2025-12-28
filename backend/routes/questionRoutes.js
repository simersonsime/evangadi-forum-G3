import express from "express";
import { getAllQuestions } from "../controllers/questionController.js";
import { getQuestionById } from "../controllers/questionController.js";

const router = express.Router();

// Public routes
router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);

export default router;
