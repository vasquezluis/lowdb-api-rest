import express from "express";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import tasksRoutes from "./routes/tasks.routes.js";

import swaggerOptionsFile from "./swagger.json" assert { type: "json" };

const app = express();

const specs = swaggerJSDoc(swaggerOptionsFile);

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// routes
app.use(tasksRoutes);

export default app;
