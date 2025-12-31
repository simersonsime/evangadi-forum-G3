import db from "../config/db.js";

/**
 * Toggle like (add / remove)
 * Endpoint: POST /api/like/
 * Protected route (JWT protected)
 */
export const toggleLike = async (req, res) => {
  const { target_id, target_type } = req.body;

  // 1. Extract user ID from JWT
  const user_id = req.user?.id;
  if (!user_id) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Authentication required",
    });
  }

  // 2. Validate input
  const targetIdNum = parseInt(target_id, 10);
  if (isNaN(targetIdNum)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Target ID must be a valid number",
    });
  }

  if (!["question", "answer"].includes(target_type)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Invalid target type",
    });
  }

  try {
    // 3. Check if like already exists
    const [existing] = await db.promise().query(
      `SELECT like_id FROM likes 
         WHERE user_id = ? AND target_id = ? AND target_type = ?`,
      [user_id, targetIdNum, target_type]
    );

    // 4. If exists → remove like
    if (existing.length > 0) {
      await db.promise().query(
        `DELETE FROM likes 
           WHERE user_id = ? AND target_id = ? AND target_type = ?`,
        [user_id, targetIdNum, target_type]
      );

      return res.status(200).json({
        liked: false,
        message: "Like removed successfully",
      });
    }

    // 5. Otherwise → add like
    await db.promise().query(
      `INSERT INTO likes (user_id, target_id, target_type)
         VALUES (?, ?, ?)`,
      [user_id, targetIdNum, target_type]
    );

    // 6. Optional: create notification for answer likes
    if (target_type === "answer") {
      const [[answer]] = await db
        .promise()
        .query("SELECT user_id FROM answers WHERE answer_id = ?", [
          targetIdNum,
        ]);

      if (answer) {
        await db.promise().query(
          `INSERT INTO notifications 
             (receiver_id, sender_id, type, reference_id)
             VALUES (?, ?, ?, ?)`,
          [answer.user_id, user_id, "like", targetIdNum]
        );
      }
    }

    // 7. Send success response
    res.status(201).json({
      liked: true,
      message: "Like added successfully",
    });
  } catch (err) {
    console.error("Toggle like error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

/**
 * Get like count
 * Endpoint: GET /api/like/:type/:id
 */
export const getLikeCount = async (req, res) => {
  const { type, id } = req.params;

  const targetIdNum = parseInt(id, 10);
  if (isNaN(targetIdNum)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "ID must be a valid number",
    });
  }

  if (!["question", "answer"].includes(type)) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Invalid target type",
    });
  }

  try {
    const [[result]] = await db.promise().query(
      `SELECT COUNT(*) AS count 
         FROM likes 
         WHERE target_id = ? AND target_type = ?`,
      [targetIdNum, type]
    );

    res.status(200).json({
      count: result.count,
    });
  } catch (err) {
    console.error("Get like count error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};
