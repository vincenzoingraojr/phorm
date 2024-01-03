import { FunctionComponent } from "react";
import { PageText } from "../../../styles/global";
import Logo from "../../icons/Logo";
import { useMeQuery } from "../../../generated/graphql";
import profilePicture from "../../../images/profile-picture.png";
import styled from "styled-components";

interface MessageProps {
    message: any;
}

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
`;

const MessageAuthorInfo = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 12px;
`;

const AuthorImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 28px;
        height: 28px;
        border-radius: 14px;
        object-fit: cover;
        object-position: center;
    }
`;

const AuthorName = styled.div`
    display: block;
    font-weight: 700;
    font-size: 16px;
`;

const MessageContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Message: FunctionComponent<MessageProps> = ({ message }) => {
    const { data } = useMeQuery({ fetchPolicy: "cache-and-network" });

    return (
        <MessageContainer>
            <MessageAuthorInfo>
                {message.fromUser ? (
                    <AuthorImage>
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
                    </AuthorImage>
                ) : (
                    <Logo type="small" />
                )}
                <AuthorName>
                    {message.fromUser ? `${data?.me?.firstName} ${data?.me?.lastName}` : "Phorm"}
                </AuthorName>
            </MessageAuthorInfo>
            <MessageContentContainer>
                <PageText>{message.content}</PageText>
            </MessageContentContainer>
        </MessageContainer>
    );
}

export default Message;