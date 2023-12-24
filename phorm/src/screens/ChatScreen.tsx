import { Layout } from "../components/Layout";
import ChatLayout from "../components/ChatLayout";
import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    Chat: { chatId: string };
    NewChat: undefined;
};
  
type ChatRouteProp = RouteProp<RootStackParamList, "Chat">;

type Props = NativeStackScreenProps<RootStackParamList, "Chat">;
const ChatScreen = ({ navigation }: Props) => {
    const route = useRoute<ChatRouteProp>();
    const { chatId } = route.params;

    return (
        <Layout 
            content={
                <ChatLayout isNewChat={false} chatId={chatId} navigation={navigation} />
            }
        />
    );
}

export default ChatScreen;