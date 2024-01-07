import { Chat, Event, Message } from "../entities/Chat";
import { Arg, Ctx, Field, Int, Mutation, ObjectType, PubSub, PubSubEngine, Query, Resolver, Root, Subscription, UseMiddleware, createUnionType } from "type-graphql";
import { FieldError } from "./common";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import { v4 as uuidv4 } from "uuid";
import { User } from "../entities/User";
import { createResponseMessage } from "../helpers/createResponseMessage";

@ObjectType()
export class ChatResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Chat, { nullable: true })
    chat?: Chat;

    @Field(() => String, { nullable: true })
    status?: string;
}

const MessageOrEvent = createUnionType({
    name: "MessageOrEvent",
    description: "Message or Event type",
    types: () => [Message, Event] as const,
    resolveType: (value) => {
        if (value && ("content" in value)) {
            return Message;
        }
        if (value && ("eventType" in value)) {
            return Event;
        }

        return null;
    },
});

@Resolver(Chat)
export class ChatResolver {
    @Query(() => [Chat])
    @UseMiddleware(isAuth)
    async chats(
        @Ctx() { payload }: MyContext
    ): Promise<Chat[]> {
        const chats = await Chat.find({ relations: ["creator", "messages", "events"], order: { updatedAt: "DESC" } });
        
        if (!payload) {
            return [];
        }

        return chats.filter((chat) => chat.creatorId === payload.id);
    }

    @Query(() => Chat, { nullable: true })
    @UseMiddleware(isAuth)
    async findChat(
        @Arg("chatId", { nullable: true }) chatId: string,
        @Ctx() { payload }: MyContext
    ) {
        if (!payload) {
            return null;
        } else {
            const chat = await Chat.findOne({ where: { chatId }, relations: ["creator", "messages", "events"] });
            
            if (!chat) {
                return null;
            } else {
                if (chat.creatorId === payload.id) {
                    return chat;
                } else {
                    return null;
                }
            }
        }
    }

    @Query(() => MessageOrEvent, { nullable: true })
    @UseMiddleware(isAuth)
    async latestMessageOrEvent(
        @Arg("chatId", { nullable: true }) chatId: string,
        @Ctx() { payload }: MyContext
    ) {
        const chat = await Chat.findOne({ where: { chatId }, relations: ["creator", "messages", "events"] });
        let result = null;

        if (!chat || !payload) {
            result = null;
        } else {
            if (chat.creatorId === payload.id) {
                const results = [...chat.events, ...chat.messages];
                results.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
            
                result = results[results.length - 1];
            } else {
                result = null;
            }
        }

        return result;
    }

    @Mutation(() => ChatResponse, { nullable: true })
    @UseMiddleware(isAuth)
    async createChat(
        @Arg("type") type: string,
        @Arg("content") content: string,
        @Ctx() { payload }: MyContext
    ): Promise<ChatResponse> {
        let status = "";
        let chat: Chat | undefined = undefined;
    
        if (!payload) {
            status = "You're not authenticated.";
        } else if (/^\s+\S*/.test(content) || content === "") {
            status = "You can't send an empty message";
        } else {
            const date = new Date().toLocaleString(
                "en-us",
                {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }
            );

            try {
                const newChat = await Chat.create({
                    chatId: uuidv4(),
                    creatorId: payload.id,
                    creator: await User.findOne({ where: { id: payload.id } }),
                    title: `Chat ${date}`,
                }).save();
            
                const message = await Message.create({
                    messageId: uuidv4(),
                    fromUser: true,
                    chat: newChat,
                    type,
                    content,
                }).save();

                chat = await Chat.findOne({ where: { chatId: newChat.chatId, creatorId: payload.id }, relations: ["creator", "messages", "events"] });

                if (chat) {
                    chat.messages.push(message);
                    chat.messagesCount++;
    
                    await chat.save();

                    const response = await Message.create({
                        messageId: uuidv4(),
                        fromUser: false,
                        isReplyTo: message.id,
                        chat: newChat,
                        type: "default",
                        content: "Response: " + message.content,
                    }).save();

                    if (response) {
                        chat.messages.push(response);
                        chat.messagesCount++;

                        await chat.save();
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }

        return {
            status,
            chat,
        };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteChat(
        @Arg("chatId") chatId: string,
        @Ctx() { payload }: MyContext
    ) {
        if (!payload) {
            return false;
        }
        
        const chat = await Chat.findOne({ where: { chatId, creatorId: payload.id } });

        if (!chat) {
            return false;
        } else {
            await Message.delete({ chat });
            await Event.delete({ chat });
            await Chat.delete({ chatId, creatorId: payload.id });
        
            return true;
        }
    }

    @Mutation(() => ChatResponse)
    @UseMiddleware(isAuth)
    async editChatInfo(
        @Arg("chatId") chatId: string,
        @Arg("title") title: string,
        @Ctx() { payload }: MyContext,
        @PubSub() pubSub: PubSubEngine,
    ): Promise<ChatResponse> {
        let status = "";
        const chat = await Chat.findOne({ where: { chatId }, relations: ["creator", "messages", "events"] });
        const user = await User.findOne({ where: { id: payload?.id } });

        if (!chat || !user) {
            status = "You are not authenticated.";
        } else {
            chat.title = title;

            await chat.save();

            const event = await Event.create({
                eventType: "chat",
                fromUser: true,
                eventMessage: `${user.firstName} ${user.lastName} renamed the chat.`,
                chat: await Chat.findOne({ where: { chatId } }),
            }).save();

            await pubSub.publish("NEW_MESSAGE_OR_EVENT", event);

            status = "Chat renamed!";
        }

        return {
            status,
            chat,
        };
    }
}

@Resolver(Message)
export class MessageResolver {
    @Subscription(() => MessageOrEvent, {
        topics: "NEW_MESSAGE_OR_EVENT",
        filter: async ({ payload, args }) => {
            const chat = await Chat.findOne({ where: { chatId: args.chatId } });
            
            if (chat) {
                if (chat.creatorId === args.userId) {
                    return payload.chat.chatId === args.chatId;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
    })
    newMessageOrEvent(@Arg("chatId", { nullable: true }) _chatId: string, @Arg("userId", () => Int, { nullable: true }) _userId: number, @Root() messageOrEvent: typeof MessageOrEvent): typeof MessageOrEvent {
        return messageOrEvent;
    }

    @Mutation(() => Message, { nullable: true })
    @UseMiddleware(isAuth)
    async sendMessage(
        @Arg("type") type: string,
        @Arg("content") content: string,
        @Arg("chatId") chatId: string,
        @Ctx() { payload }: MyContext,
        @PubSub() pubSub: PubSubEngine,
    ) {
        const chat = await Chat.findOne({ where: { chatId, creatorId: payload?.id }, relations: ["creator", "messages", "events"] });
        
        if (!payload || /^\s+\S*/.test(content) || content === "" || !chat) {
            return null;
        } else {
            try {
                const message = await Message.create({
                    messageId: uuidv4(),
                    fromUser: true,
                    chat: await Chat.findOne({ where: { chatId } }),
                    type,
                    content,
                }).save();
    
                chat.messages.push(message);
                chat.messagesCount++;
                
                await chat.save();
                
                await pubSub.publish("NEW_MESSAGE_OR_EVENT", message);

                const response = await createResponseMessage(chatId, message);

                if (response) {
                    chat.messages.push(response);
                    chat.messagesCount++;
            
                    await chat.save();
            
                    await pubSub.publish("NEW_MESSAGE_OR_EVENT", response);
                }

                return message;
            } catch (error) {
                console.log(error);

                return null;
            }
        }
    }

    @Query(() => [MessageOrEvent])
    @UseMiddleware(isAuth)
    async messagesAndEvents(
        @Arg("chatId", { nullable: true }) chatId: string,
        @Ctx() { payload }: MyContext
    ) {
        const chat = await Chat.findOne({ where: { chatId, creatorId: payload?.id }, relations: ["creator", "messages", "events"] });

        if (chat) {
            const results = [...chat.events, ...chat.messages];
            results.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

            return results;
        } else {
            return [];
        }
    }
}