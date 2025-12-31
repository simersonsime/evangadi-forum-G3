import express from "express";
import {
  postComment,
  getComments,
  deleteCommentById,
} from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

 
router.post("/",authMiddleware, postComment);

 
router.get("/:answerid", getComments);

 
router.delete("/:commentid", authMiddleware, deleteCommentById);

export default router;
