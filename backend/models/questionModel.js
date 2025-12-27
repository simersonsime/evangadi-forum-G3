<<<<<<< HEAD
import db from "../config/db.js";

/**
 * Fetch all questions from database
 */
export const getAllQuestions = async () => {
  const [rows] = await db
    .promise()
    .query("SELECT * FROM questions ORDER BY created_at DESC");

  return rows;
};
=======
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  options: {
    type: DataTypes.JSON, // Store options as JSON array
    allowNull: false,
    validate: {
      isArray(value) {
        if (!Array.isArray(value)) {
          throw new Error('Options must be an array');
        }
      },
    },
  },
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt
  tableName: 'questions',
});

export default Question;
>>>>>>> cf1d03b32d1359f32725c442c8a458a2de200cf8
