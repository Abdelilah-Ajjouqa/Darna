require("dotenv").config({ path: __dirname + "/../.env" });
import { Server, Socket } from "socket.io";
import http from 'http';
import express from "express";
import { connectionDB } from "./config/db_config";
import RealEstateRoutes from "./routes/realEstate.routes"
import chatSocket from "./socket/chat.socket";

connectionDB();

const app = express();
const port = process.env.PORT;
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});



app.use(express.json());

app.use('/api/realEstate', RealEstateRoutes)

io.on('connection', (socket) => {
  try {
    console.log(`User connected: ${socket.id}`);
    socket.on('diconnect', () => {
      try {
        console.log(`User disconnected: ${socket.id}`);
      } catch (error: any) {
        console.error(`Error during disconnect: ${error}`);
      }
    })
  } catch (error: any) {
    console.log(`Connection error: ${error}`)
    socket.disconnect();
  }
})

app.listen(port, () => {
  console.log(`running Server on http://localhost:${port}`);
});
const context: Record<string, Socket> = {};