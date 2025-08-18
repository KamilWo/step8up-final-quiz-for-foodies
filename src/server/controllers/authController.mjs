import { UniqueConstraintError } from "sequelize";
import { User } from "../models/index.mjs";

// Handle user registration
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Add input validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required." });
    }

    const newUser = await User.create({ name, email, password });

    // Create a session for the new user
    req.session.save(() => {
      req.session.user = {
        id: newUser.id,
        name: newUser.name,
      };
      res.status(201).json({
        message: "User registered successfully!",
        user: req.session.user,
      });
    });
  } catch (err) {
    // Add specific error handling for duplicate emails
    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({ message: "Email already in use." });
    }
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to register user.", error: err.message });
  }
};

// Handle user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ where: { email } });

    if (!userData || !userData.checkPassword(password)) {
      return res.status(400).json({ message: "Incorrect email or password." });
    }

    // Create a session for the logged-in user
    req.session.save(() => {
      req.session.user = {
        id: userData.id,
        name: userData.name,
      };
      res.json({ message: "You are now logged in!", user: req.session.user });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed.", error: err.message });
  }
};

// Handle password update
const updatePassword = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.id) {
      return res
        .status(401)
        .json({ message: "You must be logged in to change your password." });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Old and new passwords are required." });
    }

    const user = await User.findByPk(req.session.user.id);

    // Handle case where user is not found in DB
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const validPassword = user.checkPassword(oldPassword);

    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect old password." });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to update password.", error: err.message });
  }
};

// Handle user logout
const logout = (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log out." });
      }
      res.status(204).end(); // No Content
    });
  } else {
    res.status(404).end(); // Not found
  }
};

export { register, login, logout, updatePassword };
