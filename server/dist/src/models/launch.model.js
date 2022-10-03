"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const constants_1 = require("../../constants");
const launch_schema_1 = __importDefault(require("./launch.schema"));
const planet_schema_1 = __importDefault(require("./planet.schema"));
const latestFlightNumber = 100;
const launch = {
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
function populateLaunches() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Downloading launch data...");
        try {
            const request = {
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
            const response = yield axios_1.default.post(`${constants_1.SPACEX_API_URL}/query`, request);
            if (response.statusText !== "OK") {
                throw new Error("Could not reach API!");
            }
            const launchDocs = response.data.docs;
            for (const doc of launchDocs) {
                const payloads = doc.payloads;
                const customers = payloads.flatMap(function flattenCustomers(payload) {
                    return payload.customers;
                });
                const launch = {
                    flightNumber: doc.flight_number,
                    mission: doc.name,
                    rocket: doc.rocket.name,
                    launchDate: doc.date_local,
                    upcoming: doc.upcoming,
                    success: doc.success,
                    customers,
                };
                yield saveLaunch(launch);
            }
        }
        catch (err) {
            console.error(err);
        }
    });
}
function loadLaunchesData() {
    return __awaiter(this, void 0, void 0, function* () {
        const foundLaunch = yield findLaunchByFilter({
            flightNumber: 1,
            rocket: "Falcon 1",
            mission: "FalconSat",
        });
        if (foundLaunch) {
            console.log("Launch data already in DB!");
            return;
        }
        try {
            yield populateLaunches();
        }
        catch (err) {
            console.error(err);
        }
    });
}
function getAllLaunches(skippedPerPage, limitNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectionExpression = { _id: 0, __v: 0 };
        const allLaunches = yield launch_schema_1.default
            .find({}, projectionExpression)
            .skip(skippedPerPage)
            .limit(limitNumber);
        return allLaunches;
    });
}
function saveLaunch(launch) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield launch_schema_1.default.updateOne({
                flightNumber: launch.flightNumber,
            }, launch, { upsert: true });
        }
        catch (err) {
            console.error(err);
            return { ok: false };
        }
    });
}
function getLatestFlightNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const latestLaunch = yield launch_schema_1.default.findOne().sort("-flightNumber");
            if (!latestLaunch) {
                return latestFlightNumber;
            }
            return latestLaunch.flightNumber;
        }
        catch (err) {
            console.error(err);
        }
    });
}
function scheduleNewLaunch(launch) {
    return __awaiter(this, void 0, void 0, function* () {
        let newFlightNumber;
        try {
            const planet = yield planet_schema_1.default.findOne({
                kepler_name: launch.destination,
            });
            if (!planet) {
                throw new Error("No matching planet found!");
            }
            newFlightNumber = yield getLatestFlightNumber();
        }
        catch (err) {
            console.log(err);
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
            yield saveLaunch(newLaunch);
        }
        catch (err) {
            console.error(err);
            return { ok: false };
        }
        return newLaunch;
    });
}
function findLaunchByFilter(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield launch_schema_1.default.findOne(filter);
    });
}
function checkLaunchExists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const launch = yield findLaunchByFilter({ flightNumber: id });
        return launch;
    });
}
function abortLaunch(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield launch_schema_1.default.findOneAndUpdate({ flightNumber: id }, {
            success: false,
            upcoming: false,
        });
    });
}
exports.default = {
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunch,
    checkLaunchExists,
    loadLaunchesData,
};
