import Head from "../components/Head";
import ChatLayout from "../components/layouts/ChatLayout";
import Logo from "../components/icons/Logo";
import styled from "styled-components";
import MessageComposer from "../components/input/MessageComposer";
import { Form, Formik } from "formik";
import ToastContainer from "../components/utils/Toast";
import { ChatsDocument, ChatsQuery, useChatsQuery, useCreateChatMutation } from "../generated/graphql";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

function HomePage() {
    const [createChat] = useCreateChatMutation();
    const navigate = useNavigate();
    const { data } = useChatsQuery({ fetchPolicy: "cache-and-network" });

    const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);

    const addToast = (message: string) => {
        const newToast = { id: Date.now(), message };
        setToasts((prevToasts) => [...prevToasts, newToast]);
    };

    const removeToast = (id: number) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <>
            <Head
                title="Home | Phorm"
                description="Your scientific AI chatbot."
            />
            <ChatLayout
                composer={
                    <Formik
                        initialValues={{
                            content: "",
                            type: "default",
                        }}
                        onSubmit={async (
                            values,
                        ) => {
                            const response = await createChat({
                                variables: {
                                    content: values.content,
                                    type: values.type,
                                },
                                update: (store, { data: newChatData }) => {
                                    if (newChatData && newChatData.createChat && newChatData.createChat.chat && data && data.chats) {
                                        store.writeQuery<ChatsQuery>({
                                            query: ChatsDocument,
                                            data: {
                                                chats: [newChatData.createChat.chat, ...(data.chats || [])],
                                            },
                                        });
                                    }
                                },
                            });

                            if (response.data && response.data.createChat && response.data.createChat.status && response.data.createChat.status !== "") {
                                addToast(response.data.createChat.status);
                            }
                    
                            if (response.data && response.data.createChat && response.data.createChat.chat) {
                                navigate(`/chat/${response.data.createChat.chat.chatId}`);
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
            >
                <LogoContainer>
                    <Logo type="index-logo" />
                </LogoContainer>
            </ChatLayout>
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </>
    );
}

export default HomePage;
