import { Router } from "express";
import { httpGetAllLaunches } from "./launches.controller";

const launchesRouter = Router();

launchesRouter.get("/", httpGetAllLaunches);

export default launchesRouter;
