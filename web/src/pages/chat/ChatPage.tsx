import Head from "../../components/Head";
import ChatLayout from "../../components/layouts/ChatLayout";
import styled from "styled-components";
import MessageComposer from "../../components/input/MessageComposer";
import { Form, Formik } from "formik";
import { ChatsDocument, ChatsQuery, useChatsQuery, useDeleteChatMutation, useFindChatQuery, useMeQuery, useMessagesAndEventsQuery, useNewMessageOrEventSubscription, useSendMessageMutation } from "../../generated/graphql";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../components/utils/LoadingComponent";
import { MenuOptions } from "../../components/MenuOptions";
import More from "../../components/icons/More";
import { OptionItem, OptionItemIcon, OptionItemText, PageBlock } from "../../styles/global";
import Bin from "../../components/icons/Bin";
import Pencil from "../../components/icons/Pencil";
import Message from "../../components/layouts/items/Message";
import Event from "../../components/layouts/items/Event";
import { devices } from "../../styles/devices";

const MessagesAndEventsFeed = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-top: 16px;
    padding-left: 32px;
    padding-right: 32px;
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

function ChatPage() {
    const params = useParams();
    const [sendMessage] = useSendMessageMutation();
    const navigate = useNavigate();
    const location = useLocation();

    const { data } = useChatsQuery({ fetchPolicy: "cache-and-network" });
    const { data: meData } = useMeQuery({ fetchPolicy: "cache-and-network" });
    const { data: chatData, loading, error } = useMessagesAndEventsQuery({ variables: { chatId: params.chatId }, fetchPolicy: "cache-and-network" });

    const { data: newMessageData } = useNewMessageOrEventSubscription({ variables: { chatId: params.chatId, userId: meData?.me?.id } });

    const [items, setItems] = useState(chatData?.messagesAndEvents || []);
    const { data: currentChatData } = useFindChatQuery({ variables: { chatId: params.chatId }, fetchPolicy: "cache-and-network" });

    useEffect(() => {
        if (!loading && !chatData) {
            navigate("/home");
        }
    }, [navigate, loading, chatData]);

    useEffect(() => {
        if (chatData && chatData.messagesAndEvents) {
            setItems(chatData.messagesAndEvents);
        }

        return () => {
            setItems([]);
        }
    }, [chatData]);

    useEffect(() => {
        if (newMessageData && newMessageData.newMessageOrEvent) {
            setItems((previousData: any) => [
                ...previousData,
                newMessageData.newMessageOrEvent,
            ]);
        }
    }, [newMessageData]);

    const [activeOptionsMenu, setActiveOptionsMenu] = useState<number | null>(
        null
    );

    const handleOptionsMenuClick = (index: number) => {
        setActiveOptionsMenu(activeOptionsMenu === index ? null : index);
    };

    const [deleteChat] = useDeleteChatMutation();

    return (
        <>
            <Head
                title="Chat | Phorm"
                description="This page displays a Phorm chat."
            />
            <ChatLayout
                composer={
                    <Formik
                        initialValues={{
                            chatId: params.chatId,
                            content: "",
                            type: "default",
                        }}
                        onSubmit={async (
                            values, { setValues }
                        ) => {
                            const response = await sendMessage({
                                variables: {
                                    chatId: params.chatId as string,
                                    content: values.content,
                                    type: values.type,
                                },
                            });

                            if (response && response.data && response.data.sendMessage) {
                                setValues({ chatId: params.chatId, content: "", type: "default" });
                            }
                        }}
                    >
                        {({ values }) => (
                            <Form>
                                <MessageComposer value={values.content} />
                            </Form>
                        )}
                    </Formik>
                }
                headerRightComponent={
                    <MenuOptions 
                        key={currentChatData?.findChat?.id}
                        title="Options"
                        isOpen={activeOptionsMenu === currentChatData?.findChat?.id}
                        toggleOptions={() =>
                            handleOptionsMenuClick(currentChatData?.findChat?.id as number)
                        }
                        icon={<More />}
                        children={
                            <>
                                <OptionItem
                                    role="menuitem"
                                    title="Edit chat info"
                                    aria-label="Edit chat info"
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        navigate(
                                            "/edit-chat/" +
                                                params.chatId,
                                            {
                                                state: {
                                                    backgroundLocation:
                                                        location,
                                                },
                                            }
                                        );
                                    }}
                                >
                                    <OptionItemIcon>
                                        <Pencil />
                                    </OptionItemIcon>
                                    <OptionItemText>
                                        Edit chat info
                                    </OptionItemText>
                                </OptionItem>
                                <OptionItem
                                    role="menuitem"
                                    title="Delete chat"
                                    aria-label="Delete chat"
                                    onClick={async (e) => {
                                        e.stopPropagation();

                                        await deleteChat({
                                            variables: {
                                                chatId: params.chatId as string,
                                            },
                                            update: (store, { data: deleteChatData }) => {
                                                if (deleteChatData && deleteChatData.deleteChat && data && data.chats) {
                                                    const chatsData = [...data.chats];
                                                    const remainingChats = chatsData.filter((chat) => chat.chatId !== params.chatId);
                    
                                                    store.writeQuery<ChatsQuery>({
                                                        query: ChatsDocument,
                                                        data: {
                                                            chats: remainingChats,
                                                        },
                                                    });
                                                }
                                            },
                                        });

                                        navigate("/home");
                                    }}
                                >
                                    <OptionItemIcon>
                                        <Bin />
                                    </OptionItemIcon>
                                    <OptionItemText>
                                        Delete chat
                                    </OptionItemText>
                                </OptionItem>
                            </>
                        }
                    />
                }
            >
                {(loading || error || !chatData) ? (
                    <LoadingComponent />
                ) : (
                    <MessagesAndEventsFeed>
                        {items.map((item) => (
                            <PageBlock key={item.__typename === "Message" ? item.messageId : (item.__typename === "Event" ? item.id : null)}>
                                {item.__typename === "Message" ? (
                                    <Message message={item} />
                                ) : (
                                    <>
                                        {item.__typename === "Event" && (
                                            <Event event={item} />
                                        )}
                                    </>
                                )}
                            </PageBlock>
                        ))}
                    </MessagesAndEventsFeed>
                )}
            </ChatLayout>
        </>
    );
}

export default ChatPage;