import db from "../config/db.js";

/**
 * Fetch all questions from database
 */
export const getAllQuestions = async () => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM questions ORDER BY created_at DESC");

  return rows;
};
