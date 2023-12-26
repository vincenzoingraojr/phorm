import { FunctionComponent, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";

interface EventProps {
    event: any;
}

const Event: FunctionComponent<EventProps> = ({ event }) => {
    return (
        <View style={eventStyles.eventContainer}>
            <Text style={eventStyles.text}>{event.eventMessage}</Text>
        </View>
    );
}

const eventStyles = StyleSheet.create({
    eventContainer: {
        flex: 1,
        backgroundColor: COLORS.orange,
        borderRadius: 6,
        padding: 6,
    },
    text: {
        color: COLORS.white,
        fontFamily: "Inter_400Regular",
        fontSize: 16,
    },
});

export default Event;