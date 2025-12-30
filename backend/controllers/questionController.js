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
