import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CardBox from "../components/CardBox";
import Question from "../components/Question";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main style={{ padding: "2rem" }}>
      <CardBox />
      {/*       <h1>Dashboard</h1>
      <p>
        Logged in as <strong>{user?.name || user?.email}</strong>
      </p>
      <nav>
        <Link to="/">Back to Home</Link> |{" "}
        <button onClick={logout}>Logout</button>
      </nav> */}
    </main>
  );
}
// This Dashboard component serves as a placeholder for the user's dashboard or leaderboard.
// It displays the logged-in user's name or email and provides a link back to the home page.
// The component uses the `useAuth` hook to access the current user state and the logout function.
// The dashboard can be expanded in the future to include user-specific content, such as quiz results or leaderboards.
// The logout button allows users to log out of their account, clearing their session.
