/**
 * Post a new answer for a question
 * Endpoint: POST /api/answer/:question_id
 * Protected route (requires JWT)
 */
export const postAnswer = async (req, res) => {
  const { question_id } = req.params;
  let { answer } = req.body;
  const user_id = req.user?.id; // Comes from JWT middleware
  // 1. Check authentication
  if (!user_id) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Authentication required",
    });
  }
  // 2. Validate question_id
  if (!question_id || isNaN(parseInt(question_id, 10))) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Question ID must be a valid number",
    });
  }
  // 3. Validate answer content
  if (!answer || answer.trim() === "") {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide answer",
    });
  }
  answer = answer.trim();
  try {
    // 4. Check if the question exists
    const [questionRows] = await db
      .promise()
      .query("SELECT question_id FROM questions WHERE question_id = ?", [
        question_id,
      ]);
    if (questionRows.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: "The specified question could not be found",
      });
    }
    // 5. Insert new answer
    const [result] = await db
      .promise()
      .query(
        "INSERT INTO answers (question_id, user_id, answer) VALUES (?, ?, ?)",
        [question_id, user_id, answer]
      );
    // 6. Send success response
    res.status(201).json({
      message: "Answer posted successfully",
      answer_id: result.insertId,
      question_id,
      user_id,
      answer,
    });
  } catch (err) {
    console.error("Post answer error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
    });
  }
};