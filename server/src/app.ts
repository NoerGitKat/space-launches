import cors from "cors";
import express, { Express, json } from "express";
import { join } from "path";
import { getIndexPage } from "./routes/planets/planets.controller";

import planetsRouter from "./routes/planets/planets.router";

const app: Express = express();

app.use(
    cors({
        origin: "http://localhost:3000",
    }),
);
app.use(json());
app.use(express.static(join(__dirname, "..", "public")));

// Routes
app.get("/", getIndexPage);
app.use("/planets", planetsRouter);

export default app;
