import { StatusCodes } from "http-status-codes";
import { createAnswer } from "../models/answerModel.js";

/**
 * POST /api/answer
 * Description: Submit an answer for a specific question
 */
export const postAnswer = async (req, res) => {
  try {
    // 1️⃣ Get data from request body
    const { questionid, answer } = req.body;

    // 2️⃣ Get user id from authMiddleware (JWT)
    const { userid } = req.user;

    // 3️⃣ Validation (API documentation requirement)
    if (!questionid || !answer) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Bad Request",
        message: "Please provide answer",
      });
    }

    // 4️⃣ Insert answer into database
    await createAnswer(questionid, userid, answer);

    // 5️⃣ Success response
    return res.status(StatusCodes.CREATED).json({
      message: "Answer posted successfully",
    });
  } catch (error) {
    console.error("Post Answer Error:", error);

    // 6️⃣ Server error
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};
