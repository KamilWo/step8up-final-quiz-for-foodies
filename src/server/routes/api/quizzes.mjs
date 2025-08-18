// This file defines the API routes specifically for quizzes.

import express from "express";
const router = express.Router();
import { isAuthenticated } from "../../middleware/authMiddleware.mjs";
import {
  getAllQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../../controllers/quizController.mjs";

// GET /api/quizzes - Get all quizzes, anyone can see them
router.get("/", getAllQuizzes);

// GET /api/quizzes/:id - Get a single quiz by ID
router.get("/:id", getQuiz);

// Protected routes - only logged-in users can create, update, or delete quizzes
// POST /api/quizzes - Create a new quiz
router.post("/", isAuthenticated, createQuiz);

// PUT /api/quizzes/:id - Update an existing quiz
router.put("/:id", isAuthenticated, updateQuiz);

// DELETE /api/quizzes/:id - Delete a quiz
router.delete("/:id", isAuthenticated, deleteQuiz);

export default router;
