import database from "../config/database.js";
/**
 * Insert a new answer into the database
 * @param {number} questionid - ID of the question being answered
 * @param {number} userid - ID of the user posting the answer
 * @param {string} answer - Answer content
 */
export const createAnswer = async (questionid, userid, answer) => {
  const query = `
    INSERT INTO answer (answer_body, user_id, question_id)
    VALUES (?, ?, ?)
  `;

  const values = [answer, userid, questionid];

  const [result] = await database.promise().query(query, values);

  return result;
};
