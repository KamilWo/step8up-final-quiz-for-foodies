import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const About = () => {
  return (
    <div>
      <section>
        <h2>About Us</h2>
        <p>
          Welcome to Quiz for Foodies, the ultimate quiz app for food lovers!
          Test your knowledge about cuisines, ingredients, and cooking
          techniques with our fun and interactive quizzes.
        </p>
        <p>
          Whether you're a seasoned chef or just starting out in the kitchen,
          there's something for everyone. Join our community of foodies and
          challenge yourself today!
        </p>
      </section>

      <section>
        <h3>Our Mission</h3>
        <p>
          At Quiz for Foodies, our mission is to create a fun and engaging
          platform for food enthusiasts to test their knowledge and learn more
          about the culinary world. We believe that food is not just sustenance,
          but a way to connect with others and explore different cultures.
        </p>
      </section>
    </div>
  );
};

export default About;
