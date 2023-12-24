import { Text, View } from "react-native";
import { globalStyles } from "../constants/global";
import { useState } from "react";
import Button from "../components/ui/Button";
import { ScrollableLayout } from "../components/ScrollableLayout";
import Input from "../components/ui/Input";
import { theme } from "../constants/theme";
import { Link } from "@react-navigation/native";
import { useSendRecoveryEmailMutation } from "../generated/graphql";
import Toast from "react-native-root-toast";
import { toastProps } from "../constants/toast";
import { toErrorMap } from "../utils/toErrorMap";

const RecoverPasswordScreen = () => {
    const styles = theme();
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const [sendEmail] = useSendRecoveryEmailMutation();

    const handleSendEmail = async () => {
        const response = await sendEmail({
            variables: {
                email,
            },
        });

        if (response.data && response.data.sendRecoveryEmail) {
            if (response.data.sendRecoveryEmail.status && response.data.sendRecoveryEmail.status.length > 0) {
                Toast.show(response.data.sendRecoveryEmail.status as string, toastProps);
            } else {
                setErrors(
                    toErrorMap(
                        response.data.sendRecoveryEmail.errors!
                    )
                );
            }
        }
    };


    return (
        <ScrollableLayout
            content={
                <View style={globalStyles.standardPageContainer}>
                    <Input field="email" errors={errors} placeholder="Email" value={email} onUpdateValue={(text) => setEmail(text)} keyboardType="email-address" />
                    <Button buttonStyle={globalStyles.standardButton} text="Send email" onPress={handleSendEmail} />
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

export default RecoverPasswordScreen;
