import styled from "styled-components";
import Head from "../../components/Head";
import ModalLoading from "../../components/utils/modal/ModalLoading";
import { useChangePasswordMutation, useMeQuery } from "../../generated/graphql";
import InputField from "../../components/input/InputField";
import { Button, PageBlock, Status } from "../../styles/global";
import { Form, Formik } from "formik";
import { toErrorMap } from "../../utils/toErrorMap";

const ChangePasswordContainer = styled.div`
    display: block;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
`;

const ChangePasswordForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
`;

const ChangePasswordButton = styled(Button)`
    background-color: #ff5c00;
    color: #ffffff;
`;

function ChangePassword() {
    const { data, loading, error } = useMeQuery({ fetchPolicy: "cache-and-network" });

    const [changePassword] = useChangePasswordMutation();

    return (
        <>
            <Head
                title="Change your password | Phorm"
                description="In this page you can change your password."
            />
            {(loading && !data) || error ? (
                <ModalLoading />
            ) : (
                <ChangePasswordContainer>
                    <Formik
                        initialValues={{
                            currentPassword: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        onSubmit={async (values, { setStatus, setErrors }) => {
                            const response = await changePassword({
                                variables: values,
                            });
                    
                            if (response && response.data && response.data.changePassword) {
                                if (response.data.changePassword.status) {
                                    setStatus(response.data.changePassword.status);
                                } else if (response.data.changePassword.errors && response.data.changePassword.errors.length > 0) {
                                    setErrors(
                                        toErrorMap(response.data.changePassword.errors)
                                    );
                                }
                            }
                        }}
                    >
                        {({ status, errors }) => (
                            <Form>
                                {status ? <Status>{status}</Status> : null}
                                <ChangePasswordForm>
                                    <InputField
                                        field="currentPassword"
                                        type="password"
                                        placeholder="Current password"
                                        errors={errors}
                                    />
                                    <InputField
                                        field="password"
                                        type="password"
                                        placeholder="Password"
                                        errors={errors}
                                    />
                                    <InputField
                                        field="confirmPassword"
                                        type="password"
                                        placeholder="Confirm password"
                                        errors={errors}
                                    />
                                    <PageBlock>
                                        <ChangePasswordButton
                                            type="submit"
                                            title="Update password"
                                            role="button"
                                            aria-label="Update password"
                                        >
                                            Update
                                        </ChangePasswordButton>
                                    </PageBlock>
                                </ChangePasswordForm>
                            </Form>
                        )}
                    </Formik>
                </ChangePasswordContainer>
            )}
        </>
    );
}

export default ChangePassword;