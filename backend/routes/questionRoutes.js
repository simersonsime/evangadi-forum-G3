import express from "express";
const authMiddleware = require("../middleware/authMiddleware");
// import {
//   getAllQuestions,
//   getQuestionById,
//   postQuestion, // ADD THIS
// } from "../controllers/questionController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const {
  getAllQuestions,
  postQuestion,
  getQuestionById,
  editQuestion,
  deleteQuestion,
} = require("../controller/questionController");

// Public routes
router.get("/all-questions", authMiddleware, getAllQuestions);
router.get("/:id", authMiddleware, getQuestionById);
router.put("/edit-question/:id", authMiddleware, editQuestion);
router.delete("/delete-question/:id", authMiddleware, deleteQuestion);
router.post("/post-question", authMiddleware, postQuestion);

module.exports = router;
