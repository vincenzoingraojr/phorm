import styled from "styled-components";
import Head from "../../components/Head";
import ModalLoading from "../../components/utils/modal/ModalLoading";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { PageText } from "../../styles/global";
import profilePicture from  "../../images/profile-picture.png";
import Info from "../../components/icons/Info";
import At from "../../components/icons/At";
import Lock from "../../components/icons/Lock";
import Bin from "../../components/icons/Bin";
import { useLocation, useNavigate } from "react-router-dom";
import Help from "../../components/icons/Help";
import DocumentText from "../../components/icons/DocumentText";
import Shield from "../../components/icons/Shield";
import Documents from "../../components/icons/Documents";
import LogOut from "../../components/icons/LogOut";
import { setAccessToken } from "../../utils/token";

const AccountPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
`;

const ProfileInfo = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 16px;
    padding: 16px;
    align-items: center;
    justify-content: flex-start;
`;

const ProfileImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 42px;
        height: 42px;
        border-radius: 21px;
        object-fit: cover;
        object-position: center;
    }
`;

const ProfileName = styled(PageText)`
    font-weight: 700;
`;

const AccountPageInnerContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 16px;
`;

const AccountPageBlock = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 4px;
`;

const AccountPageBlockTitle = styled(PageText)`
    font-weight: 700;
    font-size: 16px;
    padding-top: 4px;
    padding-left: 16px;
    padding-right: 16px;
`;

const AccountPageBlockContent = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const ActionButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 16px;
    gap: 16px;
    cursor: pointer;

    &:hover, &:focus {
        background-color: #aaa9a9;
    }
`;

const ActionButtonIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ActionButtonText = styled.div`
    display: flex;
    flex-direction: column;
`;

const ActionButtonSmallText = styled(PageText)`
    font-size: 16px;
`;

const LogOutText = styled(PageText)`
    color: red;
`;

const VersionText = styled(PageText)`
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    font-size: 16px;
`;

function AccountPage() {
    const { data, loading, error } = useMeQuery({ fetchPolicy: "cache-and-network" });
    const navigate = useNavigate();
    const location = useLocation();

    const [logout, { client }] = useLogoutMutation();

    return (
        <>
            <Head
                title="Account | Phorm"
                description="In this page you can view and edit your account."
            />
            {(loading || error || !data) ? (
                <ModalLoading />
            ) : (
                <AccountPageContainer>  
                    <ProfileInfo>
                        <ProfileImage>
                            <img
                                src={
                                    data.me?.profilePicture !== "" &&
                                    data.me?.profilePicture !== null
                                        ? data.me?.profilePicture!
                                        : profilePicture
                                }
                                title={`${data.me?.firstName}'s profile picture`}
                                alt={`${data.me?.firstName} ${data.me?.lastName}`}
                            />
                        </ProfileImage>
                        <ProfileName>
                            {data.me?.firstName}{" "}{data.me?.lastName}
                        </ProfileName>
                    </ProfileInfo>
                    <AccountPageInnerContainer>
                        <AccountPageBlock>
                            <AccountPageBlockTitle>Account settings</AccountPageBlockTitle>
                            <AccountPageBlockContent>
                                <ActionButton
                                    role="link"
                                    aria-label="Manage account info"
                                    title="Manage account info"
                                    onClick={() => {
                                        navigate(
                                            "/account/settings/manage-info",
                                            {
                                                state: {
                                                    backgroundLocation:
                                                        location,
                                                },
                                            }
                                        );  
                                    }}
                                >
                                    <ActionButtonIcon>
                                        <Info />
                                    </ActionButtonIcon>
                                    <ActionButtonText>
                                        <PageText>Manage account info</PageText>
                                    </ActionButtonText>
                                </ActionButton>
                                <ActionButton
                                    role="link"
                                    aria-label="Edit email address"
                                    title="Edit email address"
                                    onClick={() => {
                                        navigate(
                                            "/account/settings/email",
                                            {
                                                state: {
                                                    backgroundLocation:
                                                        location,
                                                },
                                            }
                                        ); 
                                    }}
                                >
                                    <ActionButtonIcon>
                                        <At />
                                    </ActionButtonIcon>
                                    <ActionButtonText>
                                        <PageText>Edit email address</PageText>
                                        <ActionButtonSmallText>{data.me?.email}</ActionButtonSmallText>
                                    </ActionButtonText>
                                </ActionButton>
                                <ActionButton
                                    role="link"
                                    aria-label="Change your password"
                                    title="Change your password"
                                    onClick={() => {
                                        navigate(
                                            "/account/settings/password",
                                            {
                                                state: {
                                                    backgroundLocation:
                                                        location,
                                                },
                                            }
                                        ); 
                                    }}
                                >
                                    <ActionButtonIcon>
                                        <Lock />
                                    </ActionButtonIcon>
                                    <ActionButtonText>
                                        <PageText>Change your password</PageText>
                                    </ActionButtonText>
                                </ActionButton>
                                <ActionButton
                                    role="link"
                                    aria-label="Delete your data"
                                    title="Delete your data"
                                    onClick={() => {
                                        navigate(
                                            "/account/settings/delete-data",
                                            {
                                                state: {
                                                    backgroundLocation:
                                                        location,
                                                },
                                            }
                                        ); 
                                    }}
                                >
                                    <ActionButtonIcon>
                                        <Bin />
                                    </ActionButtonIcon>
                                    <ActionButtonText>
                                        <PageText>Delete your data</PageText>
                                    </ActionButtonText>
                                </ActionButton>
                            </AccountPageBlockContent>
                        </AccountPageBlock>
                        <AccountPageBlock>
                            <AccountPageBlockTitle>About</AccountPageBlockTitle>
                            <AccountPageBlockContent>
                                <ActionButton
                                    role="link"
                                    aria-label="Help center"
                                    title="Help center"
                                    onClick={() => {
                                        window.open("https://help.phormapp.com", "_blank");
                                    }}
                                >
                                    <ActionButtonIcon>
                                        <Help />
                                    </ActionButtonIcon>
                                    <ActionButtonText>
                                        <PageText>Help center</PageText>
                                    </ActionButtonText>
                                </ActionButton>
                                <ActionButton
                                    role="link"
                                    aria-label="Terms of use"
                                    title="Terms of use"
                                    onClick={() => {
                                        window.open("https://about.phormapp.com/tos", "_blank");
                                    }}
                                >
                                    <ActionButtonIcon>
                                        <DocumentText />
                                    </ActionButtonIcon>
                                    <ActionButtonText>
                                        <PageText>Terms of use</PageText>
                                    </ActionButtonText>
                                </ActionButton>
                                <ActionButton
                                    role="link"
                                    aria-label="Privacy policy"
                                    title="Privacy policy"
                                    onClick={() => {
                                        window.open("https://about.phormapp.com/privacy-policy", "_blank");
                                    }}
                                >
                                    <ActionButtonIcon>
                                        <Shield />
                                    </ActionButtonIcon>
                                    <ActionButtonText>
                                        <PageText>Privacy policy</PageText>
                                    </ActionButtonText>
                                </ActionButton>
                                <ActionButton
                                    role="link"
                                    aria-label="Licenses"
                                    title="Licenses"
                                    onClick={() => {
                                        window.open("https://about.phormapp.com/licenses", "_blank");   
                                    }}
                                >
                                    <ActionButtonIcon>
                                        <Documents />
                                    </ActionButtonIcon>
                                    <ActionButtonText>
                                        <PageText>Licenses</PageText>
                                    </ActionButtonText>
                                </ActionButton>
                                <ActionButton
                                    role="button"
                                    aria-label="Log out"
                                    title="Log out"
                                    onClick={async () => {
                                        await logout();
                                        setAccessToken("");
                                        await client.resetStore();
                                        navigate(0);
                                    }}
                                >
                                    <ActionButtonIcon>
                                        <LogOut />
                                    </ActionButtonIcon>
                                    <ActionButtonText>
                                        <LogOutText>Log out</LogOutText>
                                    </ActionButtonText>
                                </ActionButton>
                            </AccountPageBlockContent>
                        </AccountPageBlock>
                    </AccountPageInnerContainer>
                    <VersionText>
                        Phorm for the web, version 1.0.0
                    </VersionText>
                </AccountPageContainer>
            )}
        </>
    );
}

export default AccountPage;