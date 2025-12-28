import db from "../config/database.js";
/**
 * Fetch all questions from database
 */
export const getAllQuestions = async () => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM questions ORDER BY created_at DESC");

  return rows;
};
// Fetch a single question
export const getQuestionById = async (id) => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM questions WHERE question_id = ?", [id]);
  return rows[0];
};
