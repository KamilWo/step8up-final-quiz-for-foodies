import { Rank, User } from "../models/index.mjs";

// Add or update a user's rank for a specific category
const addOrUpdateRank = async (req, res) => {
  try {
    const { userId, category, score } = req.body;

    if (!userId || !category || score === undefined) {
      return res
        .status(400)
        .json({ message: "userId, category, and score are required." });
    }

    // Optional but recommended: Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find an existing rank record or create a new one
    const [rank, created] = await Rank.findOrCreate({
      where: { userId: userId, category: category },
      defaults: { score: score },
    });

    if (!created) {
      // If the rank already existed, update the score
      rank.score = score;
      await rank.save();
    }

    res.status(created ? 201 : 200).json(rank);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update rank.", error: err.message });
  }
};

// Get a user's rank for a specific category
const getRank = async (req, res) => {
  try {
    const { userId, category } = req.params;

    const rank = await Rank.findOne({
      where: { userId: userId, category },
    });

    if (!rank) {
      return res.status(404).json({ message: "Rank not found for this user and category." });
    }

    res.json(rank);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve rank.", error: err.message });
  }
};

export { addOrUpdateRank, getRank };
