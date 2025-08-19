import sequelize from "../config/sequelize.mjs";
import { User, Quiz, Rank } from "../models/index.mjs";
import seedQuizzes from "./quizzes_with_options.json" with { type: "json" };

const seedUsers = [
  {
    name: "Emily-Mae Kona",
    email: "test1@test.com",
    password: "password123",
  },
  {
    name: "Charlie Cooke",
    email: "test2@test.com",
    password: "password123",
  },
  {
    name: "Isaac Henry Kusi",
    email: "test3@test.com",
    password: "password123",
  },
  {
    name: "Wani Aris",
    email: "test4@test.com",
    password: "password123",
  },
  {
    name: "Kamil Wozniak",
    email: "test5@test.com",
    password: "password123",
  },
];

const seedRanks = [
  // User 1
  { user_id: 1, category: "Global Cuisine", score: 85 },
  { user_id: 1, category: "Ingredients & Flavour", score: 92 },
  { user_id: 1, category: "Cooking Techniques", score: 78 },
  { user_id: 1, category: "Baking & Desserts", score: 88 },
  // User 2
  { user_id: 2, category: "Global Cuisine", score: 72 },
  { user_id: 2, category: "Ingredients & Flavour", score: 81 },
  { user_id: 2, category: "Cooking Techniques", score: 65 },
  { user_id: 2, category: "Baking & Desserts", score: 79 },
  // User 3
  { user_id: 3, category: "Global Cuisine", score: 80 },
  { user_id: 3, category: "Ingredients & Flavour", score: 85 },
  { user_id: 3, category: "Cooking Techniques", score: 75 },
  { user_id: 3, category: "Baking & Desserts", score: 82 },
  // User 4
  { user_id: 4, category: "Global Cuisine", score: 90 },
  { user_id: 4, category: "Ingredients & Flavour", score: 88 },
  { user_id: 4, category: "Cooking Techniques", score: 82 },
  { user_id: 4, category: "Baking & Desserts", score: 95 },
  // User 5
  { user_id: 5, category: "Global Cuisine", score: 95 },
  { user_id: 5, category: "Ingredients & Flavour", score: 90 },
  { user_id: 5, category: "Cooking Techniques", score: 88 },
  { user_id: 5, category: "Baking & Desserts", score: 93 },
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

    // Seed ranks
    await Rank.bulkCreate(seedRanks);
    console.log("Ranks seeded!");

    console.log("\nDatabase seeding completed successfully!\n");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDatabase();
