import cors from "cors";
import express, { Express, json } from "express";
import morgan from "morgan";
import { join } from "path";
import launchesRouter from "./routes/launches/launches.router";

import { getIndexPage } from "./routes/planets/planets.controller";

import planetsRouter from "./routes/planets/planets.router";

const app: Express = express();

app.use(
    cors({
        origin: "http://localhost:3000",
    }),
);
app.use(morgan("combined"));
app.use(json());
app.use(express.static(join(__dirname, "..", "public")));

// Routes
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
app.get("/*", getIndexPage);

export default app;
