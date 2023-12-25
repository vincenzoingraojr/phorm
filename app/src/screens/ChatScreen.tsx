import { Layout } from "../components/Layout";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, FlatList, Pressable, Text, TextInput, View } from "react-native";
import { chatStyles } from "../constants/chatStyles";
import { greyColorProp, textColorProp, theme } from "../constants/theme";
import { COLORS } from "../constants/colors";
import { MessageOrEvent, useMeQuery, useMessagesAndEventsQuery, useNewMessageOrEventSubscription, useSendMessageMutation } from "../generated/graphql";
import Message from "../components/ui/Message";
import ModalComponent from "../components/ui/Modal";
import { useEffect, useRef, useState } from "react";
import { RenderSeparator } from "../components/ui/RenderSeparator";
import { Ionicons } from "@expo/vector-icons";
import HeaderButton from "../components/ui/HeaderButton";

type RootStackParamList = {
    Chat: { chatId: string };
    NewChat: undefined;
};
  
type ChatRouteProp = RouteProp<RootStackParamList, "Chat">;

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;

const ChatScreen = ({ navigation }: Props) => {
    const route = useRoute<ChatRouteProp>();
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
    const { data: meData } = useMeQuery({ fetchPolicy: "cache-and-network" });
    const { data: chatData, loading, error } = useMessagesAndEventsQuery({ variables: { chatId }, fetchPolicy: "cache-and-network" });

    const { data: newMessageData } = useNewMessageOrEventSubscription({ variables: { chatId, userId: meData?.me?.id } });

    const [items, setItems] = useState(chatData?.messagesAndEvents || []);

    const flatListRef = useRef<FlatList<MessageOrEvent> | null>(null);

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

        if (flatListRef && flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [chatData]);

    useEffect(() => {
        if (newMessageData && newMessageData.newMessageOrEvent) {
            setItems((previousData) => [
                ...previousData,
                newMessageData.newMessageOrEvent,
            ]);
        }

        if (flatListRef && flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [newMessageData]);

    const [isVisible, setIsVisible] = useState(false);
    const onClose = () => {
        setIsVisible(false);
    }

    useEffect(() => {
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
    }, [navigation]);

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