import { View } from "react-native";
import { ScrollableLayout } from "../../components/ScrollableLayout";
import { globalStyles } from "../../constants/global";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";
import Toast from "react-native-root-toast";
import { toastProps } from "../../constants/toast";

const ChangePasswordScreen = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState<Record<string, string>>({});
    
    const [changePassword] = useChangePasswordMutation();

    const handleEdit = async () => {
        const response = await changePassword({
            variables: {
                currentPassword,
                password,
                confirmPassword,
            },
        });

        if (response && response.data && response.data.changePassword) {
            if (response.data.changePassword.status) {
                setErrors({});
                Toast.show(response.data.changePassword.status as string, toastProps);
            } else if (response.data.changePassword.errors && response.data.changePassword.errors.length > 0) {
                setErrors(
                    toErrorMap(response.data.changePassword.errors)
                );
            }
        }
    };

    return (
        <ScrollableLayout
            content={
                <View style={globalStyles.standardPageContainer}>
                    <Input field="currentPassword" errors={errors} placeholder="Current Password" value={currentPassword} onUpdateValue={(text) => setCurrentPassword(text)} type="password" />
                    <Input field="password" errors={errors} placeholder="Password" value={password} onUpdateValue={(text) => setPassword(text)} type="password" />
                    <Input field="confirmPassword" errors={errors} placeholder="Confirm password" value={confirmPassword} onUpdateValue={(text) => setConfirmPassword(text)} type="password" />
                    <Button buttonStyle={globalStyles.standardButton} text="Update" onPress={handleEdit} />
                </View>
            }
        />
    );
}

export default ChangePasswordScreen;