import express from "express";
import { getQuestionById } from "./question.controller.js";

const router = express.Router();

router.get("/question/:question_id", getQuestionById);

export default router;
