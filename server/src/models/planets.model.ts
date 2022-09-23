import { parse } from "csv-parse";
import { createReadStream } from "fs";
import { join } from "path";
import { IPlanet } from "../../interfaces";

const planets: IPlanet[] = [];

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
            .on("data", (data) => {
                if (isHabitablePlanet(data)) {
                    planets.push(data);
                }
            })
            .on("error", (err) => {
                console.log(err);
                reject();
            })
            .on("end", () => {
                console.log(`${planets.length} habitable planets found!`);
                resolve();
            });
    });
}

export default { planets, loadPlanetsData };
