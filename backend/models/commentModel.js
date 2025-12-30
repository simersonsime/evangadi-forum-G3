import database from "../config/database.js";

// Create a new comment
export const createComment = (answerId, userId, commentBody) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO comments (answer_id, user_id, comment_body) VALUES (?, ?, ?)";
    database.query(sql, [answerId, userId, commentBody], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

// Get all comments for an answer
export const getCommentsByAnswer = (answerId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT c.*, u.user_name, u.first_name, u.last_name 
      FROM comments c
      JOIN users u ON c.user_id = u.user_id
      WHERE c.answer_id = ?
      ORDER BY c.created_at ASC
    `;
    database.query(sql, [answerId], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

// Delete a comment (only by owner)
export const deleteComment = (commentId, userId) => {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM comments WHERE comment_id = ? AND user_id = ?";
    database.query(sql, [commentId, userId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
