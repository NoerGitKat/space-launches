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
const csv_parse_1 = require("csv-parse");
const fs_1 = require("fs");
const path_1 = require("path");
const planet_schema_1 = __importDefault(require("./planet.schema"));
function isHabitablePlanet(planet) {
    return (planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6);
}
function loadPlanetsData() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            (0, fs_1.createReadStream)((0, path_1.join)(__dirname, "..", "data", "kepler_data.csv"))
                .pipe((0, csv_parse_1.parse)({
                comment: "#",
                columns: true,
            }))
                .on("data", function createNewPlanet(data) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (isHabitablePlanet(data)) {
                        yield savePlanet(data);
                    }
                });
            })
                .on("error", (err) => {
                console.log(err);
                reject();
            })
                .on("end", function finishLoad() {
                return __awaiter(this, void 0, void 0, function* () {
                    const allPlanets = yield getAllPlanets();
                    console.log(`${allPlanets.length} habitable planets found!`);
                    resolve();
                });
            });
        });
    });
}
function getAllPlanets() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allPlanets = yield planet_schema_1.default.find({});
            return allPlanets;
        }
        catch (err) {
            console.error(`Could not get planets ${err}`);
            return [];
        }
    });
}
function savePlanet(planet) {
    return __awaiter(this, void 0, void 0, function* () {
        const newData = {
            kepler_name: planet.kepler_name,
        };
        try {
            const updatedPlanet = yield planet_schema_1.default.updateOne(newData, newData, {
                upsert: true,
            });
            return updatedPlanet;
        }
        catch (err) {
            console.error(`Could not save planet ${err}`);
            return err;
        }
    });
}
exports.default = { loadPlanetsData, getAllPlanets };
