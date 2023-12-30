import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollableLayout } from "../../components/ScrollableLayout";
import { View } from "react-native";
import { globalStyles } from "../../constants/global";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useEffect, useState } from "react";
import { ChatsDocument, ChatsQuery, useChatsQuery, useEditChatInfoMutation, useFindChatQuery } from "../../generated/graphql";
import Toast from "react-native-root-toast";
import { toastProps } from "../../constants/toast";

type RootStackParamList = {
    EditChatInfo: { chatId: string };
};

type ChatRouteProp = RouteProp<RootStackParamList, "EditChatInfo">;

const EditChatInfoScreen = () => {
    const route = useRoute<ChatRouteProp>();
    const { chatId } = route.params;

    const [title, setTitle] = useState("");
    const [updateChat] = useEditChatInfoMutation();

    const { data: chatData } = useFindChatQuery({ variables: { chatId }, fetchPolicy: "cache-and-network" });

    useEffect(() => {
        if (chatData && chatData.findChat) {
            setTitle(chatData.findChat.title);
        }
    }, [chatData]);

    const { data } = useChatsQuery({ fetchPolicy: "cache-and-network" });

    const handleUpdate = async () => {
        const response = await updateChat({
            variables: {
                title,
                chatId,
            },
            update: (store, { data: editedChatData }) => {
                if (editedChatData && editedChatData.editChatInfo && editedChatData.editChatInfo.chat && data && data.chats) {
                    const chatsData = data.chats.filter((chat) => chat.chatId !== chatId);

                    store.writeQuery<ChatsQuery>({
                        query: ChatsDocument,
                        data: {
                            chats: [editedChatData.editChatInfo.chat, ...chatsData],
                        },
                    });
                }
            },
        });

        if (response.data && response.data.editChatInfo && response.data.editChatInfo.status) {
            Toast.show(response.data.editChatInfo.status as string, toastProps);
        }
    }

    return (
        <ScrollableLayout 
            content={
                <View style={globalStyles.standardPageContainer}>
                    <Input field="title" placeholder="Title" value={title} onUpdateValue={(text) => setTitle(text)} />
                    <Button buttonStyle={globalStyles.standardButton} text="Save" onPress={handleUpdate} />
                </View>
            }
        />
    );
}

export default EditChatInfoScreen;