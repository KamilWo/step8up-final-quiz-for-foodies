import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <main style={{ padding: "2rem" }}>
      <div className="logo">
        <img src={logo} alt="Taste Trivia Logo" className="logo-image" />
      </div>
      {user ? (
        <>
          <p>Welcome back, {user.name || "Foodie"}!</p>
          <nav>
            <Link to="/dashboard">Go to Dashboard</Link> |{" "}
            <button onClick={logout}>Logout</button>
          </nav>
        </>
      ) : (
        <>
          <p>Test your tastebuds and challenge your culinary knowledge!</p>
          <nav>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link>
          </nav>
        </>
      )}
    </main>
  );
}
// This Home component serves as the landing page for the quiz application.
// It displays a welcome message and provides navigation links based on the user's authentication status.
// If the user is logged in, it shows their name (or a default "Foodie" if not available) and provides a link to the dashboard and a logout button.
// If the user is not logged in, it prompts them to log in or register.
// The component uses the `useAuth` hook to access the current user state and the logout function.
