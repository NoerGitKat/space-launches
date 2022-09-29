import axios from "axios";
import { SPACEX_API_URL } from "../../constants";
import { ILaunch, ILaunchFilter, ISpaceXLaunchRequest } from "../../interfaces";
import launchDB from "./launch.schema";
import planetDB from "./planet.schema";

const latestFlightNumber = 100;

const launch: ILaunch = {
    flightNumber: 100,
    mission: "Kepler Exploration",
    rocket: "Explorer IS1",
    launchDate: new Date("December 27, 2030"),
    destination: "Kepler-442 b",
    customers: ["Noer", "Mapi"],
    upcoming: true,
    success: true,
};

saveLaunch(launch);

async function populateLaunches() {
    console.log("Downloading launch data...");
    try {
        const request: ISpaceXLaunchRequest = {
            query: {},
            options: {
                pagination: false,
                populate: [
                    {
                        path: "rocket",
                        select: {
                            name: 1,
                        },
                    },
                    {
                        path: "payloads",
                        select: {
                            customers: 1,
                        },
                    },
                ],
            },
        };
        const response = await axios.post(`${SPACEX_API_URL}/query`, request);

        if (response.statusText !== "OK") {
            throw new Error("Could not reach API!");
        }

        const launchDocs = response.data.docs;
        for (const doc of launchDocs) {
            const payloads = doc.payloads;
            const customers = payloads.flatMap(
                function flattenCustomers(payload: { customers: any }) {
                    return payload.customers;
                },
            );
            const launch: ILaunch = {
                flightNumber: doc.flight_number,
                mission: doc.name,
                rocket: doc.rocket.name,
                launchDate: doc.date_local,
                upcoming: doc.upcoming,
                success: doc.success,
                customers,
            };

            await saveLaunch(launch);
        }
    } catch (err) {
        console.error(err);
    }
}

async function loadLaunchesData() {
    const foundLaunch = await findLaunchByFilter({
        flightNumber: 1,
        rocket: "Falcon 1",
        mission: "FalconSat",
    });

    if (foundLaunch) {
        console.log("Launch data already in DB!");
        return;
    }

    try {
        await populateLaunches();
    } catch (err) {
        console.error(err);
    }
}

async function getAllLaunches(skippedPerPage: number, limitNumber: number) {
    const projectionExpression = { _id: 0, __v: 0 };
    const allLaunches = await launchDB
        .find({}, projectionExpression)
        .skip(skippedPerPage)
        .limit(limitNumber);
    return allLaunches;
}

async function saveLaunch(launch: ILaunch) {
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
        const planet = await planetDB.findOne({
            kepler_name: launch.destination,
        });

        if (!planet) {
            throw new Error("No matching planet found!");
        }

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

async function findLaunchByFilter(filter: ILaunchFilter) {
    return await launchDB.findOne(filter);
}

async function checkLaunchExists(id: number) {
    const launch = await findLaunchByFilter({ flightNumber: id });

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
    loadLaunchesData,
};
