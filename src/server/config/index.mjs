// This file holds general application configuration settings.
import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
};

if (!config.jwtSecret) {
  console.warn(
    "Warning: JWT_SECRET environment variable is not set. Using a default, insecure secret. Please set this in your .env file for production."
  );
  config.jwtSecret = "this-is-a-super-secret-key-that-should-be-in-env";
}

export default config;
