import cors from "cors";
import express, { Express, json } from "express";
import morgan from "morgan";
import { join } from "path";

import { getIndexPage } from "./routes/planets/planets.controller";
import v1 from "./routes/v1";

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
app.use("/v1", v1);

app.get("/*", getIndexPage);

export default app;
