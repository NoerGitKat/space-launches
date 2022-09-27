import { model, Schema } from "mongoose";
import { IPlanet } from "../../interfaces";

const planetSchema: Schema<IPlanet> = new Schema({
    kepler_name: {
        type: String,
        required: true,
    },
});

const planetModel = model("Planet", planetSchema);

export default planetModel;
