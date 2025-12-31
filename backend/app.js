import express from "express";
import dotenv from "dotenv";
// Import routes
// import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
// import answerRoutes from "./routes/answerRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";


dotenv.config();
const app = express();

// -----------Middleware------------//
app.use(express.json()); //  MUST BE BEFORE ROUTES
app.use(express.urlencoded({ extended: true }));
// ----------Routes--------------//
// app.use("/api/user", authRoutes);
app.use("/api/question", questionRoutes);
// app.use("/api/answer", answerRoutes);
app.use("/api/comments", commentRoutes);

// ----------Default route----------//
app.get("/", (req, res) => {
  res.send("Evangadi Forum API is running...");
});

export default app;
