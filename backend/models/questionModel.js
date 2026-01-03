import db from "../config/database.js";

export const getAllQuestions = async () => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM questions ORDER BY created_at DESC");
  return rows;
};

export const getQuestionById = async (id) => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM questions WHERE question_id = ?", [id]);
  return rows[0];
};

// ⭐ ADD THIS - Missing function!
export const createQuestion = async (user_id, title, description) => {
  const [result] = await db
    .promise()
    .query(
      "INSERT INTO questions (user_id, question_title, question_description) VALUES (?, ?, ?)",
      [user_id, title, description]
    );
  return result;
};
