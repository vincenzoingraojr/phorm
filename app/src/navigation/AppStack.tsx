import NewChatScreen from "../screens/NewChatScreen";
import { theme } from "../constants/theme";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerContent from "./DrawerContent";
import SettingsScreen from "../screens/settings/SettingsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditChatInfoScreen from "../screens/chat/EditChatInfoScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import ManageAccountInfoScreen from "../screens/settings/ManageAccountInfoScreen";
import EditEmailAddressScreen from "../screens/settings/EditEmailAddressScreen";
import ChangePasswordScreen from "../screens/settings/ChangePasswordScreen";
import DeleteDataScreen from "../screens/settings/DeleteData";
import SearchScreen from "../screens/SearchScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
    const styles = theme();

    return (
        <Drawer.Navigator
            initialRouteName="NewChat"
            screenOptions={{
                drawerType: "slide",
                headerTintColor: styles.text.color,
                headerStyle: { backgroundColor: styles.header.backgroundColor },
                headerShadowVisible: false,
                headerTitleStyle: { fontFamily: styles.header.fontFamily, fontSize: styles.header.fontSize },
                title: "Phorm",
            }}
            backBehavior="history"
            drawerContent={(props) => <DrawerContent {...props} />}
        >
            <Drawer.Screen 
                name="NewChat" 
                component={NewChatScreen}
            />
            <Drawer.Screen 
                name="Chat" 
                component={ChatScreen}
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
                headerShadowVisible: false,
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
            <Stack.Screen 
                name="ManageAccountInfo"
                component={ManageAccountInfoScreen} 
                options={{
                    headerShown: true,
                    title: "Manage account info",
                }}
            />
            <Stack.Screen 
                name="EditEmailAddress"
                component={EditEmailAddressScreen} 
                options={{
                    headerShown: true,
                    title: "Edit email address",
                }}
            />
            <Stack.Screen 
                name="ChangePassword"
                component={ChangePasswordScreen} 
                options={{
                    headerShown: true,
                    title: "Change your password",
                }}
            />
            <Stack.Screen 
                name="DeleteData"
                component={DeleteDataScreen} 
                options={{
                    headerShown: true,
                    title: "Delete your data",
                }}
            />
            <Stack.Screen 
                name="Search"
                component={SearchScreen} 
                options={{
                    headerShown: true,
                    title: "Search",
                }}
            />
        </Stack.Navigator>
    );
}

export default AppStack;