import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Leaderboard.css";

const Leaderboard = () => {
  const { user, logout } = useAuth();

  const categories = [
    { key: "Global Cuisine", label: "GLOBAL CUISINE" },
    { key: "Ingredients & Flavour", label: "INGREDIENTS & FLAVOUR" },
    { key: "Cooking Techniques", label: "COOKING TECHNIQUES" },
    { key: "Baking & Desserts", label: "BAKING & DESSERTS" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Global Cuisine");
  const [leaderboard, setLeaderboard] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_URL || "/api";

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/rank/leaderboard`);
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        setLeaderboard(data);
      } catch (err) {
        setError("Failed to load leaderboard. Please try again later.");
      }
      setLoading(false);
    };

    loadLeaderboard();
  }, [API_BASE]);

  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  const currentCategoryRanks = leaderboard[selectedCategory] || [];

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
          <div>
            {currentCategoryRanks.map((player, index) => (
              <div key={player.id} className="top-player-card">
                <div className="row">
                  <span className="top-player-rank">#{index + 1}</span>
                  <span className="top-player-name">{player.User.name}</span>
                </div>
                <div className="top-player-score">
                  <span>{getMedal(index + 1)}</span>
                  {player.score}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* <nav>
          <Link to="/">Back to Home</Link> |{" "}
          <button onClick={logout}>Logout</button>
        </nav> */}
      </div>
    </>
  );
};

export default Leaderboard;
