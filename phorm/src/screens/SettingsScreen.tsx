import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { theme } from "../constants/theme";
import { ScrollableLayout } from "../components/ScrollableLayout";
import { useAuth } from "../navigation/AuthContext";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = () => {
    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });
    const styles = theme();

    const [logoutMutation, { client }] = useLogoutMutation();
    const { logout } = useAuth();

    const [imageUrl, setImageUrl] = useState<string>(require("../images/profile-picture.png"));

    useEffect(() => {
        if (data && data.me && data.me.profilePicture) {
            setImageUrl(data.me.profilePicture);
        } else {
            setImageUrl(require("../images/profile-picture.png"));
        }
    }, [data]);

    return (
        <ScrollableLayout 
            content={
                <View style={styles.container}>
                    <View style={settingsStyles.profileInfo}>
                        <Image source={imageUrl} style={settingsStyles.profileImage} />
                        <Text style={[styles.text, settingsStyles.profileText]}>{data?.me?.firstName}{" "}{data?.me?.lastName}</Text>
                    </View>
                    <TouchableOpacity style={settingsStyles.logOutButton} onPress={async () => { 
                        await logoutMutation();
                        await client.resetStore();
                        
                        await logout();
                    }}>
                        <Ionicons name="log-out-outline" size={28} color={"red"} />
                        <Text style={[styles.text, settingsStyles.logOutText]}>Log out</Text>
                    </TouchableOpacity>
                </View>
            }
        />
    );
}

const settingsStyles = StyleSheet.create({
    profileInfo: {
        padding: 16,
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
    profileImage: {
        width: 42,
        height: 42,
        borderRadius: 21,
    },
    profileText: {
        fontFamily: "Inter_700Bold",
        fontSize: 18,
    },
    logOutButton: {
        padding: 16,
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
    logOutText: {
        color: "red",
    }
});

export default SettingsScreen;