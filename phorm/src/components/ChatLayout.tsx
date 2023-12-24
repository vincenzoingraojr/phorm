import { FunctionComponent, useEffect, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, TextInput, View, Text, ActivityIndicator } from "react-native";
import { greyColorProp, textColorProp, theme } from "../constants/theme";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../constants/global";
import Logo from "./icons/Logo";
import { ChatsDocument, ChatsQuery, MessageOrEvent, useChatsQuery, useCreateChatMutation, useMeQuery, useMessagesAndEventsQuery, useNewMessageOrEventSubscription, useSendMessageMutation } from "../generated/graphql";
import Toast from "react-native-root-toast";
import { toastProps } from "../constants/toast";
import Message from "./ui/Message";
import { RenderSeparator } from "./ui/RenderSeparator";
import ModalComponent from "./ui/Modal";
import HeaderButton from "./ui/HeaderButton";

interface ChatLayoutProps {
    isNewChat: boolean;
    chatId?: string;
    navigation?: any;
}

const ChatLayout: FunctionComponent<ChatLayoutProps> = ({ isNewChat, chatId, navigation }) => {
    const styles = theme();
    const [inputText, setInputText] = useState("");
    const greyColor = greyColorProp();
    const textColor = textColorProp();
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        if (/^\s+\S*/.test(inputText) || inputText === "") {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }, [inputText]);

    const [createChat] = useCreateChatMutation();
    const [sendMessage] = useSendMessageMutation();
    const { data } = useChatsQuery({ fetchPolicy: "cache-and-network" });
    const { data: meData } = useMeQuery({ fetchPolicy: "cache-and-network" });
    const { data: chatData, loading, error } = useMessagesAndEventsQuery({ variables: { chatId }, fetchPolicy: "cache-and-network" });

    const { data: newMessageData } = useNewMessageOrEventSubscription({ variables: { chatId, userId: meData?.me?.id } });

    const [items, setItems] = useState(chatData?.messagesAndEvents || []);

    const flatListRef = useRef<FlatList<MessageOrEvent> | null>(null);

    const handleButtonEvent = async () => {
        if (isNewChat) {
            const response = await createChat({
                variables: {
                    content: inputText,
                    type: "default",
                },
                update: (store, { data: newChatData }) => {
                    if (newChatData && newChatData.createChat && newChatData.createChat.chat && data && data.chats) {
                        store.writeQuery<ChatsQuery>({
                            query: ChatsDocument,
                            data: {
                                chats: [newChatData.createChat.chat, ...(data.chats || [])],
                            },
                        });
                    }
                },
            });

            if (response.data && response.data.createChat && response.data.createChat.status && response.data.createChat.status !== "") {
                Toast.show(response.data.createChat.status as string, toastProps);
            }

            if (response.data && response.data.createChat && response.data.createChat.chat) {
                setInputText("");
                navigation.navigate("Chat", { chatId: response.data.createChat.chat.chatId });
            }
        } else if (chatId) {
            const messageResponse = await sendMessage({
                variables: {
                    chatId,
                    content: inputText,
                    type: "default",
                },
                update: (store, { data: newMessageData }) => {
                    if (newMessageData && newMessageData.sendMessage && data && data.chats) {
                        store.writeQuery<ChatsQuery>({
                            query: ChatsDocument,
                            data: {
                                chats: data.chats || [],
                            },
                        });
                    }
                },
            });

            if (messageResponse.data && messageResponse.data.sendMessage) {
                setInputText("");
            }
        }
    };

    useEffect(() => {
        if (!isNewChat && chatData && chatData.messagesAndEvents) {
            setItems(chatData.messagesAndEvents);
        }

        if (flatListRef && flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [isNewChat, chatData]);

    useEffect(() => {
        if (!isNewChat && newMessageData && newMessageData.newMessageOrEvent) {
            setItems((previousData) => [
                ...previousData,
                newMessageData.newMessageOrEvent,
            ]);
        }

        if (flatListRef && flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [isNewChat, newMessageData]);

    const [isVisible, setIsVisible] = useState(false);
    const onClose = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        if (!isNewChat) {
            navigation.setOptions({
                title: "Phorm",
                headerRight: () => (
                    <HeaderButton
                        onPress={() => setIsVisible(true)}
                    >
                        <Ionicons name="ellipsis-vertical-sharp" size={24} color={textColor} />
                    </HeaderButton>
                )
            });
        }
    }, [navigation, isNewChat]);

    return (
        <View style={[styles.container, chatStyles.chatPage]}>
            {isNewChat ? (
                <View style={chatStyles.main}>
                    <View style={globalStyles.appLogo}>
                        <Logo type="new-chat-logo" />
                    </View>
                </View>
            ) : (
                <>
                    {(loading || error) ? (
                        <View style={chatStyles.loading}>
                            <ActivityIndicator size="large" color={COLORS.orange} />
                        </View>
                    ) : (
                        <FlatList 
                            data={items as MessageOrEvent[]}
                            ref={flatListRef}
                            renderItem={({ item }) => (
                                <>
                                    {item.__typename === "Message" ? (
                                        <Message message={item} />
                                    ) : (item.__typename === "Event" && (
                                        <Text style={styles.text}>{item.eventMessage}</Text>
                                    ))}
                                </>
                            )}
                            keyExtractor={(item, i) => 
                                item.__typename === "Message" 
                                    ? item.messageId 
                                    : item.__typename === "Event" 
                                    ? item.id.toString() 
                                    : i.toString()
                            }
                            style={[chatStyles.main, chatStyles.feed]}
                            ItemSeparatorComponent={() => <RenderSeparator height={20} />}
                        />
                    )}
                    <ModalComponent isVisible={isVisible} onClose={onClose} children={
                        <Text>
                            Test
                        </Text>
                    } />
                </>
            )}
            <View style={chatStyles.compose}>
                <View style={[chatStyles.textInputContainer, { backgroundColor: greyColor }]}>
                    <TextInput
                        style={[chatStyles.textInput, styles.input]}
                        value={inputText}
                        onChangeText={(text) => setInputText(text)}
                        placeholder="Type your message..."
                        autoCapitalize="sentences"
                        keyboardType={"default"}
                        placeholderTextColor={textColor}
                        cursorColor={textColor}
                        selectionColor={COLORS.orange}
                        underlineColorAndroid="transparent"
                        multiline
                    />
                </View>
                <View style={chatStyles.sendButton}>
                    <Pressable
                        style={({ pressed }) => [
                            chatStyles.button,
                            (pressed || isEmpty) && chatStyles.disabledOrPressed,
                        ]}
                        disabled={isEmpty}
                        onPress={handleButtonEvent}
                    >
                        <Ionicons name="send-outline" size={24} color={COLORS.white} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const chatStyles = StyleSheet.create({
    chatPage: {
        flex: 1,
        flexDirection: "column",
    },
    main: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
    },
    feed: {
        flexDirection: "column",
        gap: 18,
    },
    compose: {
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
    },
    textInputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        maxHeight: 180,
        borderRadius: 16,
    },
    textInput: {
        flex: 1,
    },
    sendButton: {
        flex: 0,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        backgroundColor: COLORS.orange,
        borderRadius: 24,
    },
    disabledOrPressed: {
        opacity: 0.7,
    },
    loading: {
        flex: 1,
        padding: 16,
    }
});

export default ChatLayout;