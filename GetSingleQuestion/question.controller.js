import Question from "../models/question.model.js";
import { ApiError } from "../utils/apiError.js";

/**
 * @desc    Get single question by ID
 * @route   GET /api/question/:question_id
 * @access  Public
 */
export const getQuestionById = async (req, res, next) => {
  try {
    const { question_id } = req.params;

    const question = await Question.findByPk(question_id);

    if (!question) {
      throw new ApiError(404, "Question not found");
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    // Handle invalid ID
    if (error.name === "SequelizeDatabaseError") {
      return res.status(400).json({
        success: false,
        message: "Invalid question_id",
      });
    }
    next(error);
  }
};
