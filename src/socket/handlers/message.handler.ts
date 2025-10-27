import { Message, Notification } from "../../types/types";
import { Server, Socket } from "socket.io";

export const messageHandler = (io: Server, socket: Socket) => {
    // join a room
    socket.on('join-room', (roomId: string) => {
        socket.join(roomId);
        console.log(`The user ${socket.id} join room ${roomId}`);
    })

    // send message
    socket.on('send-message', (roomId: string, message: Message ) => {
        io.to(roomId).emit("message-sent", message);
        console.log(`new message from ${message.userId}, message: ${message.text}`)

        const notification: Notification = {
            id: Date.now().toString(),
            message: `you have new message from ${message.userId}`,
            userId: message.userId,
            timestamp: new Date()
        }
        socket.to(roomId).emit("new-message-notification", notification)
    })

    socket.on('leave-room', (roomId: string)=>{
        socket.leave(roomId);
        console.log(`the user ${socket.id} leave the room ${roomId}`);
    })
}