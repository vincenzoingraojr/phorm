import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollableLayout } from "../../components/ScrollableLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { globalStyles } from "../../constants/global";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { MeDocument, MeQuery, User, useEditProfileMutation, useMeQuery } from "../../generated/graphql";
import { theme } from "../../constants/theme";
import axios from "axios";
import { REACT_APP_ENV, REACT_APP_SERVER_ORIGIN, REACT_APP_STORAGE_LINK } from "@env";
import { toastProps } from "../../constants/toast";
import Toast from "react-native-root-toast";
import { toErrorMap } from "../../utils/toErrorMap";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";

const ManageAccountInfoScreen = () => {
    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });
    const styles = theme();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [image, setImage] = useState<Buffer | null>(null);
    const [deleteImage, setDeleteImage] = useState(false);

    const [imageUrl, setImageUrl] = useState<string>(require("../../images/profile-picture.png"));

    const [buttonText, setButtonText] = useState("Upload photo");

    useEffect(() => {
        if (data && data.me) {
            setFirstName(data.me.firstName);
            setLastName(data.me.lastName);
        }

        if (data && data.me && data.me.profilePicture && data.me.profilePicture !== "") {
            setImageUrl(data.me.profilePicture);
        } else {
            setImageUrl(require("../../images/profile-picture.png"));
        }
    }, [data]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                encoding: FileSystem.EncodingType.Base64
            });
            const buffer = Buffer.from(base64, "base64");

            setImage(buffer);
            setImageUrl(result.assets[0].uri);
        } else {
            setImage(null);
        }
    };

    const clearImage = () => {
        setImageUrl(require("../../images/profile-picture.png"));
        setImage(null);
        setDeleteImage(true);
    }

    const [editProfile] = useEditProfileMutation();
    
    const handleUpdate = async () => {
        let profilePictureName = "";
        let existingProfilePictureName = "";
        let directory = "";
        let isUploaded = false;

        if (data && data.me && data.me.profilePicture && data.me.profilePicture !== "") {
            existingProfilePictureName =
                data?.me?.profilePicture?.replace(
                    `https://cdn.phormapp.com/${
                        REACT_APP_ENV ===
                        "development"
                            ? "local-users"
                            : "users"
                    }/${
                        data
                            ?.me
                            ?.id
                    }/`,
                    ""
                )!;            
        }
        
        if (image) {
            if (
                existingProfilePictureName !==
                ""
            ) {
                await axios.delete(
                    `${REACT_APP_STORAGE_LINK}/${
                        REACT_APP_ENV ===
                        "development"
                            ? "local-users"
                            : "users"
                    }/${
                        data
                            ?.me
                            ?.id
                    }/${existingProfilePictureName}`
                );
            }

            profilePictureName = `profile-picture-${new Date().getTime()}.jpeg`;
            directory =
                REACT_APP_ENV ===
                "development"
                    ? `local-users/${data?.me?.id}`
                    : `users/${data?.me?.id}`;

            let key = `${directory}/${profilePictureName}`;

            const {
                url,
            } = await fetch(
                `${REACT_APP_SERVER_ORIGIN}/presigned-url`,
                {
                    method: "POST",
                    headers:
                        {
                            Accept: "application/json",
                            "Content-Type":
                                "application/json",
                        },
                    body: JSON.stringify(
                        {
                            key: key,
                        }
                    ),
                }
            ).then(
                (res) =>
                    res.json()
            );

            setButtonText("Uploading...");

            const profilePictureConfig = {
                onUploadProgress: function(progressEvent: any) {
                    var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setButtonText(`${percentCompleted}%`);
                },
                headers: {
                    "Content-Type": "image/jpeg",
                },
            };

            await axios.put(url, image, profilePictureConfig)
                .then(() => {
                    setButtonText("Success!");
                    isUploaded = true;
                }).catch((error) => {
                    Toast.show(`An error occurred while uploading your profile picture. Error code: ${error.code}.`, toastProps);
                    isUploaded = false;
                });
        } else if (
            data?.me
                ?.profilePicture !==
                "" &&
            data?.me
                ?.profilePicture !==
                null &&
            deleteImage
        ) {
            await axios.delete(
                `${REACT_APP_STORAGE_LINK}/${
                    REACT_APP_ENV ===
                    "development"
                        ? "local-users"
                        : "users"
                }/${
                    data
                        ?.me
                        ?.id
                }/${existingProfilePictureName}`
            );
        } else {
            profilePictureName =
                existingProfilePictureName;
        }

        setImage(null);
        setButtonText("Upload photo");

        const response = await editProfile({
            variables: {
                firstName,
                lastName,
                profilePicture:
                    (!isUploaded &&
                        !deleteImage &&
                        data
                            ?.me
                            ?.profilePicture !==
                            "") ||
                    isUploaded
                        ? `https://cdn.phormapp.com/${
                                REACT_APP_ENV ===
                                "development"
                                    ? "local-users"
                                    : "users"
                            }/${
                                data
                                    ?.me
                                    ?.id
                            }/${profilePictureName}`
                        : "",
            },
            update: (
                store,
                {
                    data,
                }
            ) => {
                if (
                    data && data.editProfile && data.editProfile.user
                ) {
                    store.writeQuery<MeQuery>(
                        {
                            query: MeDocument,
                            data: {
                                me: data
                                    .editProfile
                                    .user as User,
                            },
                        }
                    );
                }
            },
        });

        if (response && response.data && response.data.editProfile) {
            if (response.data.editProfile.status) {
                Toast.show(response.data.editProfile.status, toastProps);
            } else if (response.data.editProfile.errors && response.data.editProfile.errors.length > 0) {
                setErrors(
                    toErrorMap(response.data.editProfile.errors)
                );
            } else {
                Toast.show("An unknown error occurred. Please try again later.", toastProps);
            }
        }
    };

    const [showClearButton, setShowClearButton] = useState((data && data.me && data.me.profilePicture && data.me.profilePicture !== "") || image);

    useEffect(() => {
        setShowClearButton((data && data.me && data.me.profilePicture && data.me.profilePicture !== "") || image);
    }, [data, image]);

    return (
        <ScrollableLayout
            content={
                <View style={globalStyles.standardPageContainer}>
                    <View style={manageInfoStyles.manageInfoBlock}>
                        <Image source={imageUrl} style={manageInfoStyles.profileImage} />
                    </View>
                    <View style={[manageInfoStyles.manageInfoBlock, globalStyles.bottom24]}>
                        <Pressable
                            onPress={pickImage}
                            style={({ pressed }) => [
                                manageInfoStyles.imagePicker,
                                pressed && manageInfoStyles.pressed,
                            ]}
                        >
                            <Ionicons name="cloud-upload-outline" size={26} color={COLORS.white} />
                            <Text style={[styles.text, { color: COLORS.white }]}>{buttonText}</Text>
                        </Pressable>
                        {showClearButton && (
                            <Pressable
                                onPress={clearImage}
                                style={({ pressed }) => [
                                    manageInfoStyles.clearImage,
                                    pressed && manageInfoStyles.pressed,
                                ]}
                            >
                                <Ionicons name="close-outline" size={26} color={COLORS.white} />
                            </Pressable>
                        )}
                    </View>
                    <Input field="firstName" errors={errors} placeholder="First name" value={firstName} onUpdateValue={(text) => setFirstName(text)} />
                    <Input field="lastName" errors={errors} placeholder="Last name" value={lastName} onUpdateValue={(text) => setLastName(text)} />
                    <Button buttonStyle={globalStyles.standardButton} text="Update" onPress={handleUpdate} />
                </View>
            }
        />
    );
}

const manageInfoStyles = StyleSheet.create({
    manageInfoBlock: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        gap: 16,
    },
    profileImage: {
        width: 72,
        height: 72,
        borderRadius: 36,
    },
    imagePicker: {
        flexDirection: "row",
        gap: 16,
        paddingTop: 8,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9999,
        opacity: 1,
        backgroundColor: COLORS.darkGrey,
    },
    clearImage: {
        padding: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 9999,
        opacity: 1,
        backgroundColor: COLORS.red,
    },
    pressed: {
        opacity: 0.7,
    },
});

export default ManageAccountInfoScreen;