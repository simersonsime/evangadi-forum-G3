import { getAllQuestions as getAllQuestionsModel } from "../models/questionModel.js";


/**
 * Get all questions
 */
export const getAllQuestions = async (req, res) => {
  try {
    const questions = await getAllQuestionsModel();

    res.status(200).json({
      success: true,
      total: questions.length,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
