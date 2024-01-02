import { FunctionComponent, ReactNode, useState } from "react";
import styled from "styled-components";
import { devices } from "../../styles/devices";
import { ControlContainer } from "../../styles/global";
import Menu from "../icons/Menu";

interface ChatLayoutProps {
    children: ReactNode;
}

const PageContainer = styled.div`
    display: grid;
    grid-template-columns: none;
    grid-template-rows: auto;
    width: 100%;
    height: 100vh;

    @media ${devices.tablet} {
        grid-template-columns: 22% auto;
        grid-template-rows: none;
        width: auto;
    }

    @media ${devices.laptopS} {
        grid-template-columns: 20% auto;
        width: auto;
    }
`;

const NavContainer = styled.nav.attrs(
    (props: { visible: boolean }) => props
)`
    display: ${(props) => props.visible ? "flex" : "none"};
    position: absolute;
    flex-direction: column;
    height: 100vh;
    z-index: 1000;
    background-color: #ffffff;
    width: 80%;

    @media ${devices.tablet} {
        display: flex;
        position: relative;
        width: 100%;
    }
`;

const MainContainer = styled.main`
    display: grid;
    width: 100%;
    height: 100vh;
    grid-template-rows: auto min-content;
    grid-template-columns: 100%;
`;

const TopContainer = styled.div`
    display: flex;
    padding: 16px;
    flex-direction: column;
    gap: 16px;
`;

const ChatsListContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
`;

const UserBox = styled.div`
    display: block;
    padding: 16px;
`;

const MainContentContainer = styled.div`
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 60px auto;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
`;

const MainActionsContainer = styled.div`
    display: block;
    position: sticky;
    width: 100%;
    height: fit-content;
    background-color: #ffffff;
    z-index: 10;
    bottom: 0;
`;

const MainHeader = styled.div`
    display: grid;
    align-items: center;
    height: 60px;
    position: sticky;
    top: 0;
    width: 100%;
    overflow: hidden;
    background-color: #ffffff;
    z-index: 10;
`;

const MainContent = styled.div`
    display: block;
    width: 100%;
    min-height: 100%;
`;

const MainHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    gap: 16px;
    overflow: hidden;
    padding-left: 10px;
    padding-right: 10px;
`;

const SidebarButton = styled(ControlContainer)`
    display: flex;

    @media ${devices.tablet} {
        display: none;
    }
`;

const MainHeaderTitle = styled.div`
    display: block;
    font-weight: 700;
    width: auto;
    padding-left: 0px;
    padding-right: 0px;

    @media ${devices.tablet} {
        padding-left: 6px;
        padding-right: 6px;
        width: 100%;
    }
`;

const NavOverlay = styled.div`
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(56, 53, 53, 0.6);

    @media ${devices.tablet} {
        display: none;
    }
`;

const ChatLayout: FunctionComponent<ChatLayoutProps> = ({ children }) => {
    const [visible, setVisible] = useState(false);

    return (
        <PageContainer>
            <NavContainer visible={visible}>
                <TopContainer>
                    Search<br />
                    New chat
                </TopContainer>
                <ChatsListContainer>
                    Chats
                </ChatsListContainer>
                <UserBox>
                    User
                </UserBox>
            </NavContainer>
            {visible && (
                <NavOverlay role="link" aria-label="Close nav" onClick={() => setVisible(false)} />
            )}
            <MainContainer>
                <MainContentContainer>
                    <MainHeader>
                        <MainHeaderContainer>
                            <SidebarButton
                                title="Open sidebar"
                                role="button"
                                aria-label="Open sidebar"
                                onClick={() => {
                                    setVisible(true);
                                }}
                            >
                                <Menu />
                            </SidebarButton>
                            <MainHeaderTitle>
                                Phorm
                            </MainHeaderTitle>
                        </MainHeaderContainer>
                    </MainHeader>
                    <MainContent>
                        {children}
                    </MainContent>
                </MainContentContainer>
                <MainActionsContainer>
                    Compose
                </MainActionsContainer>
            </MainContainer>
        </PageContainer>
    );
}

export default ChatLayout;