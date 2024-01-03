import styled from "styled-components";
import Head from "../../components/Head";
import ModalLoading from "../../components/utils/modal/ModalLoading";
import { MeDocument, MeQuery, User, useAuthSendVerificationEmailMutation, useEditEmailAddressMutation, useMeQuery } from "../../generated/graphql";
import { Form, Formik } from "formik";
import { AuthButton, Button, PageBlock, PageText, Status } from "../../styles/global";
import InputField from "../../components/input/InputField";
import { toErrorMap } from "../../utils/toErrorMap";
import { useState } from "react";
import ToastContainer from "../../components/utils/Toast";

const EditEmailAddressContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
`;

const EditEmailAddressForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
`;

const EditEmailAddressButton = styled(Button)`
    background-color: #ff5c00;
    color: #ffffff;
`;

const UserEmailStatus = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
`;

const EmailStatus = styled.div.attrs(
    (props: { verified: boolean }) => props
)`
    display: block;
    padding: 4px;
    color: #ffffff;
    font-size: 16px;
    border-radius: 4px;
    font-weight: 700;
    background-color: ${(props) => (props.verified ? "#30d62d" : "#d62d2d")};
`;

const EmailActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;
    padding: 16px;
    border-radius: 16px;
    background-color: #aaa9a9;
`;

const EmailActionsTitle = styled(PageText)`
    font-size: 16px;
    font-weight: 700;
`;

function EditEmailAddress() {
    const { data, loading, error } = useMeQuery({ fetchPolicy: "cache-and-network" });

    const [editEmail] = useEditEmailAddressMutation();

    const [sendEmail] = useAuthSendVerificationEmailMutation();

    const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

    const addToast = (message: string) => {
        const newToast = { id: Date.now(), message };
        setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    const removeToast = (id: number) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <>
            <Head
                title="Edit email address | Phorm"
                description="In this page you can edit your email address."
            />
            {(loading && !data) || error ? (
                <ModalLoading />
            ) : (
                <EditEmailAddressContainer>
                    <PageBlock>
                        <UserEmailStatus>
                            <PageText>
                                <b>Current email</b>
                            </PageText>
                            <EmailStatus verified={data?.me?.emailVerified}>
                                {data?.me?.emailVerified ? "Verified" : "Not verified"}
                            </EmailStatus>
                        </UserEmailStatus>
                        <PageText>{data?.me?.email}</PageText>
                    </PageBlock>
                    {!data?.me?.emailVerified && (
                        <EmailActionsContainer>
                            <EmailActionsTitle>
                                Your email address is not verified
                            </EmailActionsTitle>
                            <PageText>
                                Click the following button to receive an email with the instructions to verify your email address.
                            </PageText>
                            <AuthButton
                                type="button"
                                title="Send email"
                                role="button"
                                aria-label="Send email"
                                onClick={async () => {
                                    const response = await sendEmail();
    
                                    if (response && response.data && response.data.authSendVerificationEmail && response.data.authSendVerificationEmail.status) {
                                        addToast(response.data.authSendVerificationEmail.status);
                                    }
                                }}
                            >
                                Send email
                            </AuthButton>
                        </EmailActionsContainer>
                    )}
                    <Formik
                        initialValues={{
                            email: "",
                            confirmEmail: "",
                        }}
                        onSubmit={async (values, { setStatus, setErrors }) => {
                            const response = await editEmail({
                                variables: {
                                    email: values.email,
                                    confirmEmail: values.confirmEmail,
                                },
                                update: (
                                    store,
                                    {
                                        data,
                                    }
                                ) => {
                                    if (
                                        data && data.editEmailAddress && data.editEmailAddress.user
                                    ) {
                                        store.writeQuery<MeQuery>(
                                            {
                                                query: MeDocument,
                                                data: {
                                                    me: data
                                                        .editEmailAddress
                                                        .user as User,
                                                },
                                            }
                                        );
                                    }
                                },
                            });
                    
                            if (response && response.data && response.data.editEmailAddress) {
                                if (response.data.editEmailAddress.status) {
                                    setStatus(response.data.editEmailAddress.status);
                                } else if (response.data.editEmailAddress.errors && response.data.editEmailAddress.errors.length > 0) {
                                    setErrors(
                                        toErrorMap(response.data.editEmailAddress.errors)
                                    );
                                }
                            }
                        }}
                    >
                        {({ status, errors }) => (
                            <Form>
                                {status ? <Status>{status}</Status> : null}
                                <EditEmailAddressForm>
                                    <InputField
                                        field="email"
                                        type="email"
                                        placeholder="Email"
                                        errors={errors}
                                    />
                                    <InputField
                                        field="confirmEmail"
                                        type="email"
                                        placeholder="Confirm email"
                                        errors={errors}
                                    />
                                    <PageBlock>
                                        <EditEmailAddressButton
                                            type="submit"
                                            title="Update chat info"
                                            role="button"
                                            aria-label="Update chat info"
                                        >
                                            Update
                                        </EditEmailAddressButton>
                                    </PageBlock>
                                </EditEmailAddressForm>
                            </Form>
                        )}
                    </Formik>
                </EditEmailAddressContainer>
            )}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </>
    );
}

export default EditEmailAddress;