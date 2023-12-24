import { Layout } from "../components/Layout";
import ChatLayout from "../components/ChatLayout";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    NewChat: any | undefined;
    Chat: { chatId: string | null };
};

type Props = NativeStackScreenProps<RootStackParamList, "NewChat">;
const NewChatScreen = ({ navigation }: Props) => {
    return (
        <Layout 
            content={
                <ChatLayout isNewChat={true} navigation={navigation} />
            }
        />
    );
}

export default NewChatScreen;
