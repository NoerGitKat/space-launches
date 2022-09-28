import { Request, Response } from "express";
import { join } from "path";
import planets from "../../models/planet.model";

export async function httpGetAllPlanets(req: Request, res: Response) {
    return res.status(200).json(await planets.getAllPlanets());
}

export function getIndexPage(_req: Request, res: Response) {
    return res
        .status(200)
        .sendFile(join(__dirname, "..", "..", "..", "public", "index.html"));
}
