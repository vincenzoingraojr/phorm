import { RouteProp, useRoute } from "@react-navigation/native";
import { ScrollableLayout } from "../components/ScrollableLayout";
import { View } from "react-native";
import { globalStyles } from "../constants/global";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useState } from "react";
import { useEditChatInfoMutation } from "../generated/graphql";
import Toast from "react-native-root-toast";
import { toastProps } from "../constants/toast";

type RootStackParamList = {
    Chat: undefined;
    EditChatInfo: { chatId: string };
};
  
type ChatRouteProp = RouteProp<RootStackParamList, "EditChatInfo">;

const EditChatInfoScreen = () => {
    const route = useRoute<ChatRouteProp>();
    const { chatId } = route.params;

    const [title, setTitle] = useState("");
    const [updateChat] = useEditChatInfoMutation();

    const handleUpdate = async () => {
        const response = await updateChat({
            variables: {
                title,
                chatId
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
                    <Button buttonStyle={globalStyles.standardButton} text="Log in" onPress={handleUpdate} />
                </View>
            }
        />
    );
}

export default EditChatInfoScreen;