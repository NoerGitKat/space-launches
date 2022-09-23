import { Router } from "express";
import { getAllPlanets } from "./planets.controller";

const planetsRouter = Router();

planetsRouter.get("/", getAllPlanets);

export default planetsRouter;
