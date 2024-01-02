import { Form, Formik } from "formik";
import Head from "../components/Head";
import AuthLayout from "../components/layouts/AuthLayout";
import { MeDocument, MeQuery, User, useLoginMutation } from "../generated/graphql";
import { AuthButton, AuthForm, AuthFormContent, AuthFormTitle, PageBlock, Status } from "../styles/global";
import { setAccessToken } from "../utils/token";
import { toErrorMap } from "../utils/toErrorMap";
import { useNavigate } from "react-router-dom";
import InputField from "../components/input/InputField";

function Login() {
    const [login] = useLoginMutation();
    const navigate = useNavigate();

    return (
        <>
            <Head title="Log in | Phorm" description="Log in to Phorm." />
            <AuthLayout
                content={
                    <AuthForm>
                        <AuthFormTitle>Log in</AuthFormTitle>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            onSubmit={async (
                                values,
                                { setErrors, setStatus }
                            ) => {
                                const response = await login({
                                    variables: {
                                        email: values.email,
                                        password: values.password,
                                        
                                    },
                                    update: (store, { data }) => {
                                        if (data && data.login && data.login.user) {
                                            store.writeQuery<MeQuery>({
                                                query: MeDocument,
                                                data: {
                                                    me: data.login.user as User,
                                                },
                                            });
                                        }
                                    },
                                });

                                if (response && response.data && response.data.login) {
                                    if (
                                        response.data.login.user &&
                                        response.data.login.accessToken
                                    ) {
                                        setAccessToken(
                                            response.data.login.accessToken
                                        );
                                        setStatus(response.data.login.status);
                                        navigate(0);
                                    } else {
                                        if (response.data.login.status) {
                                            setStatus(response.data.login.status);
                                        } else {
                                            setStatus(null);
                                            setErrors(
                                                toErrorMap(
                                                    response.data.login.errors!
                                                )
                                            );
                                        }
                                    }
                                }
                            }}
                        >
                            {({ errors, status }) => (
                                <Form>
                                    {status ? <Status>{status}</Status> : null}
                                    <AuthFormContent>
                                        <InputField
                                            field="email"
                                            type="email"
                                            placeholder="Email"
                                            errors={errors}
                                        />
                                        <InputField
                                            field="password"
                                            type="password"
                                            placeholder="Password"
                                            errors={errors}
                                        />
                                        <PageBlock>
                                            <AuthButton
                                                type="submit"
                                                title="Log in"
                                                role="button"
                                                aria-label="Log in"
                                            >
                                                Log in
                                            </AuthButton>
                                        </PageBlock>
                                    </AuthFormContent>
                                </Form>
                            )}
                        </Formik>
                    </AuthForm>
                }
            />
        </>
    );
}

export default Login;