import db from "../config/db.js";

const Like = {
  /**
   * Find if a user already liked a target
   * @param {number} user_id
   * @param {number} target_id
   * @param {string} target_type
   * @returns {Promise<[rows]>}
   */
  findLike: (user_id, target_id, target_type) => {
    return db
      .promise()
      .query(
        "SELECT * FROM likes WHERE user_id = ? AND target_id = ? AND target_type = ?",
        [user_id, target_id, target_type]
      );
  },

  /**
   * Add a like for a target
   * @param {number} user_id
   * @param {number} target_id
   * @param {string} target_type
   * @returns {Promise<[result]>}
   */
  addLike: (user_id, target_id, target_type) => {
    return db
      .promise()
      .query(
        "INSERT INTO likes (user_id, target_id, target_type) VALUES (?, ?, ?)",
        [user_id, target_id, target_type]
      );
  },

  /**
   * Remove a like for a target
   * @param {number} user_id
   * @param {number} target_id
   * @param {string} target_type
   * @returns {Promise<[result]>}
   */
  removeLike: (user_id, target_id, target_type) => {
    return db
      .promise()
      .query(
        "DELETE FROM likes WHERE user_id = ? AND target_id = ? AND target_type = ?",
        [user_id, target_id, target_type]
      );
  },

  /**
   * Count likes for a target
   * @param {number} target_id
   * @param {string} target_type
   * @returns {Promise<[rows]>}
   */
  countLikes: (target_id, target_type) => {
    return db
      .promise()
      .query(
        "SELECT COUNT(*) AS count FROM likes WHERE target_id = ? AND target_type = ?",
        [target_id, target_type]
      );
  },
};

export default Like;
