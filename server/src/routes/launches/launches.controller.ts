import { Request, Response } from "express";
import { INewLaunchBody } from "../../../interfaces";
import launchesModel from "../../models/launch.model";

export function httpGetAllLaunches(_req: Request, res: Response) {
    return res.status(200).json(launchesModel.getAllLaunches());
}

export function httpAddNewLaunch(req: Request, res: Response) {
    const { mission, rocket, launchDate, destination }: INewLaunchBody =
        req.body;
    console.log("typeof date", typeof launchDate);
    if (!mission || !rocket || !launchDate || !destination) {
        return res.status(400).json({ error: "Fill out all the details!" });
    }

    if (typeof launchDate !== "string") {
        return res.status(400).json({ error: "Launch date is invalid!" });
    }
    const newLaunch = { mission, rocket, launchDate, destination };
    return res.status(201).json(launchesModel.addNewLaunch(newLaunch));
}
