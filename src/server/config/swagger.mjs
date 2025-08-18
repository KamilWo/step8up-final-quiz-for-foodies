// import path from "path";
// import {fileURLToPath} from "url";
import config from "./index.mjs";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Quiz for Foodies API",
      version: "1.0.0",
      description:
        "API documentation for the Quiz for Foodies application. This API provides endpoints for managing quizzes, questions, and user scores.",
      contact: {
        name: "API Support",
        url: "https://example.com/support",
        email: "support@example.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api`,
        description: "Development server",
      },
      {
        url: "https://your-production-api.com/api",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token in the format: Bearer <token>",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Path to the API docs. The path is relative to the project root from where the app is started.
  apis: ["./src/server/routes/**/*.mjs"],
};

export default swaggerOptions;
