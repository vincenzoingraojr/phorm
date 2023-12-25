import { StyleSheet, useColorScheme } from "react-native";
import { COLORS } from "./colors";

const lightTheme = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        backgroundColor: COLORS.white,
    },
    text: {
        color: COLORS.black,
        fontFamily: "Inter_400Regular",
        fontSize: 18,
    },
    header: {
        backgroundColor: COLORS.white,
        fontFamily: "Inter_700Bold",
        fontSize: 20,
    },
    input: {
        height: "auto",
        width: "auto",
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 0,
        fontFamily: "Inter_400Regular",
        fontSize: 18,
        color: COLORS.black,
    },
});

const darkTheme = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.dark,
    },
    contentContainer: {
        backgroundColor: COLORS.dark,
    },
    text: {
        color: COLORS.white,
        fontFamily: "Inter_400Regular",
        fontSize: 18,
    },
    header: {
        backgroundColor: COLORS.dark,
        fontFamily: "Inter_700Bold",
        fontSize: 20,
    },
    input: {
        height: "auto",
        width: "auto",
        borderColor: "transparent",
        borderRadius: 0,
        borderWidth: 0,
        fontFamily: "Inter_400Regular",
        fontSize: 18,
        color: COLORS.white,
    },
});

export const theme = () => {
    const colorScheme = useColorScheme();

    return colorScheme === "dark" ? darkTheme : lightTheme;
};

export const textColorProp = () => {
    const colorScheme = useColorScheme();

    return colorScheme === "dark" ? COLORS.white : COLORS.black;
};

export const greyColorProp = () => {
    const colorScheme = useColorScheme();

    return colorScheme === "dark" ? COLORS.darkGrey : COLORS.lightGrey;
};