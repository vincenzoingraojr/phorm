import { Form, Formik } from "formik";
import Head from "../components/Head";
import AuthLayout from "../components/layouts/AuthLayout";
import { useSignupMutation } from "../generated/graphql";
import { AuthButton, AuthForm, AuthFormContent, AuthFormTitle, AuthHalfInput, PageBlock, Status } from "../styles/global";
import { toErrorMap } from "../utils/toErrorMap";
import InputField from "../components/input/InputField";

function Signup() {
    const [signup] = useSignupMutation();

    return (
        <>
            <Head title="Sign up | Phorm" description="Sign up to Phorm." />
            <AuthLayout
                content={
                    <AuthForm>
                        <AuthFormTitle>Sign up</AuthFormTitle>
                        <Formik
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                email: "",
                                password: "",
                            }}
                            onSubmit={async (
                                values,
                                { setErrors, setStatus }
                            ) => {
                                const response = await signup({
                                    variables: values,
                                });

                                if (response && response.data && response.data.signup) {
                                    if (response.data.signup.status && response.data.signup.status.length > 0) {
                                        setStatus(response.data.signup.status);
                                    } else {
                                        setStatus(null);
                                        setErrors(
                                            toErrorMap(
                                                response.data.signup.errors!
                                            )
                                        );
                                    }
                                }
                            }}
                        >
                            {({ errors, status }) => (
                                <Form>
                                    {status ? <Status>{status}</Status> : null}
                                    <AuthFormContent>
                                        <AuthHalfInput>
                                            <InputField
                                                field="firstName"
                                                type="text"
                                                placeholder="First name"
                                                errors={errors}
                                            />
                                            <InputField
                                                field="lastName"
                                                type="text"
                                                placeholder="Last name"
                                                errors={errors}
                                            />
                                        </AuthHalfInput>
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
                                                title="Sign up"
                                                role="button"
                                                aria-label="Sign up"
                                            >
                                                Sign up
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

export default Signup;