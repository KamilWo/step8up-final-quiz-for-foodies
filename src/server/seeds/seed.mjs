import sequelize from "../config/sequelize.mjs";
import { User, Quiz, Rank } from "../models/index.mjs";
import seedQuizzes from "./quizzes_with_options.json" with { type: "json" };

const seedUsers = [
  {
    name: "Test User1",
    email: "test1@example.com",
    password: "password123",
  },
  {
    name: "Test User2",
    email: "test2@example.com",
    password: "password456",
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
