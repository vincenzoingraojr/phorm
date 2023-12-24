import { Text, StyleSheet, View, useColorScheme } from "react-native";
import { Layout } from "../components/Layout";
import { theme } from "../constants/theme";
import Logo from "../components/icons/Logo";
import Button from "../components/ui/Button";
import { COLORS } from "../constants/colors";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
    Index: any | undefined;
    LogIn: undefined;
    SignUp: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Index">;

const IndexScreen = ({ navigation }: Props) => {
    const styles = theme();
    const colorScheme = useColorScheme();

    return (
        <Layout
            content={
                <View style={index.container}>
                    <View style={index.innerContainer}>
                        <Logo type="index-logo" />
                        <Text style={[styles.text, index.title]}>
                            Phorm
                        </Text>
                        <Text style={[styles.text, index.description]}>
                            Your scientific AI chatbot.
                        </Text>
                        <View style={index.buttonsContainer}>
                            <Button buttonStyle={index.loginButton} text="Log in" onPress={() => { navigation.navigate("LogIn") }} />
                            <Button buttonStyle={{ 
                                backgroundColor: colorScheme === "dark" ? COLORS.white : COLORS.black,
                                color: colorScheme === "dark" ? COLORS.black : COLORS.white,
                            }} text="Sign up" onPress={() => { navigation.navigate("SignUp") }} />
                        </View>
                    </View>
                    <View style={index.footerContainer}>
                        <Text style={[styles.text, index.footer]}>&copy; {new Date().getFullYear()} Phorm Labs</Text>
                    </View>
                </View>
            }
        />
    );
}

export default IndexScreen;

const index = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
    },
    innerContainer: {
        alignItems: "center",
        marginTop: 64,
    },
    title: {
        fontFamily: "Inter_700Bold",
        fontSize: 24,
        marginTop: 24,
    },
    buttonsContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
        gap: 18,
    },
    loginButton: {
        backgroundColor: COLORS.orange,
        color: COLORS.white,
    },
    description: {
        marginTop: 24,
    },
    footerContainer: {
        alignItems: "center",
        height: 60,
    },
    footer: {
        fontSize: 14,
        marginTop: 24,
    }
});