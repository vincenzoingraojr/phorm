import styled from "styled-components";
import {
    Button,
    PageBlock,
    PageTextMB24,
    Status,
} from "../../styles/global";
import {
    ChatsDocument,
    ChatsQuery,
    useChatsQuery,
    useEditChatInfoMutation,
    useFindChatQuery,
} from "../../generated/graphql";
import { useParams } from "react-router-dom";
import Head from "../../components/Head";
import ModalLoading from "../../components/utils/modal/ModalLoading";
import { Form, Formik } from "formik";
import InputField from "../../components/input/InputField";

const EditChatInfoContainer = styled.div`
    display: block;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
`;

const EditChatForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
`;

const EditChatInfoButton = styled(Button)`
    background-color: #ff5c00;
    color: #ffffff;
`;

function EditChatInfo() {
    const params = useParams();
    const { data: chatdata, loading, error } = useFindChatQuery({ variables: { chatId: params.chatId }, fetchPolicy: "cache-and-network" });
    const [updateChat] = useEditChatInfoMutation();

    const { data } = useChatsQuery({ fetchPolicy: "cache-and-network" });

    return (
        <>
            <Head
                title="Edit chat info | Phorm"
                description="In this page you can edit the information related to this chat."
            />
            {(loading && !chatdata) || error ? (
                <ModalLoading />
            ) : (
                <EditChatInfoContainer>
                    <PageTextMB24>
                        Edit the information related to this chat.
                    </PageTextMB24>
                    <Formik
                        initialValues={{
                            chatId: params.chatId,
                            title: chatdata?.findChat?.title || "",
                        }}
                        onSubmit={async (values, { setStatus }) => {
                            const response = await updateChat({
                                variables: {
                                    title: values.title,
                                    chatId: params.chatId as string,
                                },
                                update: (store, { data: editedChatData }) => {
                                    if (editedChatData && editedChatData.editChatInfo && editedChatData.editChatInfo.chat && data && data.chats) {
                                        const chatsData = data.chats.filter((chat) => chat.chatId !== params.chatId);
                    
                                        store.writeQuery<ChatsQuery>({
                                            query: ChatsDocument,
                                            data: {
                                                chats: [editedChatData.editChatInfo.chat, ...chatsData],
                                            },
                                        });
                                    }
                                },
                            });
                    
                            if (response.data && response.data.editChatInfo && response.data.editChatInfo.status) {
                                setStatus(response.data.editChatInfo.status);
                            }
                        }}
                    >
                        {({ status, values }) => (
                            <Form>
                                {status ? <Status>{status}</Status> : null}
                                <EditChatForm>
                                    <InputField
                                        field="title"
                                        type="text"
                                        placeholder="Title"
                                        value={values.title}
                                    />
                                    <PageBlock>
                                        <EditChatInfoButton
                                            type="submit"
                                            title="Update chat info"
                                            role="button"
                                            aria-label="Update chat info"
                                        >
                                            Update
                                        </EditChatInfoButton>
                                    </PageBlock>
                                </EditChatForm>
                            </Form>
                        )}
                    </Formik>
                </EditChatInfoContainer>
            )}
        </>
    );
}

export default EditChatInfo;
