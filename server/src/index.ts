import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import app from "./app";

const PORT: string = process.env.PORT || "8000";

const server: Server<typeof IncomingMessage, typeof ServerResponse> =
    createServer(app);

server.listen(PORT, function listenToPort() {
    console.log(`Listening on port ${PORT}!`);
});
