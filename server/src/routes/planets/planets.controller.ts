import { Request, Response } from "express";
import { join } from "path";
import planetsModel from "../../models/planets.model";

export function httpGetAllPlanets(req: Request, res: Response) {
    return res.status(200).json(planetsModel.getAllPlanets());
}

export function getIndexPage(_req: Request, res: Response) {
    return res
        .status(200)
        .sendFile(join(__dirname, "..", "..", "..", "public", "index.html"));
}
