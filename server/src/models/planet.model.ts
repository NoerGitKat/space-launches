import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { join } from "path";
import { IPlanet } from "../../interfaces";
import planetDB from "./planet.schema";

function isHabitablePlanet(planet: IPlanet) {
    return (
        planet["koi_disposition"] === "CONFIRMED" &&
        planet["koi_insol"] > 0.36 &&
        planet["koi_insol"] < 1.11 &&
        planet["koi_prad"] < 1.6
    );
}

function loadPlanetsData() {
    return new Promise<void>((resolve, reject) => {
        createReadStream(join(__dirname, "../../data", "kepler_data.csv"))
            .pipe(
                parse({
                    comment: "#",
                    columns: true,
                }),
            )
            .on("data", async function createNewPlanet(data: IPlanet) {
                if (isHabitablePlanet(data)) {
                    await savePlanet(data);
                }
            })
            .on("error", (err) => {
                console.log(err);
                reject();
            })
            .on("end", async function finishLoad() {
                const allPlanets = await getAllPlanets();
                console.log(`${allPlanets.length} habitable planets found!`);
                resolve();
            });
    });
}

async function getAllPlanets() {
    try {
        const allPlanets: IPlanet[] = await planetDB.find({});
        return allPlanets;
    } catch (err) {
        console.error(`Could not get planets ${err}`);
        return [];
    }
}

async function savePlanet(planet: IPlanet) {
    const newData = {
        kepler_name: planet.kepler_name,
    };
    try {
        const updatedPlanet = await planetDB.updateOne(newData, newData, {
            upsert: true,
        });
        return updatedPlanet;
    } catch (err) {
        console.error(`Could not save planet ${err}`);
        return err;
    }
}

export default { loadPlanetsData, getAllPlanets };
