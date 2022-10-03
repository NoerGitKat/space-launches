"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const launches_controller_1 = require("./launches.controller");
const launchesRouter = (0, express_1.Router)();
launchesRouter.get("/", launches_controller_1.httpGetAllLaunches);
launchesRouter.post("/", launches_controller_1.httpAddNewLaunch);
launchesRouter.delete("/:id", launches_controller_1.httpAbortLaunch);
exports.default = launchesRouter;
