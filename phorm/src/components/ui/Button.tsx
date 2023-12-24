import { FunctionComponent } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface ButtonProps {
    buttonStyle: { backgroundColor: string; color: string };
    text: string;
    onPress: () => void;
    disabled?: boolean,
}

const Button: FunctionComponent<ButtonProps> = ({ buttonStyle, text, onPress, disabled }) => {
    return (
        <Pressable
            style={({ pressed }) => [
                buttonStyles.button,
                pressed && buttonStyles.pressed,
                {
                    backgroundColor: buttonStyle.backgroundColor,
                }
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[buttonStyles.text, { color: buttonStyle.color }]}>{text}</Text>
        </Pressable>
    );
};

const buttonStyles = StyleSheet.create({
    button: {
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 12,
        justifyContent: "center",
        paddingTop: 12,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 12,
        opacity: 1,
    },
    text: {
        fontFamily: "Inter_700Bold",
        fontSize: 20,
    },
    pressed: {
        opacity: 0.7,
    },
});

export default Button;