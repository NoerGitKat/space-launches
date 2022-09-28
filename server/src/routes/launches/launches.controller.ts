import { Request, Response } from "express";
import { INewLaunchBody } from "../../../interfaces";
import launches from "../../models/launch.model";

export async function httpGetAllLaunches(_req: Request, res: Response) {
    return res.status(200).json(await launches.getAllLaunches());
}

export async function httpAddNewLaunch(req: Request, res: Response) {
    const { mission, rocket, launchDate, destination }: INewLaunchBody =
        req.body;

    if (!mission || !rocket || !launchDate || !destination) {
        return res.status(400).json({ error: "Fill out all the details!" });
    }

    if (typeof launchDate !== "string") {
        return res.status(400).json({ error: "Launch date is invalid!" });
    }
    const newLaunch = { mission, rocket, launchDate, destination };
    try {
        const response = await launches.scheduleNewLaunch(newLaunch);

        return res.status(201).json(response);
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
}

export async function httpAbortLaunch(req: Request, res: Response) {
    const id = Number(req.params.id);

    const launch = await launches.checkLaunchExists(id);

    if (!launch) {
        return res.status(404).json({ error: "Launch not found!" });
    }

    return res.status(204).json(launches.abortLaunch(id));
}
