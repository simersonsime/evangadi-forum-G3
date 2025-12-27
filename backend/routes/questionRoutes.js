import express from "express";
import { getAllQuestions } from "../controllers/questionController.js";

const router = express.Router();

// Public routes
router.get("/", getAllQuestions);

export default router;
