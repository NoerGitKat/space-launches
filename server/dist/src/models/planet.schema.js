"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const planetSchema = new mongoose_1.Schema({
    kepler_name: {
        type: String,
        required: true,
    },
});
const planetDB = (0, mongoose_1.model)("Planet", planetSchema);
exports.default = planetDB;
