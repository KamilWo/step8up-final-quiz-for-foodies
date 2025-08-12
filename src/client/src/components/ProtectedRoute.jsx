import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}
// This component checks if the user is authenticated before rendering the children components.
// If the user is not authenticated, it redirects them to the login page.
// It uses the AuthContext to access the current user state.
// The `replace` prop in `Navigate` ensures that the login page does not remain in the history stack, preventing the user from navigating back to it after logging in.
// This is useful for protecting routes that require authentication, ensuring that only logged-in users can access certain parts of the application.
// It can be used to wrap any component that should only be accessible to authenticated users, such as a dashboard or profile page.
