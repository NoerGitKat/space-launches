import { Request, Response } from "express";
import launchesModel from "../../models/launch.model";

export function httpGetAllLaunches(_req: Request, res: Response) {
    return res.status(200).json(launchesModel.getAllLaunches());
}
