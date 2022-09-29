import { Request, Response } from "express";
import { ILaunch, INewLaunchBody } from "../../../interfaces";
import launches from "../../models/launch.model";
import query from "../../services/query";

interface IQueryString {
    page: string | number;
    limit: string | number;
}

export async function httpGetAllLaunches(
    req: Request<null, null, null, IQueryString>,
    res: Response,
) {
    const { page, limit } = req.query;
    let allLaunches: ILaunch[] = [];
    console.log("page and limit", page, limit);

    const { skippedPerPage, limitNumber } = query.getPagination({
        page,
        limit,
    });

    console.log("skipp", skippedPerPage);
    console.log("limit", limitNumber);

    allLaunches = await launches.getAllLaunches(skippedPerPage, limitNumber);

    return res.status(200).json(allLaunches);
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
