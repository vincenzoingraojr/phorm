import { Layout } from "../components/Layout";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, TextInput, View } from "react-native";
import { greyColorProp, textColorProp, theme } from "../constants/theme";
import { chatStyles } from "../constants/chatStyles";
import Logo from "../components/icons/Logo";
import { globalStyles } from "../constants/global";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ChatsDocument, ChatsQuery, useChatsQuery, useCreateChatMutation } from "../generated/graphql";
import Toast from "react-native-root-toast";
import { toastProps } from "../constants/toast";

type RootStackParamList = {
    NewChat: any | undefined;
    Chat: { chatId: string | null };
};

type Props = NativeStackScreenProps<RootStackParamList, "NewChat">;

const NewChatScreen = ({ navigation }: Props) => {
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
    const { data } = useChatsQuery({ fetchPolicy: "cache-and-network" });

    const handleCreateChat = async () => {
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
    };

    return (
        <Layout 
            content={
                <View style={[styles.container, chatStyles.chatPage]}>
                    <View style={chatStyles.main}>
                        <View style={globalStyles.appLogo}>
                            <Logo type="new-chat-logo" />
                        </View>
                    </View>
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
                                onPress={handleCreateChat}
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

export default NewChatScreen;
