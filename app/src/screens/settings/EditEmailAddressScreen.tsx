import { StyleSheet, Text, View } from "react-native";
import { ScrollableLayout } from "../../components/ScrollableLayout";
import { globalStyles } from "../../constants/global";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useState } from "react";
import { MeDocument, MeQuery, User, useAuthSendVerificationEmailMutation, useEditEmailAddressMutation, useMeQuery } from "../../generated/graphql";
import { greyColorProp, theme } from "../../constants/theme";
import { COLORS } from "../../constants/colors";
import { toErrorMap } from "../../utils/toErrorMap";
import Toast from "react-native-root-toast";
import { toastProps } from "../../constants/toast";

const EditEmailAddressScreen = () => {
    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });
    const styles = theme();
    const greyColor = greyColorProp();
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [editEmail] = useEditEmailAddressMutation();

    const handleEdit = async () => {
        const response = await editEmail({
            variables: {
                email,
                confirmEmail,
            },
            update: (
                store,
                {
                    data,
                }
            ) => {
                if (
                    data && data.editEmailAddress && data.editEmailAddress.user
                ) {
                    store.writeQuery<MeQuery>(
                        {
                            query: MeDocument,
                            data: {
                                me: data
                                    .editEmailAddress
                                    .user as User,
                            },
                        }
                    );
                }
            },
        });

        if (response && response.data && response.data.editEmailAddress) {
            if (response.data.editEmailAddress.status) {
                setErrors({});
                Toast.show(response.data.editEmailAddress.status, toastProps);
            } else if (response.data.editEmailAddress.errors && response.data.editEmailAddress.errors.length > 0) {
                setErrors(
                    toErrorMap(response.data.editEmailAddress.errors)
                );
            }
        }
    };

    const [sendEmail] = useAuthSendVerificationEmailMutation();

    const handleSendEmail = async () => {
        const response = await sendEmail();
    
        if (response && response.data && response.data.authSendVerificationEmail && response.data.authSendVerificationEmail.status) {
            Toast.show(response.data.authSendVerificationEmail.status, toastProps);
        }
    };

    return (
        <ScrollableLayout
            content={
                <View style={globalStyles.standardPageContainer}>
                    <View style={[editEmailStyles.editEmailBlock, globalStyles.bottom24]}>
                        <View style={editEmailStyles.emailStatus}>
                            <Text style={[styles.text, globalStyles.boldText]}>Current email</Text>
                            <Text style={[styles.text, editEmailStyles.emailVerified, { backgroundColor: data?.me?.emailVerified ? COLORS.lightGreen : COLORS.lightRed }]}>{data?.me?.emailVerified ? "Verified" : "Not verified"}</Text>
                        </View>
                        <Text style={styles.text}>{data?.me?.email}</Text>
                    </View>
                    {!data?.me?.emailVerified && (
                        <View style={[editEmailStyles.editEmailBlock, globalStyles.bottom24, editEmailStyles.emailActionsContainer, { backgroundColor: greyColor }]}>
                            <Text style={[styles.text, editEmailStyles.emailActionsTitle]}>Your email address is not verified</Text>
                            <Text style={styles.text}>Click the following button to receive an email with the instructions to verify your email address.</Text>
                            <Button buttonStyle={globalStyles.standardButton} text="Send email" onPress={handleSendEmail} />
                        </View>
                    )}
                    <Input field="email" errors={errors} placeholder="Email" value={email} onUpdateValue={(text) => setEmail(text)} keyboardType="email-address" />
                    <Input field="confirmEmail" errors={errors} placeholder="Confirm email" value={confirmEmail} onUpdateValue={(text) => setConfirmEmail(text)} keyboardType="email-address" />
                    <Button buttonStyle={globalStyles.standardButton} text="Update" onPress={handleEdit} />
                </View>
            }
        />
    );
}

const editEmailStyles = StyleSheet.create({
    editEmailBlock: {
        flex: 1,
        flexDirection: "column",
    },
    emailStatus: {
        flex: 0,
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    emailVerified: {
        flex: 0,
        padding: 4,
        color: COLORS.white,
        fontSize: 16,
        borderRadius: 4,
        fontFamily: "Inter_700Bold",
    },
    emailActionsContainer: {
        gap: 8,
        padding: 16,
        width: "100%",
        borderRadius: 16,
    },
    emailActionsTitle: {
        fontSize: 16,
        fontFamily: "Inter_700Bold",
    }
});

export default EditEmailAddressScreen;