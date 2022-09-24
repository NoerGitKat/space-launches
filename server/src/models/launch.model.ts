import { ILaunch } from "../../interfaces";

const launches: Map<number, ILaunch> = new Map();

let latestFlightNumber = 100;

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

launches.set(latestFlightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch: ILaunch) {
    latestFlightNumber++;
    launches.set(
        latestFlightNumber,
        Object.assign(launch, {
            success: true,
            upcoming: true,
            customers: ["Noer", "Mapi"],
            flightNumber: latestFlightNumber,
        }),
    );
}

function checkLaunchExists(id: number) {
    return launches.has(id);
}

function abortLaunchById(id: number) {
    const abortedLaunch = launches.get(id);
    if (abortedLaunch) {
        abortedLaunch.upcoming = false;
        abortedLaunch.success = false;
        return abortedLaunch;
    }
}

export default {
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
    checkLaunchExists,
};
