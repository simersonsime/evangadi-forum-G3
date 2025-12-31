import express from "express";
import dotenv from "dotenv";
import likeRoutes from "./routes/likeRoutes.js";



// import likeRoutes from "./routes/likeRoutes.js"; // note the .js extension

dotenv.config(); // load .env file

// import express from "express";
// import dotenv from "dotenv";
// Import routes
// import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
// import answerRoutes from "./routes/answerRoutes.js";

dotenv.config();
const app = express();

// -----------Middleware------------//
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ----------Routes--------------//
// app.use("/api/user", authRoutes);
app.use("/api/question", questionRoutes);
// app.use("/api/answer", answerRoutes);

// ----------Default route----------//
app.get("/", (req, res) => {
  res.send("Evangadi Forum API is running...");
});

// // notification routes and like
// app.use("/api/likes", require("./routes/likeRoutes"));
// app.use("/api/notifications", require("./routes/notificationroutes.js"));

app.use("/api/like", likeRoutes);

export default app;
