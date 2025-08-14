import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ChangePassword() {
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
    // TODO: Call API to update password here
    setMessage("Password updated successfully!"); // Replace with actual API response
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Current Password
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          New Password
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Update Password</button>
      </form>
      {message && <p>{message}</p>}
      <nav>
        <Link to="/settings">Back to Settings</Link>
      </nav>
    </main>
  );
}
