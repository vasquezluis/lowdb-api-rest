import express from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();

// swagger settings
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tasks API",
      version: "1.0.0",
      description: "A simple express library API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const specs = swaggerJSDoc(options);

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// routes
app.use(tasksRoutes);

export default app;
