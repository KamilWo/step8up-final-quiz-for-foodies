import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Register.css";
import logo from "../../assets/logo.png";

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
      console.log("Registration submitted:", { name, email, password });
      navigate("/dashboard"); // or /login depending on your flow
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page-container">
      <div className="register-image-section">
        {/* The image is handled by the CSS background property */}
      </div>
      <div className="register-form-section">
        <div className="logo">
          <img src={logo} alt="Taste Trivia Logo" className="logo-image" />
        </div>
        <div className="welcome-text">
          <h1>Create your account</h1>
          <p>
            Create a free account to track your progress, climb the global
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
              id="name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="name-input">Full name</label>
          </div>
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
              minLength={8}
              placeholder=" "
            />
            <label htmlFor="password-input">Password</label>
          </div>
          <div className="form-field">
            <input
              id="confirm-input"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              placeholder=" "
            />
            <label htmlFor="confirm-input">Confirm Password</label>
          </div>
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#CF3F28",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
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
