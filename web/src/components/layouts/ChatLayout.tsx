import { FunctionComponent, ReactNode, useState } from "react";
import styled from "styled-components";
import { devices } from "../../styles/devices";
import { ControlContainer, PageBlock, PageText } from "../../styles/global";
import Menu from "../icons/Menu";
import Search from "../icons/Search";
import More from "../icons/More";
import { useChatsQuery, useMeQuery } from "../../generated/graphql";
import profilePicture from "../../images/profile-picture.png";
import NewChat from "../icons/NewChat";
import Book from "../icons/Book";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LoadingComponent from "../utils/LoadingComponent";

interface ChatLayoutProps {
    children: ReactNode;
    composer: JSX.Element;
    headerRightComponent?: JSX.Element;
    componentRef?: any;
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
    justify-content: space-between;
    height: 100vh;
    z-index: 1000;
    background-color: #ffffff;
    width: 80%;

    @media ${devices.mobileL} {
        width: 60%;
    }

    @media ${devices.tablet} {
        display: flex;
        position: relative;
        width: 100%;
    }
`;

const NavSuperContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 80px);
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
    padding: 12px;
    flex-direction: column;
    gap: 12px;
`;

const ChatsListContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
`;

const UserBox = styled.div`
    display: flex;
    align-items: center;
    height: 80px;
    padding-left: 12px;
    padding-right: 12px;
    cursor: pointer;
    background-color: #ffffff;
    overflow: hidden;
    width: 100%;

    &:hover, &:focus {
        background-color: rgba(36, 34, 34, 0.6);
    }
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
    display: flex;
    justify-content: center;
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
    display: flex;
    justify-content: center;
    width: 100%;
    min-height: 100%;
`;

const MainHeaderContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: 16px;
    overflow: hidden;
    padding-left: 10px;
    padding-right: 10px;
`;

const MainHeaderLeftContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
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
    background-color: rgba(21, 20, 20, 0.6);

    @media ${devices.tablet} {
        display: none;
    }
`;

const NavButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 12px;
    border-radius: 12px;
    gap: 12px;
    cursor: pointer;

    &:hover, &:focus {
        background-color: #aaa9a9;
    }
`;

const SearchButton = styled(NavButton)`
    background-color: #aaa9a9;

    &:hover, &:focus {
        background-color: rgba(56, 53, 53, 0.6);
    }
`;

const UserProfile = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    width: 100%;
`;

const UserProfileInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    width: 100%;
`;

const UserImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 36px;
        height: 36px;
        border-radius: 18px;
        object-fit: cover;
        object-position: center;
    }
`;

const UserFullName = styled(PageText)`
    font-weight: 700;
    font-size: 16px;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const NoChatsAlert = styled(PageBlock)`
    padding-left: 12px;
    padding-right: 12px;
`;

const ChatsFeed = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const ChatElement = styled.div`
    display: block;
    padding: 12px;
    background-color: transparent;
    cursor: pointer;

    &:hover, &:focus {
        background-color: rgba(36, 34, 34, 0.6);
    }
`;

const MessageComposerContainer = styled.div`
    display: block;
    width: 100%;

    @media (min-width: 600px) {
        width: 520px;
    }

    @media ${devices.tablet} {
        width: 580px;
    }

    @media ${devices.laptopS} {
        width: 680px;
    }

    @media ${devices.laptopL} {
        width: 900px;
    }
`;

const ChatLayout: FunctionComponent<ChatLayoutProps> = ({ children, composer, headerRightComponent, componentRef }) => {
    const [visible, setVisible] = useState(false);
    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });

    const { data: chatsData, loading, error } = useChatsQuery({ fetchPolicy: "cache-and-network" });

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <PageContainer>
            <NavContainer visible={visible}>
                <NavSuperContainer>
                    <TopContainer>
                        <SearchButton
                            role="link"
                            aria-label="Search"
                            title="Search"
                            onClick={() => {
                                navigate("/search");
                                setVisible(false);
                            }}
                        >
                            <Search />
                            <PageText>Search</PageText>
                        </SearchButton>
                        <NavButton
                            role="link"
                            aria-label="New chat"
                            title="New Chat"
                            onClick={() => {
                                navigate("/home");
                                setVisible(false);
                            }}
                        >
                            <NewChat />
                            <PageText>
                                New chat
                            </PageText>
                        </NavButton>
                        <NavButton
                            role="link"
                            aria-label="Collection"
                            title="Collection"
                            onClick={() => {
                                navigate("/collection");
                                setVisible(false);
                            }}
                        >
                            <Book />
                            <PageText>
                                Collection
                            </PageText>
                        </NavButton>
                    </TopContainer>
                    <ChatsListContainer>
                        {(loading || error || !chatsData) ? (
                            <LoadingComponent />
                        ) : (
                            <>
                                {chatsData.chats.length === 0 ? (
                                    <NoChatsAlert>
                                        No chats found. Click "New chat" to create a new one.
                                    </NoChatsAlert>
                                ) : (
                                    <ChatsFeed>
                                        {chatsData.chats.map((chat) => (
                                            <ChatElement 
                                                key={chat.id} 
                                                role="link" 
                                                title="Navigate to this chat" 
                                                aria-label="Navigate to this chat" 
                                                onClick={() => {
                                                    navigate(`/chat/${chat.chatId}`);
                                                    setVisible(false);
                                                }}
                                            >
                                                {chat.title}
                                            </ChatElement>
                                        ))}
                                    </ChatsFeed>
                                )}
                            </>
                        )}
                    </ChatsListContainer>
                </NavSuperContainer>
                <UserBox
                    role="link"
                    aria-label="Go to the user profile"
                    title="Go to the user profile"
                    onClick={() => {
                        navigate(
                            "/account",
                            {
                                state: {
                                    backgroundLocation:
                                        location,
                                },
                            }
                        );
                        setVisible(false);
                    }}
                >
                    <UserProfile>
                        <UserProfileInfo>
                            <UserImage>
                                <img
                                    src={
                                        data?.me?.profilePicture !== "" &&
                                        data?.me?.profilePicture !== null
                                            ? data?.me?.profilePicture!
                                            : profilePicture
                                    }
                                    title={`${data?.me?.firstName}'s profile picture`}
                                    alt={`${data?.me?.firstName} ${data?.me?.lastName}`}
                                />
                            </UserImage>
                            <UserFullName>
                                {data?.me?.firstName}{" "}{data?.me?.lastName}
                            </UserFullName>
                        </UserProfileInfo>
                        <More />
                    </UserProfile>
                </UserBox>
            </NavContainer>
            <Outlet />
            {visible && (
                <NavOverlay role="link" aria-label="Close nav" onClick={() => setVisible(false)} />
            )}
            <MainContainer>
                <MainContentContainer ref={componentRef}>
                    <MainHeader>
                        <MainHeaderContainer>
                            <MainHeaderLeftContainer>
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
                            </MainHeaderLeftContainer>
                            {headerRightComponent}
                        </MainHeaderContainer>
                    </MainHeader>
                    <MainContent>
                        {children}
                    </MainContent>
                </MainContentContainer>
                <MainActionsContainer>
                    <MessageComposerContainer>
                        {composer}
                    </MessageComposerContainer>
                </MainActionsContainer>
            </MainContainer>
        </PageContainer>
    );
}

export default ChatLayout;