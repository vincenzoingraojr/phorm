import styled from "styled-components";
import Head from "../../components/Head";
import ModalLoading from "../../components/utils/modal/ModalLoading";
import { MeDocument, MeQuery, User, useEditProfileMutation, useMeQuery } from "../../generated/graphql";
import { Form, Formik } from "formik";
import { Button, ImageButtonContainer, PageBlock, SmallButton, Status } from "../../styles/global";
import { useRef, useState } from "react";
import { toErrorMap } from "../../utils/toErrorMap";
import InputField from "../../components/input/InputField";
import axios from "axios";
import profilePicture from "../../images/profile-picture.png";
import AddImage from "../../components/icons/AddImage";

const ManageInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
`;

const EditProfileButton = styled(Button)`
    background-color: #ff5c00;
    color: #ffffff;
`;

const EditProfileImageInnerContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 120px;
    border-radius: 9999px;

    img {
        width: 120px;
        height: 120px;
        border-radius: 9999px;
        opacity: 0.7;
        object-fit: cover;
        object-position: center;
    }
`;

const UploadProfileImageButton = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    z-index: 1000;

    input[type="file"] {
        position: absolute;
        width: 40px;
        height: 40px;
        visibility: hidden;
    }
`;

const RemoveImage = styled(SmallButton)`
    color: #000000;
    border: 2px solid #000000;
`;

const EditProfileImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    justify-content: center;
`;

const ManageInfoForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
`;

function ManageInfo() {
    const { data, loading, error } = useMeQuery({ fetchPolicy: "cache-and-network" });
    
    const [editProfile] = useEditProfileMutation();

    const [selectedProfilePicture, setSelectedProfilePicture] =
        useState<File | null>(null);

    const uploadProfilePictureRef = useRef<HTMLInputElement>(null);
    const profilePictureRef = useRef<HTMLImageElement>(null);
    const [deleteProfilePicture, setDeleteProfilePicture] =
        useState<boolean>(false);

    const [isProfilePictureUploaded, setIsProfilePictureUploaded] =
        useState<boolean>(false);

    return (
        <>
            <Head
                title="Manage account info | Phorm"
                description="In this page you can manage your account info."
            />
            {(loading || error || !data) ? (
                <ModalLoading />
            ) : (
                <ManageInfoContainer>
                    <EditProfileImageContainer>
                        <EditProfileImageInnerContainer>
                            <UploadProfileImageButton
                                role="button"
                                title="Upload your profile picture"
                                aria-label="Upload your profile picture"
                                onClick={() => {
                                    if (
                                        uploadProfilePictureRef.current
                                    ) {
                                        uploadProfilePictureRef.current.click();
                                    }
                                }}
                            >
                                <input
                                    type="file"
                                    name="profile-picture"
                                    ref={uploadProfilePictureRef}
                                    onChange={(event) => {
                                        let localProfilePicture = null;
                                        localProfilePicture =
                                            event.target.files![0];
                                        setSelectedProfilePicture(
                                            localProfilePicture
                                        );
                                        setDeleteProfilePicture(false);
                                        setIsProfilePictureUploaded(
                                            true
                                        );
                                        if (
                                            profilePictureRef &&
                                            profilePictureRef.current
                                        ) {
                                            profilePictureRef.current.src =
                                                URL.createObjectURL(
                                                    localProfilePicture
                                                );
                                        }
                                    }}
                                    accept="image/png , image/jpeg, image/webp"
                                />
                                <ImageButtonContainer>
                                    <AddImage />
                                </ImageButtonContainer>
                            </UploadProfileImageButton>
                            <img
                                src={
                                    data?.me?.
                                        profilePicture !== "" &&
                                    data?.me?.profilePicture !== null
                                        ? data?.me?.profilePicture
                                        : profilePicture
                                }
                                ref={profilePictureRef}
                                title={`${data?.me?.firstName} ${data?.me?.lastName}'s profile picture.`}
                                alt={`${data?.me?.firstName} ${data?.me?.lastName}`}
                            />
                        </EditProfileImageInnerContainer>
                        {selectedProfilePicture !== null ||
                        (data?.me?.profilePicture !== "" &&
                            data?.me?.profilePicture !==
                                null) ? (
                            <PageBlock>
                                <RemoveImage
                                    role="button"
                                    title="Remove image"
                                    aria-label="Remove image"
                                    onClick={() => {
                                        if (
                                            uploadProfilePictureRef &&
                                            uploadProfilePictureRef.current
                                        ) {
                                            uploadProfilePictureRef.current.value =
                                                "";
                                        }
                                        if (
                                            profilePictureRef &&
                                            profilePictureRef.current
                                        ) {
                                            profilePictureRef.current.src =
                                                profilePicture;
                                        }
                                        setSelectedProfilePicture(null);
                                        setDeleteProfilePicture(true);
                                        setIsProfilePictureUploaded(
                                            false
                                        );
                                    }}
                                >
                                    Remove image
                                </RemoveImage>
                            </PageBlock>
                        ) : null}
                    </EditProfileImageContainer>
                    <Formik
                        initialValues={{
                            profilePicture: data?.me?.profilePicture || "",
                            lastName: data?.me?.lastName || "",
                            firstName: data?.me?.firstName || "",
                        }}
                        onSubmit={async (values, { setStatus, setErrors }) => {
                            let profilePictureName = "";
                            let existingProfilePictureName = "";
                            let directory = "";

                            if (data && data.me && data.me.profilePicture && data.me.profilePicture !== "") {
                                existingProfilePictureName =
                                    data?.me?.profilePicture?.replace(
                                        `https://cdn.phormapp.com/${
                                            process.env.REACT_APP_ENV ===
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
                            
                            if (selectedProfilePicture) {
                                if (
                                    existingProfilePictureName !==
                                    ""
                                ) {
                                    await axios.delete(
                                        `${process.env.REACT_APP_STORAGE_LINK}/${
                                            process.env.REACT_APP_ENV ===
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
                                    process.env.REACT_APP_ENV ===
                                    "development"
                                        ? `local-users/${data?.me?.id}`
                                        : `users/${data?.me?.id}`;

                                let key = `${directory}/${profilePictureName}`;

                                const {
                                    url,
                                } = await fetch(
                                    `${process.env.REACT_APP_SERVER_ORIGIN}/presigned-url`,
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

                                setStatus("Uploading...");

                                const profilePictureConfig = {
                                    onUploadProgress: function(progressEvent: any) {
                                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                                        setStatus(`Uploading: ${percentCompleted}%`);
                                    },
                                    headers: {
                                        "Content-Type": "image/jpeg",
                                    },
                                };

                                await axios.put(url, selectedProfilePicture, profilePictureConfig)
                                    .then(() => {
                                        setStatus("Success!");
                                    }).catch((error) => {
                                        setStatus(`An error occurred while uploading your profile picture. Error code: ${error.code}.`);
                                    });
                            } else if (
                                data?.me
                                    ?.profilePicture !==
                                    "" &&
                                data?.me
                                    ?.profilePicture !==
                                    null &&
                                deleteProfilePicture
                            ) {
                                await axios.delete(
                                    `${process.env.REACT_APP_STORAGE_LINK}/${
                                        process.env.REACT_APP_ENV ===
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

                            setSelectedProfilePicture(null);

                            const response = await editProfile({
                                variables: {
                                    firstName: values.firstName,
                                    lastName: values.lastName,
                                    profilePicture:
                                        (!isProfilePictureUploaded &&
                                            !deleteProfilePicture &&
                                            data
                                                ?.me
                                                ?.profilePicture !==
                                                "") ||
                                                isProfilePictureUploaded
                                            ? `https://cdn.phormapp.com/${
                                                    process.env.REACT_APP_ENV ===
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
                                    setStatus(response.data.editProfile.status);
                                } else if (response.data.editProfile.errors && response.data.editProfile.errors.length > 0) {
                                    setErrors(
                                        toErrorMap(response.data.editProfile.errors)
                                    );
                                } else {
                                    setStatus("An unknown error occurred. Please try again later.");
                                }
                            }
                        }}
                    >
                        {({ status, values, errors }) => (
                            <Form>
                                {status ? <Status>{status}</Status> : null}
                                <ManageInfoForm>
                                    <InputField
                                        field="firstName"
                                        type="text"
                                        placeholder="First name"
                                        value={values.firstName}
                                        errors={errors}
                                    />
                                    <InputField
                                        field="lastName"
                                        type="text"
                                        placeholder="Last name"
                                        value={values.lastName}
                                        errors={errors}
                                    />
                                    <PageBlock>
                                        <EditProfileButton
                                            type="submit"
                                            title="Save changes"
                                            role="button"
                                            aria-label="Save changes"
                                        >
                                            Save
                                        </EditProfileButton>
                                    </PageBlock>
                                </ManageInfoForm>
                            </Form>
                        )}
                    </Formik>
                </ManageInfoContainer>
            )}
        </>
    );
}

export default ManageInfo;