import styled from "styled-components";
import {
    Button,
    PageBlock,
    PageTextMB24,
    Status,
} from "../../styles/global";
import {
    useMeQuery,
    useVerifyEmailAddressMutation,
} from "../../generated/graphql";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import jwtDecode, { JwtHeader, JwtPayload } from "jwt-decode";
import Head from "../../components/Head";
import ModalLoading from "../../components/utils/modal/ModalLoading";
import { Form, Formik } from "formik";

const VerifyEmailAddressContainer = styled.div`
    display: block;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
`;

const VerifyEmailAddressButton = styled(Button)`
    background-color: #ff5c00;
    color: #ffffff;
`;

function VerifyEmailAddress() {
    const { data, loading, error } = useMeQuery({
        fetchPolicy: "network-only",
    });

    const navigate = useNavigate();
    const params = useParams();

    const [verifyEmail] = useVerifyEmailAddressMutation();

    useEffect(() => {
        try {
            const header = jwtDecode<JwtHeader>(params.token!);
            const payload = jwtDecode<JwtPayload>(params.token!);
            if (header && payload) {
                console.log("Valid JWT token");
            }
        } catch (error) {
            navigate("/");
        }
    }, [navigate, params.token]);

    return (
        <>
            <Head
                title="Verify your email address | Phorm"
                description="In this page you can verify your email address."
            />
            {(loading && !data) || error ? (
                <ModalLoading />
            ) : (
                <VerifyEmailAddressContainer>
                    <PageTextMB24>
                        Verify the email address linked to your account.
                    </PageTextMB24>
                    <Formik
                        initialValues={{
                            token: params.token!,
                        }}
                        onSubmit={async (values, { setStatus }) => {
                            const response = await verifyEmail({
                                variables: values,
                            });

                            const { exp } = jwtDecode<JwtPayload>(
                                params.token!
                            );

                            if (Date.now() >= exp! * 1000) {
                                setStatus(
                                    "Your token is expired. Please repeat the email address verification."
                                );
                            } else {
                                setStatus(
                                    response?.data?.verifyEmailAddress.status
                                );
                            }
                        }}
                    >
                        {({ status }) => (
                            <Form>
                                {status ? <Status>{status}</Status> : null}
                                <PageBlock>
                                    <VerifyEmailAddressButton
                                        type="submit"
                                        title="Verify email address"
                                        role="button"
                                        aria-label="Verify email address"
                                    >
                                        Verify email address
                                    </VerifyEmailAddressButton>
                                </PageBlock>
                            </Form>
                        )}
                    </Formik>
                </VerifyEmailAddressContainer>
            )}
        </>
    );
}

export default VerifyEmailAddress;
