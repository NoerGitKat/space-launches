import { model, Schema } from "mongoose";
import { IPlanet } from "../../interfaces";

const planetSchema: Schema<IPlanet> = new Schema({
    kepler_name: {
        type: String,
        required: true,
    },
});

const planetDB = model("Planet", planetSchema);

export default planetDB;
