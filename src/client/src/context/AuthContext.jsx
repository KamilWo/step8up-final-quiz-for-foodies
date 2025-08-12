import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [token, user]);

  const API_BASE = import.meta.env.VITE_API_URL || "/api";

  async function login({ email, password }) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // if using cookies for auth
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    setToken(data.token ?? null);
    setUser(data.user ?? null);
    return data;
  }

  async function register({ name, email, password }) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    // depending on API you might log in the user automatically:
    setToken(data.token ?? null);
    setUser(data.user ?? null);
    return data;
  }

  function logout() {
    // Clear token and user state
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// This context provides authentication functionality including login, registration, and logout.
// It manages user state and token storage in localStorage.
// The API base URL can be configured via environment variables, defaulting to "/api".
// The `AuthProvider` wraps the application to provide auth context to all components.
// The `useAuth` hook allows easy access to authentication methods and user state throughout the app.
// The `login` and `register` methods handle user authentication and registration, respectively.
// The `logout` method clears the user and token state, effectively logging the user out.
// This setup is typical for React applications that require user authentication and session management.
// The context can be expanded to include additional user-related functionality, such as fetching user profile data or updating user information.
// The context can also be adapted to handle different authentication strategies, such as OAuth or JWT.
