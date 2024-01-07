import { Chat, Message } from "../entities/Chat";
import { v4 as uuidv4 } from "uuid";

export async function createResponseMessage(chatId: string, message: Message): Promise<Message | null> {
    try {
        return await Message.create({
            messageId: uuidv4(),
            fromUser: false,
            isReplyTo: message.id,
            chat: await Chat.findOne({ where: { chatId } }),
            type: "default",
            content: "Response: " + message.content,
        }).save();
    } catch (error) {
        console.log(error);
        
        return null;
    }
}