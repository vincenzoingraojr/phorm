import styled from "styled-components";
import Head from "../components/Head";
import { PageLayout } from "../components/layouts/PageLayout";
import { PageContentLayout } from "../components/layouts/sublayouts/PageContentLayout";
import { LinkButton, PageBaseContainer, PageBlock, PageText, PageTitle } from "../styles/global";

const PageFlex = styled(PageBlock)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 24px;
`;

const AuthLinkButton = styled(LinkButton)`
    :first-child {
        background-color: #ff5c00;
        color: #ffffff;
    }

    :last-child {
        background-color: #000000;
        color: #ffffff;
    }
`;


function Authentication() {
    return (
        <>
            <Head title="Phorm" description="Your scientific AI chatbot." />
            <PageLayout 
                children={
                    <PageContentLayout 
                        children={
                            <PageBaseContainer>
                                <PageTitle>Phorm</PageTitle>
                                <PageText>
                                    AI-driven solutions for scientific problem-solving, empowering researchers, and making science accessible to everyone.
                                </PageText>
                                <PageFlex>
                                    <AuthLinkButton
                                        to="/login"
                                        title="Log in"
                                        aria-label="Log in"
                                    >
                                        Log in
                                    </AuthLinkButton>
                                    <AuthLinkButton
                                        to="/signup"
                                        title="Sign up"
                                        aria-label="Sign up"
                                    >
                                        Sign up
                                    </AuthLinkButton>
                                </PageFlex>
                            </PageBaseContainer>
                        }
                    />
                }   
            />
        </>
    );
}

export default Authentication;
