import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { FunctionComponent, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { greyColorProp, textColorProp, theme } from "../constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useChatsQuery, useMeQuery } from "../generated/graphql";
import { Image } from "expo-image";

const DrawerContent: FunctionComponent<DrawerContentComponentProps> = (props) => {
    const styles = theme();
    const greyColor = greyColorProp();
    const textColor = textColorProp();

    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });

    const [imageUrl, setImageUrl] = useState<string>(require("../images/profile-picture.png"));

    useEffect(() => {
        if (data && data.me && data.me.profilePicture) {
            setImageUrl(data.me.profilePicture);
        } else {
            setImageUrl(require("../images/profile-picture.png"));
        }
    }, [data]);

    const { data: chatData } = useChatsQuery({ fetchPolicy: "cache-and-network" });

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={styles.container}
            >
                <TouchableOpacity
                    style={drawerStyles.searchBar}
                    onPress={() => props.navigation.navigate("Search")}
                >
                    <View style={[drawerStyles.searchBarButton, { backgroundColor: greyColor }]}>
                        <Ionicons name="search-outline" size={28} color={textColor} />
                        <Text style={[drawerStyles.searchBarText, { color: textColor }]}>
                            Search
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[drawerStyles.drawerButton, drawerStyles.drawerBox]}
                    onPress={() => props.navigation.navigate("NewChat")}    
                >
                    <Ionicons name="create-outline" size={28} color={textColor} />
                    <Text style={styles.text}>New chat</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[drawerStyles.drawerButton, drawerStyles.drawerBox]}
                    onPress={() => props.navigation.navigate("Collection")}    
                >
                    <Ionicons name="information-circle-outline" size={28} color={textColor} />
                    <Text style={styles.text}>Collection</Text>
                </TouchableOpacity>
                <FlatList
                    data={chatData?.chats || []}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={drawerStyles.drawerBox}
                            onPress={() => props.navigation.navigate("Chat", { chatId: item.chatId })}    
                        >
                            <Text style={styles.text}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    style={drawerStyles.feedContainer}
                    keyExtractor={(item) => item.chatId}
                />
                <TouchableOpacity
                    style={drawerStyles.profileContainer}
                    onPress={() => props.navigation.navigate("Settings")}
                >
                    <View style={drawerStyles.profile}>
                        <View style={drawerStyles.profileInfo}>
                            <Image source={imageUrl} style={drawerStyles.profileImage} />
                            <Text style={[styles.text, drawerStyles.profileText]}>{data?.me?.firstName}{" "}{data?.me?.lastName}</Text>
                        </View>
                        <Ionicons name="ellipsis-vertical-sharp" size={24} color={textColor} />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const drawerStyles = StyleSheet.create({
    searchBar: {
        paddingTop: 8,
        paddingLeft: 12,
        paddingRight: 12,
        paddingBottom: 8,
    },
    drawerBox: {
       padding: 12, 
    },
    searchBarButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12,
        borderRadius: 16,
    },
    searchBarText: {
        fontFamily: "Inter_400Regular",
        fontSize: 18,
    },
    feedContainer: {
        flex: 1,
    },
    profileContainer: {
        height: 80,
        paddingLeft: 12,
        paddingRight: 12,
    },
    profile: {
        flex: 1,
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        justifyContent: "space-between",
    },
    profileInfo: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
    },
    profileImage: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    profileText: {
        fontFamily: "Inter_700Bold",
        fontSize: 16,
    },
    drawerButton: {
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    }
});

export default DrawerContent;