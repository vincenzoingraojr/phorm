import { FunctionComponent, useEffect, useState } from "react";
import { useMeQuery } from "../../generated/graphql";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../constants/theme";
import { Image } from "expo-image";
import Logo from "../icons/Logo";

interface MessageProps {
    message: any;
}

const Message: FunctionComponent<MessageProps> = ({ message }) => {
    const styles = theme();
    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });

    const [imageUrl, setImageUrl] = useState<string>(require("../../images/profile-picture.png"));

    useEffect(() => {
        if (data && data.me && data.me.profilePicture) {
            setImageUrl(data.me.profilePicture);
        } else {
            setImageUrl(require("../../images/profile-picture.png"));
        }
    }, [data]);

    return (
        <View style={messageStyles.messageContainer}>
            <View style={messageStyles.authorInfo}>
                {message.fromUser ? (
                    <Image source={imageUrl} style={messageStyles.authorProfileImage} />
                ) : (
                    <Logo type="small" />
                )}
                <Text style={[styles.text, messageStyles.authorName]}>{message.fromUser ? `${data?.me?.firstName} ${data?.me?.lastName}` : "Phorm"}</Text>
            </View>
            <View style={messageStyles.contentContainer}>
                <Text style={styles.text}>{message.content}</Text>
            </View>
        </View>
    );
}

const messageStyles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        flexDirection: "column",
        gap: 6,
    },
    authorInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    authorName: {
        fontFamily: "Inter_700Bold",
        fontWeight: "700",
        fontSize: 16,
    },
    authorProfileImage: {
        width: 28,
        height: 28,
        borderRadius: 14,
    },
    contentContainer: {
        flex: 1,
    },
});

export default Message;