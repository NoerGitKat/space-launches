import request from "supertest";
import app from "../../app";

describe("GET all launches", function testAllLaunches() {
    test("It should return an array of launches", async function returnAllLaunches() {
        const response = await request(app)
            .get("/launches")
            .expect("Content-Type", /json/)
            .expect(200);
    });
});

describe("POST new launch", function testAllLaunches() {
    test("It should successfully create a new launch", async function createNewLaunch() {
        const response = await request(app)
            .post("/launches")
            .send({
                mission: "USS Enterprise",
                rocket: "NCC 1701-D",
                destination: "Kepler-186 f",
                launchDate: new Date("December 27, 2030"),
            })
            .expect("Content-Type", /json/)
            .expect(201);
    });

    test("It should catch missing required properties", function catchMissingProperties() {
        const response = await request(app)
            .post("/launches")
            .send({
                mission: "USS Enterprise",
                rocket: "NCC 1701-D",
                destination: "Kepler-186 f",
                launchDate: new Date("December 27, 2030"),
            });
    });
});
