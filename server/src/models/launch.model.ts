import { ILaunch } from "../../interfaces";

const launches: Map<number, ILaunch> = new Map();

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

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
    return Array.from(launches.values());
}

export default { getAllLaunches };
