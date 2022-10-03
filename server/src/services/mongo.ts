import { connect, disconnect } from "mongoose";

async function connectToDB() {
    try {
        return await connect(process.env.MONGO_URI || "");
    } catch (error) {
        console.log(error);
        return;
    }
}

async function disconnectDB() {
    try {
        return await disconnect();
    } catch (error) {
        console.log(error);
        return;
    }
}

export default { connectToDB, disconnectDB };
