import { StyleSheet, Text, View } from "react-native";
import { ScrollableLayout } from "../../components/ScrollableLayout";
import { globalStyles } from "../../constants/global";
import Button from "../../components/ui/Button";
import { theme } from "../../constants/theme";
import { COLORS } from "../../constants/colors";
import { useDeleteAccountMutation } from "../../generated/graphql";
import { useAuth } from "../../navigation/AuthContext";

const DeleteDataScreen = () => {
    const styles = theme();

    const [deleteData] = useDeleteAccountMutation();
    const { logout } = useAuth();

    const handleDelete = async () => {
        const response = await deleteData();

        if (response && response.data && response.data.deleteAccount) {
            await logout();
        }
    };

    return (
        <ScrollableLayout
            content={
                <View style={globalStyles.standardPageContainer}>
                    <View style={[deleteDataStyles.deleteBlock, globalStyles.bottom24]}>
                        <Text style={[styles.text, globalStyles.boldText]}>Delete all of your data</Text>
                        <Text style={styles.text}>By clicking the following button, all of your data stored on this platform will be permanently deleted. There's no going back.</Text>
                    </View>
                    <Button buttonStyle={deleteDataStyles.dangerButton} text="Delete" onPress={handleDelete} />
                </View>
            }
        />
    );
}

const deleteDataStyles = StyleSheet.create({
    deleteBlock: {
        flex: 1,
        flexDirection: "column",
    },
    dangerButton: {
        backgroundColor: COLORS.red,
        color: "#ffffff",
    }
});

export default DeleteDataScreen;