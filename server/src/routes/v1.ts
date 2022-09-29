import { Router } from "express";
import launchesRouter from "./launches/launches.router";
import planetsRouter from "./planets/planets.router";

const v1 = Router();

v1.use("/planets", planetsRouter);
v1.use("/launches", launchesRouter);

export default v1;
