import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { textColorProp, theme } from "../../constants/theme";
import { ScrollableLayout } from "../../components/ScrollableLayout";
import { useAuth } from "../../navigation/AuthContext";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = () => {
    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });
    const styles = theme();
    const textColor = textColorProp();

    const [logoutMutation, { client }] = useLogoutMutation();
    const { logout } = useAuth();

    const [imageUrl, setImageUrl] = useState<string>(require("../../images/profile-picture.png"));

    useEffect(() => {
        if (data && data.me && data.me.profilePicture) {
            setImageUrl(data.me.profilePicture);
        } else {
            setImageUrl(require("../../images/profile-picture.png"));
        }
    }, [data]);

    const PLATFORM_OS = Platform.OS;

    const OS = PLATFORM_OS.charAt(0).toUpperCase() + PLATFORM_OS.slice(1);

    return (
        <ScrollableLayout 
            content={
                <View style={styles.container}>
                    <View style={settingsStyles.profileInfo}>
                        <Image source={imageUrl} style={settingsStyles.profileImage} />
                        <Text style={[styles.text, settingsStyles.profileText]}>{data?.me?.firstName}{" "}{data?.me?.lastName}</Text>
                    </View>
                    <View style={settingsStyles.settingsPageContainer}>
                        <View style={settingsStyles.settingsBlock}>
                            <Text style={[styles.text, settingsStyles.settingsBlockTitle]}>Account</Text>
                            <View style={settingsStyles.settingsBlockContent}>
                                <TouchableOpacity style={settingsStyles.settingsButton} onPress={() => { 
                                    
                                }}>
                                    <Ionicons name="information-circle-outline" size={28} color={textColor} />
                                    <Text style={styles.text}>Manage account info</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={settingsStyles.settingsButton} onPress={() => { 
                                    
                                }}>
                                    <Ionicons name="at-sharp" size={28} color={textColor} />
                                    <View style={settingsStyles.settingsButtonContent}>
                                        <Text style={styles.text}>Edit email address</Text>
                                        <Text style={[styles.text, settingsStyles.settingsButtonText]}>{data?.me?.email}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={settingsStyles.settingsButton} onPress={() => { 
                                    
                                }}>
                                    <Ionicons name="lock-closed-outline" size={28} color={textColor} />
                                    <Text style={styles.text}>Change your password</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={settingsStyles.settingsBlock}>
                            <Text style={[styles.text, settingsStyles.settingsBlockTitle]}>About</Text>
                            <View style={settingsStyles.settingsBlockContent}>
                                <TouchableOpacity style={settingsStyles.settingsButton} onPress={() => { 
                                    
                                }}>
                                    <Ionicons name="help-circle-outline" size={28} color={textColor} />
                                    <Text style={styles.text}>Help center</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={settingsStyles.settingsButton} onPress={() => { 
                                    
                                }}>
                                    <Ionicons name="document-text-outline" size={28} color={textColor} />
                                    <Text style={styles.text}>Terms of use</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={settingsStyles.settingsButton} onPress={() => { 
                                    
                                }}>
                                    <Ionicons name="shield-outline" size={28} color={textColor} />
                                    <Text style={styles.text}>Privacy policy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={settingsStyles.settingsButton} onPress={() => { 
                                    
                                }}>
                                    <Ionicons name="documents-outline" size={28} color={textColor} />
                                    <Text style={styles.text}>Licenses</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={settingsStyles.settingsButton} onPress={async () => { 
                                    await logoutMutation();
                                    await client.resetStore();
                                    
                                    await logout();
                                }}>
                                    <Ionicons name="log-out-outline" size={28} color={"red"} />
                                    <Text style={[styles.text, settingsStyles.logOutText]}>Log out</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={settingsStyles.versionContainer}>
                        <Text style={[styles.text, settingsStyles.versionText]}>Phorm for {OS}, version 1.0.0</Text>
                    </View>
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
    settingsPageContainer: {
        flexDirection: "column",
        gap: 16,
    },
    settingsButton: {
        padding: 16,
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
    settingsButtonContent: {
        flexDirection: "column",
        gap: 2,
    },
    settingsButtonText: {
        fontSize: 16,
    },
    logOutText: {
        color: "red",
    },
    settingsBlock: {
        flexDirection: "column",
        gap: 2,
    },
    settingsBlockTitle: {
        fontSize: 16,
        paddingTop: 4,
        paddingLeft: 16,
        paddingRight: 16,
        fontFamily: "Inter_700Bold",
    },
    settingsBlockContent: {
        flexDirection: "column",
    },
    versionContainer: {
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 12,
    },
    versionText: {
        fontSize: 16,
    }
});

export default SettingsScreen;