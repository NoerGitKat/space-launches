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
exports.httpAbortLaunch = exports.httpAddNewLaunch = exports.httpGetAllLaunches = void 0;
const launch_model_1 = __importDefault(require("../../models/launch.model"));
const query_1 = __importDefault(require("../../services/query"));
function httpGetAllLaunches(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { page, limit } = req.query;
        let allLaunches = [];
        console.log("page and limit", page, limit);
        const { skippedPerPage, limitNumber } = query_1.default.getPagination({
            page,
            limit,
        });
        console.log("skipp", skippedPerPage);
        console.log("limit", limitNumber);
        allLaunches = yield launch_model_1.default.getAllLaunches(skippedPerPage, limitNumber);
        return res.status(200).json(allLaunches);
    });
}
exports.httpGetAllLaunches = httpGetAllLaunches;
function httpAddNewLaunch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { mission, rocket, launchDate, destination } = req.body;
        if (!mission || !rocket || !launchDate || !destination) {
            return res.status(400).json({ error: "Fill out all the details!" });
        }
        if (typeof launchDate !== "string") {
            return res.status(400).json({ error: "Launch date is invalid!" });
        }
        const newLaunch = { mission, rocket, launchDate, destination };
        try {
            const response = yield launch_model_1.default.scheduleNewLaunch(newLaunch);
            return res.status(201).json(response);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    });
}
exports.httpAddNewLaunch = httpAddNewLaunch;
function httpAbortLaunch(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(req.params.id);
        const launch = yield launch_model_1.default.checkLaunchExists(id);
        if (!launch) {
            return res.status(404).json({ error: "Launch not found!" });
        }
        return res.status(204).json(launch_model_1.default.abortLaunch(id));
    });
}
exports.httpAbortLaunch = httpAbortLaunch;
