"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const launchSchema = new mongoose_1.Schema({
    flightNumber: {
        type: Number,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    rocket: {
        type: String,
        required: true,
    },
    launchDate: {
        type: Date,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    customers: [String],
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
    },
});
const launchDB = (0, mongoose_1.model)("Launch", launchSchema);
exports.default = launchDB;
