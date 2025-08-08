import {Sequelize} from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

// Throw a more helpful error if the database URL is missing.
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set. Please check your .env file.");
}

// Initialize Sequelize with database credentials from environment variables
const sequelize = new Sequelize(databaseUrl, {
  dialect: process.env.DB_DIALECT || "mysql",
  dialectOptions: {
    // For production environments (like Render), a secure SSL connection is required.
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            require: true, // Enforce SSL connections
            rejectUnauthorized: false, // Allow self-signed certificates
          }
        : false,
  },
  logging: false, // Set to console.log to see executed SQL queries
});

export default sequelize;
