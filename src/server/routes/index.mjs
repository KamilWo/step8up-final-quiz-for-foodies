// This file acts as a central point for managing all the application routes.
// It can include both API routes and any general web routes (if we had them).

import express from "express";
import path from "path";
import {fileURLToPath} from 'url'; // To resolve __dirname in ES Modules
import sequelize from "../config/sequelize.mjs"; // Connect to the database for health check
// Import API routes
import authApiRoutes from "./api/auth.mjs";
import rankRoutes from "./api/rank.mjs";
import quizzesApiRoutes from "./api/quizzes.mjs";

// Replicate __dirname functionality in ES Modules for path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// --- Health Check Route ---
router.get("/healthz", async (req, res) => {
  try {
    // Use sequelize.authenticate() for a robust health check.
    // This is the standard way to verify the database connection with Sequelize.
    await sequelize.authenticate();
    res.status(200).json({status: "ok", database: "connected"});
  } catch (error) {
    console.error("Health check failed:", error);
    // 503 Service Unavailable is the standard code for a failed health check
    res.status(503).json({status: "error", database: "disconnected"});
  }
});

// Mount API routes under a specific prefixes
router.use("/api/auth", authApiRoutes);
router.use("/api/rank", rankRoutes);
router.use("/api/quizzes", quizzesApiRoutes);

// A simple welcome route for the root API path
router.get("/api", (req, res) => {
  res.json({message: "Welcome to the Quiz API."});
});

// --- Static Page Routes ---

// Define the path to the public directory
const publicPath = path.join(__dirname, "../../client/dist");

router.use(express.static(publicPath));

router.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

export default router;
