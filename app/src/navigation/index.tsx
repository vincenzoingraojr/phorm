import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";
import { theme } from "../constants/theme";
import { RootSiblingParent } from "react-native-root-siblings";
import { useAuth } from "./AuthContext";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

function Navigation() {
    const { loading, isAuth } = useAuth();

    const styles = theme();

    if (loading) {
        return (
            <View style={[styles.container, loadingComponentStyle.container, loadingComponentStyle.horizontal]}>
                <ActivityIndicator size="large" color={COLORS.orange} />
            </View>
        );
    }

    return (
        <RootSiblingParent>
            <ActionSheetProvider useCustomActionSheet={true}>
                <NavigationContainer>
                    {isAuth ? <AppStack /> : <AuthStack />}
                </NavigationContainer>
            </ActionSheetProvider>
        </RootSiblingParent>
    );
}

const loadingComponentStyle = StyleSheet.create({
    container: {
        justifyContent: "center",
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    }
});

export default Navigation;