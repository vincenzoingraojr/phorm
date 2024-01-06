import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PageText } from "../../styles/global";
import { useLatestMessageOrEventQuery } from "../../generated/graphql";

interface ChatResultProps {
    chat: any;
}

const ChatResultComponent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 4px;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 12px;
    background-color: transparent;
    cursor: pointer;

    &:hover, &:focus {
        background-color: rgba(56, 53, 53, 0.6);
    }
`;

const ChatResult: FunctionComponent<ChatResultProps> = ({ chat }) => {
    const navigate = useNavigate();
    const { data } = useLatestMessageOrEventQuery({ variables: { chatId: chat.chatId }, fetchPolicy: "cache-and-network" });

    return (
        <ChatResultComponent 
            role="link" 
            title="Navigate to this chat" 
            aria-label="Navigate to this chat" 
            onClick={() => {
                navigate(`/chat/${chat.chatId}`);
            }}
        >
            <PageText>
                {chat.title}
            </PageText>
            <PageText>
                {(data && data.latestMessageOrEvent) && (
                    <>
                        {data.latestMessageOrEvent.__typename === "Message" ? (
                            <>{data.latestMessageOrEvent.content}</>
                        ) : (data.latestMessageOrEvent.__typename === "Event" && (
                            <>{data.latestMessageOrEvent.eventMessage}</>
                        ))}
                    </>
                )}
            </PageText>
        </ChatResultComponent>
    );
}

export default ChatResult;