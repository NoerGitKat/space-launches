import { model, Schema } from "mongoose";
import { ILaunch } from "../../interfaces";

const launchSchema: Schema<ILaunch> = new Schema({
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
    customer: [String],
    upcoming: {
        type: Boolean,
        required: true,
    },
    success: {
        type: Boolean,
        required: true,
    },
});

const launchDB = model("Launch", launchSchema);

export default launchDB;