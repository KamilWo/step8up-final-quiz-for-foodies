import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import logo from "../../assets/logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await auth.login({ email, password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page-container">
      <div className="register-image-section">{}</div>
      <div className="register-form-section">
        <div className="logo">
          <img src={logo} alt="Your Website Logo" className="logo-image" />
        </div>
        <div className="welcome-text">
          <h1>Sign in</h1>
          <p>
            Login to your account to track your progress, climb the global
            leaderboards, and unlock exclusive quiz badges. Your journey to
            trivia stardom starts here!
          </p>
        </div>
        <form
          className="register-form"
          onSubmit={handleSubmit}
          aria-describedby="error"
        >
          {error && (
            <div id="error" className="error-message" role="alert">
              {error}
            </div>
          )}
          <div className="form-field">
            <input
              id="email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="email-input">Email</label>
          </div>
          <div className="form-field">
            <input
              id="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="password-input">Password</label>
          </div>
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "#CF3F28",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// This component handles user login, managing state for email, password, loading status, and error messages.
// It uses the AuthContext to call the login function and navigate to the dashboard upon successful login.
// If an error occurs, it displays the error message to the user.
// The form includes basic validation to ensure email and password fields are filled out before submission.
// It also handles loading state to disable the submit button while the login request is in progress.
// The component is designed to be user-friendly, providing clear feedback on the login process and any issues that arise.
