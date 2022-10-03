import * as dotenv from "dotenv";
import request from "supertest";
import app from "../../app";
import planets from "../../models/planet.model";
import mongo from "../../services/mongo";

dotenv.config();

describe("Launch API", function launchTestAPI() {
    beforeAll(async function setupAPI() {
        await mongo.connectToDB();
        await planets.loadPlanetsData();
    });

    afterAll(async function unmountAPI() {
        await mongo.disconnectDB();
    });

    describe("GET all launches", function testAllLaunches() {
        test("It should return an array of launches", async function returnAllLaunches() {
            const response = await request(app)
                .get("/v1/launches")
                .expect("Content-Type", /json/)
                .expect(200);
        });
    });

    describe("POST new launch", function testAllLaunches() {
        test("It should successfully create a new launch", async function createNewLaunch() {
            const response = await request(app)
                .post("/v1/launches")
                .send({
                    mission: "Whats up",
                    rocket: "some raquet",
                    destination: "Kepler-62 f",
                    launchDate: "November 28, 2025",
                })
                .expect("Content-Type", /json/)
                .expect(201);
        });

        test("It should catch missing required properties", async function catchMissingProperties() {
            const response = await request(app)
                .post("/v1/launches")
                .send({
                    mission: "USS Enterprise",
                    rocket: "NCC 1701-D",
                    destination: "Kepler-186 f",
                    launchDate: new Date("December 27, 2030"),
                });
        });
    });
});
