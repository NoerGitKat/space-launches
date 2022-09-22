import { createServer } from "http"
import app from "./app.js"

const PORT = process.env.PORT || 8000

const server = createServer(app)

server.listen(PORT, function listenToPort() {
  console.log(`Listening on port ${PORT}!`)
})
