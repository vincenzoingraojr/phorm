import { FunctionComponent, useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";
import { textColorProp, theme } from "../../constants/theme";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

type InputType = "text" | "password";

interface InputProps {
    field: string;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
    value: string;
    onUpdateValue: (args: string) => void;
    type?: InputType;
    errors?: Record<string, string>;
}

const Input: FunctionComponent<InputProps> = ({
    field,
    placeholder,
    keyboardType = "default",
    value,
    onUpdateValue,
    type = "text",
    errors,
}) => {
    const styles = theme();
    const textColor = textColorProp();
    const [secure, setSecure] = useState<boolean>(true);

    return (
        <View style={inputStyles.wrapper}>
            {errors && errors[field] && (
                <Text style={[styles.text, inputStyles.error]}>{errors[field]}</Text>
            )}
            <View style={inputStyles.container}>
                <View style={inputStyles.inputBox}>
                    <TextInput
                        style={[styles.input, inputStyles.input]}
                        placeholder={placeholder}
                        autoCapitalize="none"
                        keyboardType={keyboardType}
                        placeholderTextColor={textColor}
                        secureTextEntry={type === "password" ? secure : false}
                        value={value}
                        onChangeText={onUpdateValue}
                        cursorColor={textColor}
                        selectionColor={COLORS.orange}
                        underlineColorAndroid="transparent"
                    />
                </View>
                {type === "password" && (
                    <View style={inputStyles.visibilityBox}>
                        <Ionicons name={secure ? "eye-outline" : "eye-off-outline"} size={24} color={COLORS.orange} onPress={() => setSecure(!secure)} />
                    </View>
                )}
            </View>
        </View>
    );
};

const inputStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: "100%",
        flexDirection: "column",
        gap: 12,
    },
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderColor: COLORS.orange,
        borderRadius: 4,
        borderWidth: 1,
        marginBottom: 24,
        padding: 8,
    },
    error: {
        fontSize: 16,
        color: "red",
    },
    inputBox: {
        flex: 1,
        alignItems: "center",
    },
    input: {
        width: "100%",
    },
    visibilityBox: {
        flex: 0,
    },
});

export default Input;