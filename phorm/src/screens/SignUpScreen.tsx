import { Text, View } from "react-native";
import { theme } from "../constants/theme";
import { globalStyles } from "../constants/global";
import { ScrollableLayout } from "../components/ScrollableLayout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "@react-navigation/native";
import { useState } from "react";
import { useSignupMutation } from "../generated/graphql";
import Toast from "react-native-root-toast";
import { toastProps } from "../constants/toast";
import { toErrorMap } from "../utils/toErrorMap";

const SignUpScreen = () => {
    const styles = theme();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [signup] = useSignupMutation();

    const handleSignup = async () => {
        const response = await signup({
            variables: {
                firstName,
                lastName,
                email,
                password,
            },
        });

        if (response.data && response.data.signup) {
            if (response.data.signup.status && response.data.signup.status.length > 0) {
                Toast.show(response.data.signup.status as string, toastProps);
            } else {
                setErrors(
                    toErrorMap(
                        response.data.signup.errors!
                    )
                );
            }
        }
    };

    return (
        <ScrollableLayout
            content={
                <View style={globalStyles.standardPageContainer}>
                    <Input field="firstName" errors={errors} placeholder="First name" value={firstName} onUpdateValue={(text) => setFirstName(text)} />
                    <Input field="lastName" errors={errors} placeholder="Last name" value={lastName} onUpdateValue={(text) => setLastName(text)} />
                    <Input field="email" errors={errors} placeholder="Email" value={email} onUpdateValue={(text) => setEmail(text)} keyboardType="email-address" />
                    <Input field="password" errors={errors} placeholder="Password" value={password} onUpdateValue={(text) => setPassword(text)} type="password" />
                    <Button 
                        buttonStyle={globalStyles.standardButton}
                        text="Sign up" 
                        onPress={handleSignup} 
                    />
                    <View style={globalStyles.top24}>
                        <Text style={styles.text}>
                            Already have an account?{" "}<Link to={{ screen: "LogIn" }} style={globalStyles.link}>Log in</Link>
                        </Text>
                    </View>
                </View>
            }
        />
    );
}

export default SignUpScreen;
