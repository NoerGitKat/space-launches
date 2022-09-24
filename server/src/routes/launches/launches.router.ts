import { Router } from "express";
import {
    httpAddNewLaunch,
    httpGetAllLaunches,
    httpAbortLaunch,
} from "./launches.controller";

const launchesRouter = Router();

launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

export default launchesRouter;
