import Message from "../models/message";

class MessageService {
    static async sendMessage(senderId: string, receiverId: string, content: string) {
        try {
            const newMessage = new Message({ senderId, receiverId, content });
            await newMessage.save();
        } catch (error: any) {
            throw new Error(`error: cannot saving message: ${error}`);
        }
    }

    static async getRoom(userId1: string, userId2: string) {
        try {
            return Message.find({
                $or: [
                    { senderId: userId1, receiverId: userId2 },
                    { senderId: userId2, receiverId: userId1 }
                ]
            }).sort({ createdAt: 1 });
        } catch (error: any) {
            throw new Error(`error: failed to get room, ${error}`);
        }
    }
}

export default MessageService;