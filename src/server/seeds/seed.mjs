import sequelize from "../config/sequelize.mjs";
import { User, Quiz, Rank } from "../models/index.mjs";
import seedQuizzes from "./quizzes_with_random_options.json" with { type: "json" };

const seedUsers = [
  {
    name: "Emily-Mae Kona",
    email: "emily@test.com",
    password: "password123",
  },
  {
    name: "Charlie Cooke",
    email: "charlie@test.com",
    password: "password123",
  },
  {
    name: "Isaac Henry Kusi",
    email: "isaac@test.com",
    password: "password123",
  },
  {
    name: "Wani Aris",
    email: "wani@test.com",
    password: "password123",
  },
  {
    name: "Kamil Wozniak",
    email: "kamil@test.com",
    password: "password123",
  },
];

const categories = [
  "Global Cuisine",
  "Ingredients & Flavour",
  "Cooking Techniques",
  "Baking & Desserts"
];

const seedRanks = [
  // User 1
  { user_id: 1, category: categories[0], score: 4 },
  { user_id: 1, category: categories[1], score: 5 },
  { user_id: 1, category: categories[2], score: 1 },
  { user_id: 1, category: categories[3], score: 1 },
  // User 2
  { user_id: 2, category: categories[0], score: 2 },
  { user_id: 2, category: categories[1], score: 3 },
  { user_id: 2, category: categories[2], score: 5 },
  { user_id: 2, category: categories[3], score: 4 },
  // User 3
  { user_id: 3, category: categories[0], score: 3 },
  { user_id: 3, category: categories[1], score: 1 },
  { user_id: 3, category: categories[2], score: 2 },
  { user_id: 3, category: categories[3], score: 5 },
  // User 4
  { user_id: 4, category: categories[0], score: 5 },
  { user_id: 4, category: categories[1], score: 4 },
  { user_id: 4, category: categories[2], score: 3 },
  { user_id: 4, category: categories[3], score: 2 },
  // User 5
  { user_id: 5, category: categories[0], score: 1 },
  { user_id: 5, category: categories[1], score: 2 },
  { user_id: 5, category: categories[2], score: 4 },
  { user_id: 5, category: categories[3], score: 3 },
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
