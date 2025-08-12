import sequelize from "../config/sequelize.mjs";
import models from "../models/index.mjs";
import seedQuizzes from "./quizzes_with_options.json" with { type: "json" };

const { User, Quiz } = models;

const seedUsers = [
  {
    username: "testuser1",
    email: "test1@example.com",
    password: "password123",
  },
  {
    username: "testuser2",
    email: "test2@example.com",
    password: "password456",
  },
];

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced!");

    // Seed users, using individualHooks to ensure password hashing
    await User.bulkCreate(seedUsers, {
      individualHooks: true, // so password hashing works
    });
    console.log("Users seeded!");

    // Seed quizzes
    await Quiz.bulkCreate(seedQuizzes);
    console.log("Quizzes seeded!");

    console.log("\nDatabase seeding completed successfully!\n");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDatabase();
