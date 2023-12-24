import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "../screens/IndexScreen";
import { theme } from "../constants/theme";
import LogInScreen from "../screens/LogInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import RecoverPasswordScreen from "../screens/RecoverPasswordScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
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
            initialRouteName="Index"
        >
            <Stack.Screen name="Index" component={IndexScreen} />
            <Stack.Screen 
                name="LogIn" 
                component={LogInScreen} 
                options={{
                    headerShown: true,
                    title: "Log in",
                }}
            />
            <Stack.Screen 
                name="SignUp" 
                component={SignUpScreen} 
                options={{
                    headerShown: true,
                    title: "Sign up",
                }}
            />
            <Stack.Screen 
                name="RecoverPassword" 
                component={RecoverPasswordScreen} 
                options={{
                    headerShown: true,
                    title: "Recover your password",
                }}
            />
        </Stack.Navigator>
    );
}

export default AuthStack;