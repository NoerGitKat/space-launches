import { connect, disconnect } from "mongoose";

async function connectToDB() {
    await connect(process.env.MONGO_URI || "");
}

async function disconnectDB() {
    await disconnect();
}

export default { connectToDB, disconnectDB };
