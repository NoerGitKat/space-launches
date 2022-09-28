import { ILaunch } from "../../interfaces";
import launchDB from "./launch.schema";
import planetDB from "./planet.schema";

const latestFlightNumber = 100;

const launch: ILaunch = {
    flightNumber: 100,
    mission: "Kepler Exploration",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    destination: "Kepler-442 b",
    customer: ["Noer", "Mapi"],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

async function getAllLaunches() {
    const projectionExpression = { _id: 0, __v: 0 };
    const allLaunches = await launchDB.find({}, projectionExpression);
    return allLaunches;
}

async function saveLaunch(launch: ILaunch) {
    const planet = await planetDB.findOne({
        kepler_name: launch.destination,
    });

    if (!planet) {
        throw new Error("No matching planet found!");
    }

    try {
        await launchDB.updateOne(
            {
                flightNumber: launch.flightNumber,
            },
            launch,
            { upsert: true },
        );
    } catch (err) {
        console.error(err);
        return { ok: false };
    }
}

async function getLatestFlightNumber() {
    try {
        const latestLaunch = await launchDB.findOne().sort("-flightNumber");

        if (!latestLaunch) {
            return latestFlightNumber;
        }
        return latestLaunch.flightNumber;
    } catch (err) {
        console.error(err);
    }
}

async function scheduleNewLaunch(
    launch: ILaunch,
): Promise<ILaunch | { ok: boolean }> {
    let newFlightNumber;
    try {
        newFlightNumber = await getLatestFlightNumber();
    } catch (err) {
        console.error(err);
        return { ok: false };
    }

    if (!newFlightNumber) {
        newFlightNumber = latestFlightNumber;
    }
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ["Noer", "Mapi"],
        flightNumber: ++newFlightNumber,
    });

    try {
        await saveLaunch(newLaunch);
    } catch (err) {
        console.error(err);
        return { ok: false };
    }

    return newLaunch;
}

async function checkLaunchExists(id: number) {
    const launch = await launchDB.exists({ flightNumber: id });

    return launch;
}

async function abortLaunch(id: number) {
    await launchDB.findOneAndUpdate(
        { flightNumber: id },
        {
            success: false,
            upcoming: false,
        },
    );
}

export default {
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunch,
    checkLaunchExists,
};
