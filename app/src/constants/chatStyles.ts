import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const chatStyles = StyleSheet.create({
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