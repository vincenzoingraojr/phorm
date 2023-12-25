import NewChatScreen from "../screens/NewChatScreen";
import { theme } from "../constants/theme";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import SettingsScreen from "../screens/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditChatInfoScreen from "../screens/EditChatInfoScreen";
import ChatScreen from "../screens/ChatScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    const styles = theme();

    return (
        <Drawer.Navigator
            initialRouteName="NewChat"
            screenOptions={{
                drawerType: "slide",
                headerStyle: { backgroundColor: styles.header.backgroundColor },
                headerTintColor: styles.text.color,
                headerShadowVisible: false,
                headerTitleStyle: { fontFamily: styles.header.fontFamily, fontSize: styles.header.fontSize },
            }}
            backBehavior="history"
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen 
                name="NewChat" 
                component={NewChatScreen}
                options={{
                    title: "Phorm",
                }}
            />
            <Drawer.Screen 
                name="Chat" 
                component={ChatScreen}
                options={{
                    title: "Phorm",
                }}
                initialParams={{ chatId: undefined }}
            />
        </Drawer.Navigator>
    );
}

const AppStack = () => {
    const styles = theme();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                headerStyle: { backgroundColor: styles.header.backgroundColor },
                headerTintColor: styles.text.color,
                headerTitleStyle: { fontFamily: styles.header.fontFamily, fontSize: styles.header.fontSize },
                animation: "simple_push",
            }}
            initialRouteName="HomeStack"
        >
            <Stack.Screen
                name="HomeStack"
                component={HomeStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerShown: true,
                    title: "Settings",
                }}
            />
            <Stack.Screen 
                name="EditChatInfo"
                component={EditChatInfoScreen} 
                options={{
                    headerShown: true,
                    title: "Edit title",
                }}
                initialParams={{ chatId: undefined }}
            />
        </Stack.Navigator>
    );
}

export default AppStack;