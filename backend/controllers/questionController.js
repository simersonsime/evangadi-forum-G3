import db from "../config/database.js";

/**
 * Get all questions
 * Endpoint: GET /api/question/
 */

export const getAllQuestions = async (req, res) => {
  try {
    // 1. Fetch all questions from the database
    const [rows] = await db.promise().query("SELECT * FROM questions BY created_at DESC");

    // 2. Check if question exists
    if (rows.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "No questions found.",
      });
    }

    // 2. Send response
    res.status(200).json({ questions: rows });
  } catch (err) {
    console.error("Get all questions error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};



/**
 * Post a new question
 * Endpoint: POST /api/question/
 * Protected route (JWT protected)
 */
export const postQuestion = async (req, res) => {
  let { title, description } = req.body;

  // 1. Extract user ID from JWT
  const user_id = req.user?.id;
  if (!user_id) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Authentication required",
    });
  }

  // 2. Trim input
  title = title?.trim();
  description = description?.trim();

  // 3. Validate input
  if (!title || !description) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  try {
    // 4. Insert question into database
    const [result] = await db
      .promise()
      .query(
        "INSERT INTO questions (user_id, title, description) VALUES (?, ?, ?)",
        [user_id, title, description]
      );

    // 5. Send success response
    res.status(201).json({
      message: "Question created successfully",
      question_id: result.insertId,
    });
  } catch (err) {
    console.error("Post question error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};
