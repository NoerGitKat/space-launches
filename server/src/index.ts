import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import app from "./app";
import planetsModel from "./models/planets.model";

const PORT: string = process.env.PORT || "8000";

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
    createServer(app);

async function startServer() {
    try {
        await planetsModel.loadPlanetsData();
        server.listen(PORT, function listenToPort() {
            console.log(`Listening on port ${PORT}!`);
        });
    } catch (error) {
        console.log("Error!", error);
    }
}

startServer();
