import { StyleSheet } from "react-native";
import { COLORS } from "./colors";

export const globalStyles = StyleSheet.create({
    standardPageContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 16,
    },
    standardButton: {
        backgroundColor: COLORS.orange,
        color: "#ffffff",
    },
    top24: {
        marginTop: 24,
    },
    link: {
        color: COLORS.orange,
    },
    toast: {
        backgroundColor: COLORS.orange,
        borderRadius: 6,
        padding: 6,
    },
    appLogo: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    modalContent: {
        width: "100%",
        borderTopRightRadius: 6,
        borderTopLeftRadius: 6,
        position: "absolute",
        bottom: 0,
    },
});