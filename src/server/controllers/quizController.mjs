// This file contains the logic for handling HTTP requests related to quizzes.
// It interacts with the quizService to perform CRUD operations.

import quizService from "../services/quizService.mjs";

/**
 * Get all quizzes, with optional filtering by category.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const getAllQuizzes = async (req, res) => {
  try {
    // Extract the categoryId from the query parameters.
    const {category: categoryId} = req.query;
    // Pass the categoryId (which can be undefined) to the service.
    const quizzes = await quizService.getQuizzes(categoryId);
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({message: "Failed to retrieve quizzes."});
  }
};

/**
 * Get a single quiz by ID.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const getQuiz = async (req, res) => {
  try {
    const quiz = await quizService.getQuizById(req.params.id);
    if (!quiz) {
      return res.status(404).json({message: "Quiz not found."});
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({message: "Failed to retrieve quiz."});
  }
};

/**
 * Create a new quiz.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const createQuiz = async (req, res) => {
  try {
    // Get the userId from the session object
    const userId = req.session.user.id;
    const quiz = await quizService.createQuiz(req.body, userId);
    res.status(201).json(quiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({message: "Failed to create quiz."});
  }
};

/**
 * Update an existing quiz.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const updateQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const userId = req.session.user.id;
    const updatedQuiz = await quizService.updateQuiz(quizId, userId, req.body);

    if (!updatedQuiz) {
      return res
        .status(404)
        .json({message: "Quiz not found or you are not the owner."});
    }
    res.json(updatedQuiz);
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({message: "Failed to update quiz."});
  }
};

/**
 * Delete a quiz.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;
    const userId = req.session.user.id;
    const success = await quizService.deleteQuiz(quizId, userId);

    if (!success) {
      return res
        .status(404)
        .json({message: "Quiz not found or you are not the owner."});
    }
    res.status(204).end(); // Success, no content
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({message: "Failed to delete quiz."});
  }
};


 export {
   getAllQuizzes,
   getQuiz,
   createQuiz,
   updateQuiz,
   deleteQuiz,
 };
