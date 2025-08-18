import session from "express-session";
import config from "./index.mjs";

const sessionConfig = {
  secret: config.jwtSecret, // Reuse JWT secret for session signing
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
};

export default session(sessionConfig);
