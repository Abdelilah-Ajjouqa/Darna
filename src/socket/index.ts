import { Server } from "socket.io";
import { messageHandler } from "./handlers/message.handler";


export const setupSocketHandlers = (io: Server) => {
    io.on('connection', (socket)=>{
        console.log(`New connection with ${socket.id}`);

        messageHandler(io, socket);

        socket.on('diconnect', ()=>{
            console.log(`User ${socket.id} disconnect`);
        })
    })
}