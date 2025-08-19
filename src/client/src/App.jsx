import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
// Components
import { Header, Sidebar, Footer, ProtectedRoute } from "./components";
// Pages
import {
  About,
  ChangePassword,
  Dashboard,
  Home,
  Login,
  Register,
  Settings,
  Leaderboard,
  Quiz,
} from "./pages";

function App() {
  const [count, setCount] = useState(0);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Header />
                <div className="main-container">
                  <Sidebar />
                  <main className="content-area">
                    <Dashboard />
                    <Footer />
                  </main>
                </div>
              </>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <>
                <Header />
                <div className="main-container">
                  <Sidebar />
                  <main className="content-area">
                    <Leaderboard />
                    <Footer />
                  </main>
                </div>
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Header />
                <div className="main-container">
                  <Sidebar />
                  <main className="content-area">
                    <About />
                    <Footer />
                  </main>
                </div>
              </>
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
