import express from "express";
import {
  getAllQuestions,
  getQuestionById,
  postQuestion, // ADD THIS
} from "../controllers/questionController.js";
// import authMiddleware from "../middleware/authMiddleware.js";  

const router = express.Router();

// Public routes
router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);

//  ADD THIS - Protected route
router.post("/",  postQuestion);

export default router;
