import styled from "styled-components";
import Head from "../../components/Head";
import ModalLoading from "../../components/utils/modal/ModalLoading";
import { useDeleteAccountMutation, useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { Button, PageBlock, PageText } from "../../styles/global";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../../utils/token";

const DeleteDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 24px;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
`;

const DeleteDataButton = styled(Button)`
    background-color: red;
    color: #ffffff;
`;

const DeleteBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

function DeleteData() {
    const { data, loading, error } = useMeQuery({ fetchPolicy: "cache-and-network" });

    const [deleteData] = useDeleteAccountMutation();
    const [logout, { client }] = useLogoutMutation();
    const navigate = useNavigate();

    return (
        <>
            <Head
                title="Delete your account | Phorm"
                description="In this page you can delete your account."
            />
            {(loading && !data) || error ? (
                <ModalLoading />
            ) : (
                <DeleteDataContainer>
                    <DeleteBlock>
                        <PageText><b>Delete all of your data</b></PageText>
                        <PageText>
                            By clicking the following button, all of your data stored on this platform will be permanently deleted. There's no going back.
                        </PageText>
                    </DeleteBlock>
                    <PageBlock>
                        <DeleteDataButton
                            type="button"
                            title="Delete your account"
                            role="button"
                            aria-label="Delete your account"
                            onClick={async () => {
                                const response = await deleteData();

                                if (response && response.data && response.data.deleteAccount) {
                                    await logout();
                                    setAccessToken("");
                                    await client.resetStore();
                                    navigate(0);
                                }
                            }}
                        >
                            Delete
                        </DeleteDataButton>
                    </PageBlock>
                </DeleteDataContainer>
            )}
        </>
    );
}

export default DeleteData;