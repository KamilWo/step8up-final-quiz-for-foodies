// This file handles the business logic for Quizzes, using Sequelize.
// It interacts directly with the data source (in this case, MySQL or PostgreSQL database).

import sequelize from "../config/sequelize.mjs";
import { User, Quiz } from "../models/index.mjs"; // Use the associated models

/**
 * Reads all quizzes from the database, optionally filtering by category.
 * @param {string|null} category - The string value of the Quiz.category to filter by.
 * @returns {Promise<Quiz[]>} A promise that resolves to an array of Quiz objects.
 */
const getQuizzes = async (category) => {
  try {
    const findOptions = {
      order: [["updatedAt", "DESC"]],
    };

    // If a category is provided, add a 'where' clause.
    // This tells Sequelize to only return quizzes having that category.
    if (category) {
      findOptions.include[1].where = { category: category };
    }

    return await Quiz.findAll(findOptions);
  } catch (error) {
    console.error("Error fetching quizzes from database:", error);
    throw error;
  }
};

/**
 * Retrieves a single quiz by its ID from the database.
 * @param {string} id - The ID of the quiz to retrieve.
 * @returns {Promise<Quiz|null>} A promise that resolves to the Quiz object if found, otherwise null.
 */
const getQuizById = async (id) => {
  try {
    const quiz = await Quiz.findByPk(id, {});
    return quiz; // This will be the quiz object or null
  } catch (error) {
    console.error(`Error fetching quiz with id ${id}:`, error);
    throw error;
  }
};

/**
 * Creates a new quiz.
 * @param {object} quizData - The data for the new Quiz (title, content).
 * @returns {Promise<Quiz>} A promise that resolves to the newly created Quiz object.
 */
const createQuiz = async (quizData) => {
  const { category, question, answer, difficulty, option_01, option_02, option_03, option_04 } = quizData;

  // Use a transaction to ensure atomicity
  const t = await sequelize.transaction();

  try {
    const newQuiz = await Quiz.create(
      {
        category, question, answer, difficulty, option_01, option_02, option_03, option_04
      },
      { transaction: t }
    );

    await t.commit();

    return Quiz.findByPk(newQuiz.id, {});
  } catch (error) {
    // If any step fails, roll back the transaction
    await t.rollback();
    console.error("Error creating quiz in database:", error);
    throw error; // Re-throw the error to be handled by the controller
  }
};

/**
 * Updates a quiz and its categories.
 * @param {string} quizId - The ID of the quiz to update.
 * @param {object} updatedData - The new data for the quiz (category, question, answer, difficulty, ...).
 * @returns {Promise<Quiz|null>} A promise that resolves to the updated Quiz or null if not found/not authorized.
 */
const updateQuiz = async (quizId, updatedData) => {
  const { category, question, answer, difficulty, option_01, option_02, option_03, option_04 } = updatedData;

  // Use a transaction for atomicity
  const t = await sequelize.transaction();

  try {
    const quizToUpdate = await Quiz.findOne({
      where: { id: quizId },
      transaction: t,
    });

    // If quiz not found or user is not the owner, return null
    if (!quizToUpdate) {
      await t.rollback();
      return null;
    }

    if (category !== null && category !== '') {
      quizToUpdate.category = category;
    }
    if (question !== null && question !== '') {
      quizToUpdate.question = question;
    }
    if (answer !== null && answer !== '') {
      quizToUpdate.answer = answer;
    }
    if (difficulty !== null && difficulty !== '') {
      quizToUpdate.difficulty = difficulty;
    }
    if (option_01 !== null && option_01 !== '') {
      quizToUpdate.option_01 = option_01;
    }
    if (option_02 !== null && option_02 !== '') {
      quizToUpdate.option_02 = option_02;
    }
    if (option_03 !== null && option_03 !== '') {
      quizToUpdate.option_03 = option_03;
    }
    if (option_04 !== null && option_04 !== '') {
      quizToUpdate.option_04 = option_04;
    }
    await quizToUpdate.save({ transaction: t });
    await t.commit();

    return Quiz.findByPk(quizId, { });

  } catch (error) {
    // In case of error, roll back the transaction
    await t.rollback();
    console.error(`Error updating quiz with id ${quizId}:`, error);
    throw error;
  }
};

/**
 * Deletes a quiz, but only if the user is the owner.
 * @param {string} quizId - The ID of the quiz to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if deleted, false otherwise.
 */
const deleteQuiz = async (quizId) => {
  try {
    const affectedRows = await Quiz.destroy({
      where: {
        id: quizId,
      },
    });
    // Returns true if 1 row was deleted, false if 0 rows were deleted
    return affectedRows > 0;
  } catch (error) {
    console.error(`Error deleting quiz with id ${quizId}:`, error);
    throw error;
  }
};

export default {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};
