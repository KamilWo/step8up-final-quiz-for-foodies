// Import required modules
import express from "express"; // For building web application
import path from "path"; // For serving static files
import { fileURLToPath } from 'url' //To resolve __dirname in ES Modules
import cors from "cors"; // For frontend/backend communication in development
import sessionMiddleware from "./config/session.mjs"; // Import session middleware
import allRoutes from "./routes/index.mjs"; // Import the main router
import errorHandler from "./middleware/errorHandler.mjs"; // Global error handling middleware
// Swagger documentation setup
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./config/swagger.mjs";

// Replicate __dirname functionality in ES Modules for path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Middleware to handle CORS (Cross-Origin Resource Sharing)
// Configure CORS to allow credentials from the client origin
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware to parse incoming JSON requests of content-type - application/json
app.use(express.json());

// Middleware to parse incoming URL-encoded requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Use session middleware
app.use(sessionMiddleware);

// Serve static files from the 'public' directory (for CSS, JS, images)
app.use(express.static(path.join(__dirname, "../client/dist")));

// Swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount all routes from the main router
app.use("/", allRoutes);

// Wildcard route to handle undefined routes (404 Not Found)
// This must be placed after all other routes. Express 5.x.x has named parameter (any)
app.all("*any", (req, res) => {
  res.status(404);
  // If the request is for an API route, send JSON, otherwise let the client handle it.
  if (req.originalUrl.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }
  // For non-API routes, send the main HTML file to let the client-side router work.
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.use(errorHandler); // Global error handling middleware (should be last)

export default app;
