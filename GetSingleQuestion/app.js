// import express from "express";
// import sequelize from "../config/database.js";
// import questionRoutes from "./question.routes.js";

// const app = express();

// app.use(express.json());

// // Sync database
// sequelize.sync({ force: false }) // Set force: true to drop and recreate tables on startup (for development)
//   .then(() => {
//     console.log('Database synced successfully');
//   })
//   .catch((error) => {
//     console.error('Error syncing database:', error);
//   });

// // Routes
// app.use("/api", questionRoutes);

// // Global error handler
// app.use((err, req, res, next) => {
//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });

// export default app;
