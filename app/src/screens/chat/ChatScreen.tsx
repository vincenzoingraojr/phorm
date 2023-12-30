import { Layout } from "../../components/Layout";
import { ActivityIndicator, ColorSchemeName, FlatList, Pressable, TextInput, View, useColorScheme } from "react-native";
import { chatStyles } from "../../constants/chatStyles";
import { greyColorProp, textColorProp, theme } from "../../constants/theme";
import { COLORS } from "../../constants/colors";
import { ChatsDocument, ChatsQuery, MessageOrEvent, useChatsQuery, useDeleteChatMutation, useMeQuery, useMessagesAndEventsQuery, useNewMessageOrEventSubscription, useSendMessageMutation } from "../../generated/graphql";
import Message from "../../components/ui/Message";
import { useEffect, useRef, useState } from "react";
import { RenderSeparator } from "../../components/ui/RenderSeparator";
import { Ionicons } from "@expo/vector-icons";
import HeaderButton from "../../components/ui/HeaderButton";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Event from "../../components/ui/Event";

type RootStackParamList = {
    Chat: { chatId: string };
    EditChatInfo: { chatId: string };
    NewChat: undefined;
};

type ChatRouteProp = RouteProp<RootStackParamList, "Chat">;

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

const ChatScreen = () => {
    const route = useRoute<ChatRouteProp>();
    const navigation = useNavigation<Props["navigation"]>();
    const { chatId } = route.params;

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

    const [sendMessage] = useSendMessageMutation();
    const [deleteChat] = useDeleteChatMutation();
    const { data: meData } = useMeQuery({ fetchPolicy: "cache-and-network" });
    const { data: chatData, loading, error } = useMessagesAndEventsQuery({ variables: { chatId }, fetchPolicy: "cache-and-network" });

    const { data: newMessageData } = useNewMessageOrEventSubscription({ variables: { chatId, userId: meData?.me?.id } });

    const [items, setItems] = useState(chatData?.messagesAndEvents || []);

    const flatListRef = useRef<FlatList<MessageOrEvent> | null>(null);

    const { data } = useChatsQuery({ fetchPolicy: "cache-and-network" });

    useEffect(() => {
        if (!loading && !chatData) {
            navigation.navigate("NewChat");
        }
    }, [navigation, loading, chatData]);

    const handleSendMessage = async () => {
        const messageResponse = await sendMessage({
            variables: {
                chatId,
                content: inputText,
                type: "default",
            },
        });

        if (messageResponse.data && messageResponse.data.sendMessage) {
            setInputText("");
        }
    };

    useEffect(() => {
        if (chatData && chatData.messagesAndEvents) {
            setItems(chatData.messagesAndEvents);
        }

        return () => {
            setItems([]);
        }
    }, [chatData]);

    useEffect(() => {
        if (newMessageData && newMessageData.newMessageOrEvent) {
            setItems((previousData: any) => [
                ...previousData,
                newMessageData.newMessageOrEvent,
            ]);
        }
    }, [newMessageData]);

    const { showActionSheetWithOptions } = useActionSheet();

    const colorScheme = useColorScheme();

    const onPress = (chatId: string, colorScheme: ColorSchemeName) => {
        const options = ["Edit chat", "Delete chat", "Cancel"];
        const destructiveButtonIndex = 1;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
            options,
            cancelButtonIndex,
            destructiveButtonIndex,
            containerStyle: {
                backgroundColor: colorScheme === "dark" ? COLORS.dark : COLORS.white,
            },
            textStyle: {
                color: colorScheme === "dark" ? COLORS.white : COLORS.black, 
                fontFamily: "Inter_400Regular", 
                fontSize: 18,
            },
        }, async (selectedIndex: number | undefined) => {
            switch (selectedIndex) {
                case 0:
                    navigation.navigate("EditChatInfo", { chatId });
                    
                    break;

                case destructiveButtonIndex:
                    await deleteChat({
                        variables: {
                            chatId,
                        },
                        update: (store, { data: deleteChatData }) => {
                            if (deleteChatData && deleteChatData.deleteChat && data && data.chats) {
                                const chatsData = [...data.chats];
                                const remainingChats = chatsData.filter((chat) => chat.chatId !== chatId);

                                store.writeQuery<ChatsQuery>({
                                    query: ChatsDocument,
                                    data: {
                                        chats: remainingChats,
                                    },
                                });
                            }
                        },
                    });

                    navigation.navigate("NewChat");
                    
                    break;

                case cancelButtonIndex:
                    break;
        }});
    }

    useEffect(() => {
        navigation.setOptions({
            title: "Phorm",
            headerRight: () => (
                <HeaderButton
                    onPress={() => onPress(chatId, colorScheme)}
                    key={chatId}
                >
                    <Ionicons name="ellipsis-vertical-sharp" size={24} color={textColor} />
                </HeaderButton>
            )
        });
    }, [navigation, chatId, colorScheme, textColor]);

    return (
        <Layout 
            content={
                <View style={[styles.container, chatStyles.chatPage]}>
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
                                        <Event event={item} />
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
                            onContentSizeChange={() => {
                                flatListRef?.current?.scrollToEnd({ animated: true });
                            }}
                        />
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
                                onPress={handleSendMessage}
                            >
                                <Ionicons name="send-outline" size={24} color={COLORS.white} />
                            </Pressable>
                        </View>
                    </View>
                </View>
            }
        />
    );
}

export default ChatScreen;
