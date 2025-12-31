import express from "express";
import { toggleLike } from "../controllers/likeController.js";
import { getLikeCount } from "../controllers/likeController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

// POST to toggle like
router.post("/toggle", authenticateToken, toggleLike);

// GET like count
router.get("/count/:type/:id", getLikeCount);

export default router;
