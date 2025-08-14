import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer"; // import the footer
import About from "./pages/About"; // import the About page
import Dashboard from "./pages/Dashboard"; // just a placeholder for the dashboard
import Home from "./pages/Home"; // just a placeholder for the home page
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
                <About />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

// This is the main application component that sets up routing and authentication context.
// It uses React Router to define routes for the home page, login, registration, and a protected dashboard.
// The AuthProvider wraps the entire application to provide authentication state and functions to all components.
// The ProtectedRoute component ensures that only authenticated users can access the dashboard, redirecting unauthenticated users to the login page.
// This structure allows for a clean separation of concerns and makes it easy to manage user authentication throughout the app.
// The Home component can be a landing page or informational page about the quiz app.
// The Dashboard component should be implemented to display user-specific content, such as quiz results or leaderboards.
// The Login and Register components handle user authentication, allowing users to log in or create an account.
// This setup is typical for a React application that requires user authentication and protected routes.
// The Settings component allows users to change their account settings, such as password or email.
// It is protected and can only be accessed by authenticated users.
// The ChangePassword component allows users to change their password.
// It should be implemented to handle password change functionality, including form validation and API integration.
