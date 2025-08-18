import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Leaderboard.css";

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
  const { user, logout } = useAuth();

  const categories = [
    { key: "global-cuisine", label: "GLOBAL CUISINE" },
    { key: "ingredients-flavour", label: "INGREDIENTS & FLAVOUR" },
    { key: "cooking-techniques", label: "COOKING TECHNIQUES" },
    { key: "baking-desserts", label: "BAKING & DESSERTS" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("global-cuisine");
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
    <>
      <div className="leaderboard-container">
        <h1>Leaderboard</h1>
        <p>
          Logged in as <strong>{user?.name || user?.email}</strong>
        </p>
        <p className="muted-text">View your global rankings</p>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`category-tab ${
                selectedCategory === cat.key ? "active" : ""
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-text">Loading leaderboard...</div>
        ) : error ? (
          <div className="error-text">{error}</div>
        ) : (
          leaderboard && (
            <>
              {/* Top Players */}
              <div>
                {leaderboard.topPlayers.map((player) => (
                  <div key={player.rank} className="top-player-card">
                    <div className="row">
                      <span className="top-player-rank">#{player.rank}</span>
                      <span className="top-player-name">{player.name}</span>
                    </div>
                    <div className="top-player-score">
                      <span>
                        {player.medal === "gold" && "🥇"}
                        {player.medal === "silver" && "🥈"}
                        {player.medal === "bronze" && "🥉"}
                      </span>
                      {player.score}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <hr className="divider" />

              {/* User Rankings */}
              <div>
                {leaderboard.userRankings.map((player) => (
                  <div
                    key={player.rank}
                    className={`user-ranking-card ${
                      player.currentUser ? "current-user" : ""
                    }`}
                  >
                    <div className="row">
                      <span className="user-rank">#{player.rank}</span>
                      <span
                        className={`user-name ${
                          player.currentUser ? "current" : ""
                        }`}
                      >
                        {player.name}
                      </span>
                    </div>
                    <span className="user-score">{player.score}</span>
                  </div>
                ))}
              </div>
            </>
          )
        )}

        <nav>
          <Link to="/">Back to Home</Link> |{" "}
          <button onClick={logout}>Logout</button>
        </nav>
      </div>
    </>
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
