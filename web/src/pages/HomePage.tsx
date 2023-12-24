import { useNavigate } from "react-router-dom";
import Head from "../components/Head";
import { PageLayout } from "../components/layouts/PageLayout";
import { PageContentLayout } from "../components/layouts/sublayouts/PageContentLayout";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Button, PageBaseContainer, PageBlock, PageText, PageTitle } from "../styles/global";
import styled from "styled-components";
import { setAccessToken } from "../utils/token";

const LogoutButton = styled(Button)`
    background-color: red;
    color: #ffffff;
`;

function HomePage() {
    const { data } = useMeQuery({
        fetchPolicy: "network-only",
    });

    const navigate = useNavigate();

    const [logout, { client }] = useLogoutMutation();

    return (
        <>
            <Head
                title="Home | Phorm"
                description="Your scientific AI chatbot."
            />
            <PageLayout
                children={
                    <PageContentLayout 
                        children={
                            <PageBaseContainer>
                                <PageTitle>Welcome, {data?.me?.firstName}</PageTitle>
                                <PageText>
                                    You're <b>logged in</b>, but you can always log out.
                                </PageText>
                                <PageBlock>
                                    <LogoutButton
                                        type="button"
                                        title="Log out"
                                        role="button"
                                        aria-label="Log out"
                                        onClick={async () => {
                                            await logout();
                                            setAccessToken("");
                                            await client.resetStore();
                                            navigate(0);
                                        }}
                                    >
                                        Log out
                                    </LogoutButton>
                                </PageBlock>
                            </PageBaseContainer>
                        }
                    />
                }
            />
        </>
    );
}

export default HomePage;
