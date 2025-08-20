import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const teamMembers = [
    {
      name: "Kamil Wozniak",
      bio: "Kamil is a passionate foodie and the visionary behind Taste Trivia. With a background in culinary arts and a love for technology, he combined his two passions to create a platform that entertains and educates.",
      imageUrl: "https://source.unsplash.com/400x400/?person",
    },
    {
      name: "Emily-Mae Kona",
      bio: "Emily-Mae is a software engineer with a knack for creating beautiful and intuitive user interfaces. She believes that a great user experience is as important as the content itself.",
      imageUrl: "https://source.unsplash.com/400x400/?woman",
    },
    {
      name: "Charlie Cooke",
      bio: "Charlie is our quiz master, responsible for crafting the challenging and engaging questions that you love. His extensive knowledge of food history and culture makes every quiz a new adventure.",
      imageUrl: "https://source.unsplash.com/400x400/?man",
    },
    {
      name: "Wani Aris",
      bio: "Wani is a marketing specialist who helps spread the word about Taste Trivia. She's passionate about building a community of food lovers and connecting with our users.",
      imageUrl: "https://source.unsplash.com/400x400/?girl",
    },
    {
      name: "Isaac Henry Kusi",
      bio: "Isaac is a backend developer who ensures that Taste Trivia runs smoothly. He's the reason you can enjoy our quizzes without a hitch.",
      imageUrl: "https://source.unsplash.com/400x400/?guy",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Taste Trivia</h1>
        <p className="text-lg text-gray-600">
          The ultimate quiz app for food lovers!
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed">
          Taste Trivia was born from a shared love for food and a desire to
          create a fun and engaging way for people to test their culinary
          knowledge. We believe that food is more than just sustenance—it's a
          way to connect with different cultures, explore new flavors, and
          challenge ourselves. Whether you're a seasoned chef or a curious
          foodie, our app offers a unique way to learn, play, and connect with a
          community of like-minded individuals.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
            >
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{member.name}</h3>
              <p className="text-gray-700">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Test Your Taste?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Join our community of foodies and challenge yourself today!
        </p>
        <Link
          to="/dashboard"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700"
        >
          Explore Quizzes
        </Link>
      </section>
    </div>
  );
};

export default About;
