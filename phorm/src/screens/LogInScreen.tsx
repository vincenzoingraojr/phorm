import { Text, View } from "react-native";
import { globalStyles } from "../constants/global";
import { useState } from "react";
import Button from "../components/ui/Button";
import { ScrollableLayout } from "../components/ScrollableLayout";
import Input from "../components/ui/Input";
import { theme } from "../constants/theme";
import { Link } from "@react-navigation/native";
import { MeDocument, MeQuery, User, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { toastProps } from "../constants/toast";
import Toast from "react-native-root-toast";
import { useAuth } from "../navigation/AuthContext";

const LogInScreen = () => {
    const styles = theme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [loginMutation] = useLoginMutation();
    const { login } = useAuth();

    const handleLogin = async () => {
        const response = await loginMutation({
            variables: {
                email,
                password,
            },
            update: (store, { data }) => {
                if (data && data.login && data.login.user) {
                    store.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                            me: data.login.user as User,
                        },
                    });
                }
            },
        });

        if (response.data && response.data.login) {
            if (response.data.login.accessToken && response.data.login.user) {
                await login(response.data.login.accessToken);
                Toast.show(response.data.login.status as string, toastProps);
            } else if (response.data.login.errors && response.data.login.errors.length > 0) {
                setErrors(
                    toErrorMap(response.data.login.errors)
                );
            } else {
                Toast.show(response.data.login.status as string, toastProps);
            }
        }        
    };

    return (
        <ScrollableLayout
            content={
                <View style={globalStyles.standardPageContainer}>
                    <Input field="email" errors={errors} placeholder="Email" value={email} onUpdateValue={(text) => setEmail(text)} keyboardType="email-address" />
                    <Input field="password" errors={errors} placeholder="Password" value={password} onUpdateValue={(text) => setPassword(text)} type="password" />
                    <Button buttonStyle={globalStyles.standardButton} text="Log in" onPress={handleLogin} />
                    <View style={globalStyles.top24}>
                        <Text style={styles.text}>
                            Forgot your password?{" "}<Link to={{ screen: "RecoverPassword" }} style={globalStyles.link}>Recover it here</Link>
                        </Text>
                    </View>
                </View>
            }
        />
    );
}

export default LogInScreen;
