import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CardBox from "../components/CardBox";
import Question from "../components/Question";
import Quiz from "./Quiz";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main style={{ padding: "2rem" }}>
      <CardBox
        icon={"earthAfrica"}
        title={"Global Cuisine"}
        difficulty={"Difficulty level: Easy"}
        highscore={0}
        banner={"globalCuisine"}
        content={
          "<p>Ready for a trip around the world? ✈️🌍 No passport required! From the sizzling street food of Mexico to the savory curries of India, we're taking your taste buds on a global tour.</p><p>Think you can tell your goulash from your gumbo? Put your foodie knowledge to the test!</p>"
        }
      />
    </main>
  );
}
// This Dashboard component serves as a placeholder for the user's dashboard or leaderboard.
// It displays the logged-in user's name or email and provides a link back to the home page.
// The component uses the `useAuth` hook to access the current user state and the logout function.
// The dashboard can be expanded in the future to include user-specific content, such as quiz results or leaderboards.
// The logout button allows users to log out of their account, clearing their session.
