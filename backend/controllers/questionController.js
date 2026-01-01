import db from "../config/database.js";
import { createQuestion } from "../models/questionModel.js";
import { StatusCodes } from "http-status-codes";

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
    // Handle case where the question does not exist
    if (rows.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "Question not found.",
      });
    }
    // Return the fetched question
    res.status(200).json({ question: rows[0] });
  } catch (err) {
    console.error("Get question by ID error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

export const editQuestion = async (req, res) => {
  const userId = req.user.userid; // Get the logged-in user's ID
  const questionId = req.params.id; // Get the question ID from the route
  const { title, description } = req.body; // Get the updated title from the request body

  if (!title || !description) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      msg: "Title is required",
    });
  }

  try {
    const [question] = await dbConnection.query(
      "SELECT userid FROM questions WHERE id = ?",
      [questionId]
    );

    if (question.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        msg: "Question not found",
      });
    }

    if (question[0].userid !== userId) {
      return res.status(StatusCodes.FORBIDDEN).json({
        error: "Forbidden",
        msg: "You are not authorized to edit this question",
      });
    }

    await dbConnection.query(
      "UPDATE questions SET title = ?, description = ? WHERE id = ?",
      [title, description, questionId]
    );

    res.status(StatusCodes.OK).json({ msg: "Question updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      msg: "An unexpected error occurred",
    });
  }
};

export const deleteQuestion = async (req, res) => {
  const userId = req.user.userid; // Get the logged-in user's ID
  const questionId = req.params.id; // Get the question ID from the route

  try {
    const [question] = await dbConnection.query(
      "SELECT userid FROM questions WHERE id = ?",
      [questionId]
    );

    if (question.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Not Found",
        msg: "Question not found",
      });
    }

    if (question[0].userid !== userId) {
      return res.status(StatusCodes.FORBIDDEN).json({
        error: "Forbidden",
        msg: "You are not authorized to delete this question",
      });
    }

    await dbConnection.query("DELETE FROM questions WHERE id = ?", [
      questionId,
    ]);
    await dbConnection.query("DELETE FROM questions WHERE id = ?", [
      questionId,
    ]);
    res.status(StatusCodes.OK).json({ msg: "Question deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      msg: "An unexpected error occurred",
    });
  }
};
