import { Router } from "express";
import {
  addOrUpdateRank,
  getRank,
  getLeaderboard,
} from "../../controllers/rankController.mjs";

const router = Router();

// Route to get leaderboard data
// GET /api/rank/leaderboard
router.get("/leaderboard", getLeaderboard);

// Route to add or update a rank
// POST /api/rank
router.post("/", addOrUpdateRank);

// Route to get a specific rank by user and category
// GET /api/rank/:userId/:category
router.get("/:userId/:category", getRank);

export default router;
