import db from "../config/database.js";
import { createQuestion } from "../models/questionModel.js";  

export const getAllQuestions = async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM questions ORDER BY created_at DESC");

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "No questions found.",
      });
    }

    res.status(200).json({ questions: rows });
  } catch (err) {
    console.error("Get all questions error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db
      .promise()
      .query("SELECT * FROM questions WHERE question_id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "Question not found.",
      });
    }

    res.status(200).json({ question: rows[0] });
  } catch (err) {
    console.error("Get question by ID error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

export const postQuestion = async (req, res) => {  

 let { title, description } = req.body;
  const user_id = req.user?.user_id || req.user?.id;
 

  if (!user_id) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Authentication required",
    });
  }

  title = title?.trim();
  description = description?.trim();

  if (!title || !description) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  try {
    const result = await createQuestion(user_id, title, description);

    res.status(201).json({
      message: "Question created successfully",
      question_id: result.insertId,
    });
  } catch (err) {
    console.error("Post question error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};
