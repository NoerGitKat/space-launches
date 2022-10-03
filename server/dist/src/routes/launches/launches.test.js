"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dotenv = __importStar(require("dotenv"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const planet_model_1 = __importDefault(require("../../models/planet.model"));
const mongo_1 = __importDefault(require("../../services/mongo"));
dotenv.config();
describe("Launch API", function launchTestAPI() {
    beforeAll(function setupAPI() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongo_1.default.disconnectDB();
            yield mongo_1.default.connectToDB();
            yield planet_model_1.default.loadPlanetsData();
        });
    });
    afterAll(function unmountAPI() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongo_1.default.disconnectDB();
        });
    });
    describe("GET all launches", function testAllLaunches() {
        test("It should return an array of launches", function returnAllLaunches() {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .get("/v1/launches")
                    .expect("Content-Type", /json/)
                    .expect(200);
            });
        });
    });
    describe("POST new launch", function testAllLaunches() {
        test("It should successfully create a new launch", function createNewLaunch() {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .post("/v1/launches")
                    .send({
                    mission: "Whats up",
                    rocket: "some raquet",
                    destination: "Kepler-452 b",
                    launchDate: "November 28, 2025",
                })
                    .expect("Content-Type", /json/)
                    .expect(201);
            });
        });
        test("It should catch missing required properties", function catchMissingProperties() {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.default)
                    .post("/v1/launches")
                    .send({
                    mission: "USS Enterprise",
                    rocket: "NCC 1701-D",
                    destination: "Kepler-452 b",
                    launchDate: new Date("December 27, 2030"),
                });
            });
        });
    });
});
