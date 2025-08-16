import React, { useEffect, useState } from "react";

// Mock API function (simulates server response)
const mockFetchLeaderboard = (category) => {
  const mockData = {
    "global-cuisine": {
      totalPlayers: 2190,
      topPlayers: [
        { rank: 1, name: "CHARLIE COOKE", score: 340, medal: "gold" },
        { rank: 2, name: "KAMIL WOZNIAK", score: 335, medal: "silver" },
        { rank: 3, name: "WANI ARIS", score: 330, medal: "bronze" },
      ],
      userRankings: [
        { rank: 132, name: "ISAAC", score: 203 },
        { rank: 133, name: "EMILY-MAE KONA", score: 202, currentUser: true },
        { rank: 134, name: "JASON SAMMON", score: 201 },
      ],
    },
    "ingredients-flavour": {
      totalPlayers: 2190,
      topPlayers: [
        { rank: 1, name: "CHARLIE COOKE", score: 346, medal: "gold" },
        { rank: 2, name: "KAMIL WOZNIAK", score: 350, medal: "silver" },
        { rank: 3, name: "WANI ARIS", score: 349, medal: "bronze" },
      ],
      userRankings: [
        { rank: 132, name: "ISAAC", score: 203 },
        { rank: 133, name: "EMILY-MAE KONA", score: 202, currentUser: true },
        { rank: 134, name: "JASON SAMMON", score: 201 },
      ],
    },
    "cooking-techniques": {
      totalPlayers: 2190,
      topPlayers: [
        { rank: 1, name: "CHARLIE COOKE", score: 320, medal: "gold" },
        { rank: 2, name: "KAMIL WOZNIAK", score: 315, medal: "silver" },
        { rank: 3, name: "WANI ARIS", score: 310, medal: "bronze" },
      ],
      userRankings: [
        { rank: 132, name: "ISAAC", score: 203 },
        { rank: 133, name: "EMILY-MAE KONA", score: 202, currentUser: true },
        { rank: 134, name: "JASON SAMMON", score: 201 },
      ],
    },
    "baking-desserts": {
      totalPlayers: 2190,
      topPlayers: [
        { rank: 1, name: "CHARLIE COOKE", score: 310, medal: "gold" },
        { rank: 2, name: "KAMIL WOZNIAK", score: 305, medal: "silver" },
        { rank: 3, name: "WANI ARIS", score: 300, medal: "bronze" },
      ],
      userRankings: [
        { rank: 132, name: "ISAAC", score: 203 },
        { rank: 133, name: "EMILY-MAE KONA", score: 202, currentUser: true },
        { rank: 134, name: "JASON SAMMON", score: 201 },
      ],
    },
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(mockData[category]), 500); // Simulate 500ms API delay
  });
};

const Leaderboard = () => {
  const categories = [
    { key: "global-cuisine", label: "GLOBAL CUISINE" },
    { key: "ingredients-flavour", label: "INGREDIENTS & FLAVOUR" },
    { key: "cooking-techniques", label: "COOKING TECHNIQUES" },
    { key: "baking-desserts", label: "BAKING & DESSERTS" },
  ];

  const [selectedCategory, setSelectedCategory] = useState(
    "ingredients-flavour"
  );
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock API call to fetch leaderboard data - USE IN TESTING ONLY - NOT FOR PRODUCTION
  const loadLeaderboard = async (category) => {
    setLoading(true);
    const data = await mockFetchLeaderboard(category);
    setLeaderboard(data);
    setLoading(false);
  };
  // API call - USE IN PRODUCTION
  //   const API_BASE = import.meta.env.VITE_API_URL || "/api";
  //   const loadLeaderboard = async (category) => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //     const res = await fetch("${API_BASE}/leaderboard", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ category, userId }),
  //     });
  //       if (!res.ok) {
  //         throw new Error(`API error: ${res.status}`);
  //       }
  //       const data = await res.json();
  //       setLeaderboard(data);
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //     setLoading(false);
  //   };

  useEffect(() => {
    loadLeaderboard(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <p className="text-gray-500 text-sm mb-4">View your global rankings</p>

      {/* Category Tabs */}
      <div className="flex space-x-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-1 rounded-full text-sm transition ${
              selectedCategory === cat.key
                ? "bg-yellow-200 text-black font-semibold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-6">Loading leaderboard...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        leaderboard && (
          <>
            {/* Top Players */}
            <div className="space-y-3 mb-6">
              {leaderboard.topPlayers.map((player) => (
                <div
                  key={player.rank}
                  className="flex justify-between items-center bg-white shadow rounded-lg p-3"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold">#{player.rank}</span>
                    <span className="font-semibold">{player.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>
                      {player.medal === "gold" && "🥇"}
                      {player.medal === "silver" && "🥈"}
                      {player.medal === "bronze" && "🥉"}
                    </span>
                    <span className="font-bold">{player.score}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* User Rankings */}
            <div className="space-y-2">
              {leaderboard.userRankings.map((player) => (
                <div
                  key={player.rank}
                  className={`flex justify-between items-center rounded-lg p-2 ${
                    player.currentUser
                      ? "bg-yellow-100 border-l-4 border-yellow-500"
                      : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-bold text-gray-400">
                      #{player.rank}
                    </span>
                    <span
                      className={`${
                        // Note: The current user’s ID will be passed (json method post),
                        // so the backend can return their position highlighted (with "currentUser": true).
                        player.currentUser ? "font-bold text-yellow-800" : ""
                      }`}
                    >
                      {player.name}
                    </span>
                  </div>
                  <span className="font-medium">{player.score}</span>
                </div>
              ))}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Leaderboard;

// This Leaderboard component fetches and displays a leaderboard for different quiz categories.
// It allows users to switch between categories and view their rankings.
// The component uses a simple API call to fetch leaderboard data and displays it in a user-friendly format.
// It includes loading states and error handling for better user experience.
// The leaderboard is divided into two parts, the top part will list top three players,
// while the bottom part will display the current user's ranking relative to three positions.
// The leaderboard data is currently mocked for testing purposes, but can be replaced with actual API calls in production.
