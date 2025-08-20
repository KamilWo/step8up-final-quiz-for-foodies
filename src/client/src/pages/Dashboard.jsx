import React from "react";
import { useAuth } from "../context/AuthContext";
import CardBox from "../components/CardBox";

const categories = [
  "Global Cuisine",
  "Ingredients & Flavour",
  "Cooking Techniques",
  "Baking & Desserts",
];

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <section style={{ padding: "2rem" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {categories.map((category) => (
          <CardBox key={category} category={category} />
        ))}
      </div>
    </section>
  );
}
