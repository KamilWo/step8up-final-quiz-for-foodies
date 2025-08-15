import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  // const { user, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }
    if (!currentPassword || !newPassword) {
      setMessage("Please fill in all fields.");
      return;
    }
    // WANI TODO: Call API to update password here
    setMessage("Password updated successfully!"); // Replace with actual API response
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Settings</h1>
      {/* <p>
        Logged in as <strong>{user?.name || user?.email}</strong>
      </p> */}
      <div>
        <h2>Account</h2>
        <p>
          <Link to="/change-password">Change your password</Link>
        </p>
      </div>
      <nav>
        <Link to="/">Back to Home</Link> |{" "}
        {/* <button onClick={logout}>Logout</button> */}
      </nav>
    </main>
  );
}
// This Dashboard component serves as a placeholder for the user's dashboard or leaderboard.
// It displays the logged-in user's name or email and provides a link back to the home page.
// The component uses the `useAuth` hook to access the current user state and the logout function.
// The dashboard can be expanded in the future to include user-specific content, such as quiz results or leaderboards.
// The logout button allows users to log out of their account, clearing their session.
