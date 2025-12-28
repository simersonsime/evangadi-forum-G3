import db from "../config/database.js";

/**
 * Get all questions
 */
export const getAllQuestions = async (req, res) => {
  try {
    // 1. Fetch all questions from the database
    const [rows] = await db.promise().query("SELECT * FROM questions");

    // 2. Send response
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/** get question by ID */
export const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [row] = await db
      .promise()
      .query("SELECT * FROM questions WHERE question_id = ?", [id]);

    if (row.length === 0) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    res.status(200).json({
      data: row[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
