import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { greyColorProp, textColorProp, theme } from "../constants/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { COLORS } from "../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useChatsQuery } from "../generated/graphql";
import ChatResult from "../components/ui/ChatResult";
import { Layout } from "../components/Layout";
import { chatStyles } from "../constants/chatStyles";

type RootStackParamList = {
    Search: any | undefined;
    Chat: { chatId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

const SearchScreen = ({ navigation }: Props) => {
    const styles = theme();
    const greyColor = greyColorProp();
    const textColor = textColorProp();
    const insets = useSafeAreaInsets();

    const [searchQuery, setSearchQuery] = useState("");

    const { data, loading, error } = useChatsQuery({ fetchPolicy: "cache-and-network" });

    const emptyQuery = "";

    const [state, setState] = useState({
        filteredData: [] as any,
        query: emptyQuery,
    });

    function handleInputChange(searchQuery: string) {
        const query = searchQuery;
        const dataItems = data?.chats || [];

        const filteredData = dataItems.filter((dataItem: any) => {
            let content = "";

            const results = [...dataItem.events, ...dataItem.messages];
            
            results.sort((a, b) => new Date(parseInt(a.createdAt)).getTime() - new Date(parseInt(b.createdAt)).getTime());
            
            const result = results[results.length - 1];

            if (result.__typename === "Message") {
                content = result.content;
            } else {
                content = result.eventMessage;
            }
            
            return (
                dataItem.title
                    .toLowerCase()
                    .includes(query.toLowerCase()) || 
                content
                    .toLowerCase()
                    .includes(query.toLowerCase())
            ); 
        });

        setState({
            filteredData,
            query,
        });
    }

    const { filteredData, query } = state;
    const hasSearchResults = filteredData && query !== emptyQuery;
    const dataItems = hasSearchResults ? filteredData : (data ? data.chats : []);
    const noResults = query !== emptyQuery && dataItems.length === 0;

    useLayoutEffect(() => {
        navigation.setOptions({
            header: ({ navigation }) => (
                <View style={[searchStyles.container, { backgroundColor: styles.header.backgroundColor, paddingTop: insets.top }]}>
                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={({ pressed }) => [
                            searchStyles.goBackButton,
                            pressed && chatStyles.disabledOrPressed,
                        ]}
                    >
                        <Ionicons name="chevron-back-outline" size={24} color={COLORS.white} />
                    </Pressable>
                    <View style={[searchStyles.header, { backgroundColor: greyColor }]}>
                        <Ionicons name="search-outline" size={28} color={textColor} />
                        <View style={searchStyles.searchInputBox}>
                            <TextInput
                                style={[styles.input, searchStyles.searchInput]}
                                placeholder={"Search"}
                                autoCapitalize="none"
                                keyboardType={"default"}
                                placeholderTextColor={textColor}
                                secureTextEntry={false}
                                value={searchQuery}
                                onChangeText={(text) => {
                                    setSearchQuery(text);
                                    handleInputChange(text);
                                }}
                                cursorColor={textColor}
                                selectionColor={COLORS.orange}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        {searchQuery.length > 0 && (
                            <Pressable style={searchStyles.clearSearchInput} onPress={() => {
                                setSearchQuery("");
                                handleInputChange("");
                            }}>
                                <Ionicons name={"close-outline"} size={26} color={COLORS.orange} />
                            </Pressable>
                        )}
                    </View>
                </View>
            ),
        });
    }, [navigation, searchQuery, greyColor, textColor]);

    return (
        <Layout 
            content={
                <View style={searchStyles.searchResults}>
                    {noResults ? (
                        <View style={searchStyles.noResults}>
                            <Text style={styles.text}>No results for "{query}".</Text>
                        </View>
                    ) : (
                        <FlatList
                            data={dataItems}
                            renderItem={({ item }) => (
                                <ChatResult item={item} navigation={navigation} />
                            )}
                            style={searchStyles.feedContainer}
                            keyExtractor={(item) => item.chatId}
                        />
                    )}
                </View>
            }
        />
    );
}

const searchStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        height: 100,
        paddingLeft: 16,
        paddingRight: 16,
    },
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        borderRadius: 12,
        paddingTop: 10,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 10,
    },
    searchInputBox: {
        flex: 1,
        alignItems: "center",
    },
    searchInput: {
        width: "100%",
    },
    clearSearchInput: {
        flex: 0,
    },
    goBackButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.orange,
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    searchResults: {
        flex: 1,
        flexDirection: "column",
    },
    noResults: {
        padding: 16,
    },
    feedContainer: {
        flex: 1,
    },
});

export default SearchScreen;