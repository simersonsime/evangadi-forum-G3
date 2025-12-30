// routes/commentRoutes.js
import express from "express";
import {
  postComment,
  getComments,
  deleteCommentById,
} from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * POST /api/comments
 * Protected route - Add comment to answer
 */
router.post("/", authMiddleware, postComment);

/**
 * GET /api/comments/:answerid
 * Public route - Get all comments for an answer
 */
router.get("/:answerid", getComments);

/**
 * DELETE /api/comments/:commentid
 * Protected route - Delete a comment
 */
router.delete("/:commentid", authMiddleware, deleteCommentById);

export default router;
