import { FunctionComponent } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../../constants/theme";
import { useLatestMessageOrEventQuery } from "../../generated/graphql";

interface ChatResultProps {
    item: any;
    navigation: any;
}

const ChatResult: FunctionComponent<ChatResultProps> = ({ item, navigation }) => {
    const styles = theme();

    const { data } = useLatestMessageOrEventQuery({ variables: { chatId: item.chatId }, fetchPolicy: "cache-and-network" });
    
    return (
        <TouchableOpacity 
            style={chatResultStyles.itemContainer}
            onPress={() => navigation.navigate("Chat", { chatId: item.chatId })}    
        >
            <Text style={[styles.text, chatResultStyles.title]}>{item.title}</Text>
            <Text style={styles.text}>
                {(data && data.latestMessageOrEvent) && (
                    <>
                        {data.latestMessageOrEvent.__typename === "Message" ? (
                            <>{data.latestMessageOrEvent.content}</>
                        ) : (data.latestMessageOrEvent.__typename === "Event" && (
                            <>{data.latestMessageOrEvent.eventMessage}</>
                        ))}
                    </>
                )}
            </Text>
        </TouchableOpacity>
    );
}

const chatResultStyles = StyleSheet.create({
    itemContainer: {
        flexDirection: "column",
        gap: 2,
        padding: 16,
    },
    title: {
        fontFamily: "Inter_700Bold",
    }
});

export default ChatResult;