import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import "./Home.css";

export default function Home() {
  const { user, logout } = useAuth();

  return (
    <main style={{ padding: "2rem" }}>
      <div className="logo">
        <img src={logo} alt="Taste Trivia Logo" className="logo-image" />
      </div>
      {user ? (
        <>
          <p className="text-xl">Welcome back, {user.name || "Foodie"}!</p>
          <nav className="mt-4 flex items-center gap-x-4">
            <Link
              to="/dashboard"
              className="font-medium text-indigo-600 hover:underline"
            >
              Go to Dashboard
            </Link>
            &nbsp;|&nbsp;
            <button
              onClick={logout}
              className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Logout
            </button>
          </nav>
        </>
      ) : (
        <>
          <p className="text-xl">
            Test your tastebuds and challenge your culinary knowledge!
          </p>
          <nav className="mt-4 flex items-center gap-x-6">
            <Link
              to="/login"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </Link>
            &nbsp;|&nbsp;
            <Link
              to="/register"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Register
            </Link>
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
