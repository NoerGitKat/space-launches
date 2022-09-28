import * as dotenv from "dotenv";
import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import app from "./app";
import planetDB from "./models/planet.model";
import mongo from "./services/mongo";

dotenv.config();

const PORT: string = process.env.PORT || "8000";

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
    createServer(app);

async function startServer() {
    try {
        await mongo.connectToDB();
        await planetDB.loadPlanetsData();
        server.listen(PORT, function listenToPort() {
            console.log(`Listening on port ${PORT}!`);
        });
    } catch (error) {
        console.log("Error!", error);
    }
}

startServer();
