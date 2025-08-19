import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await auth.register({ name, email, password });
      navigate("/dashboard"); // or /login depending on your flow
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Create account</h1>
      <form onSubmit={handleSubmit} aria-describedby="error">
        {error && (
          <div id="error" role="alert">
            {error}
          </div>
        )}
        <label>
          Full name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create account"}
        </button>
      </form>
    </main>
  );
}

// This component handles user registration, managing state for name, email, password, confirmation, loading status, and error messages.
// It uses the AuthContext to call the register function and navigate to the dashboard upon successful registration.
// If an error occurs, it displays the error message to the user.
// The form includes basic validation to ensure all fields are filled out before submission.
// It also handles loading state to disable the submit button while the registration request is in progress.
// The component is designed to be user-friendly, providing clear feedback on the registration process and any issues that arise.
// It also checks if the password and confirmation match before proceeding with registration.
// The component is structured to be accessible, with appropriate ARIA roles and labels for form elements.
// This component is a part of the authentication flow in the application, allowing users to create a new account.
