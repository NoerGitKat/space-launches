"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const launches_router_1 = __importDefault(require("./launches/launches.router"));
const planets_router_1 = __importDefault(require("./planets/planets.router"));
const v1 = (0, express_1.Router)();
v1.use("/planets", planets_router_1.default);
v1.use("/launches", launches_router_1.default);
exports.default = v1;
