import styled from "styled-components";
import Head from "../components/Head";
import ModalLoading from "../components/utils/modal/ModalLoading";
import { useChatsQuery } from "../generated/graphql";
import { useState } from "react";
import { PageText } from "../styles/global";
import ChatResult from "../components/utils/ChatResult";
import Search from "../components/icons/Search";
import Close from "../components/icons/Close";

const SearchPageContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 100%;
    grid-template-rows: 74px auto;
    padding-bottom: 16px;
`;

const SearchPageHeader = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 12px;
    position: sticky;
    top: 60px;
    width: 100%;
    background-color: #ffffff;
`;

const SearchPageContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const SearchBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
`;

const SearchBoxHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    height: 50px;
    background-color: #b5adad;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 12px;
`;

const SearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const CloseButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 9999px;
    background-color: #ff5c00;
    cursor: pointer;
`;

const NoResultsText = styled(PageText)`
    padding-left: 16px;
    padding-right: 16px;
`;

function SearchPage() {
    const { data, loading, error } = useChatsQuery({ fetchPolicy: "cache-and-network" });
    const [value, setValue] = useState("");

    const emptyQuery = "";

    const [state, setState] = useState({
        filteredData: [] as any,
        query: emptyQuery,
    });

    function handleInputChange(searchQuery: string) {
        const query = searchQuery;
        const dataItems = data?.chats || [];

        const filteredData = dataItems.filter((dataItem: any) => {
            let content = "";

            const results = [...dataItem.events, ...dataItem.messages];
            
            results.sort((a, b) => new Date(parseInt(a.createdAt)).getTime() - new Date(parseInt(b.createdAt)).getTime());
            
            const result = results[results.length - 1];

            if (result.__typename === "Message") {
                content = result.content;
            } else {
                content = result.eventMessage;
            }
            
            return (
                dataItem.title
                    .toLowerCase()
                    .includes(query.toLowerCase()) || 
                content
                    .toLowerCase()
                    .includes(query.toLowerCase())
            ); 
        });

        setState({
            filteredData,
            query,
        });
    }

    const { filteredData, query } = state;
    const hasSearchResults = filteredData && query !== emptyQuery;
    const dataItems = hasSearchResults ? filteredData : (data ? data.chats : []);
    const noResults = query !== emptyQuery && dataItems.length === 0;

    return (
        <>
            <Head
                title="Search | Phorm"
                description="In this page you can search for a chat."
            />
            {(loading || error || !data) ? (
                <ModalLoading />
            ) : (
                <SearchPageContainer>
                    <SearchPageHeader>
                        <SearchBoxContainer>
                            <SearchBoxHeader>
                                <Search />
                                <SearchInputContainer>
                                    <input
                                        type="search"
                                        autoCapitalize="none"
                                        spellCheck="false"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        aria-required
                                        id="search-input"
                                        name="search-input"
                                        placeholder="Search"
                                        aria-label="Search"
                                        value={value}
                                        onChange={(e) => {
                                            setValue(e.target.value);
                                            handleInputChange(e.target.value);
                                        }}
                                    />
                                </SearchInputContainer>
                                {value ? (
                                    <CloseButtonContainer
                                        role="button"
                                        tabIndex={0}
                                        title="Clear search input"
                                        aria-label="Clear search input"
                                        onMouseDown={() => {
                                            setValue("");
                                            handleInputChange("");
                                        }}
                                    >
                                        <Close type="small" />
                                    </CloseButtonContainer>
                                ) : null}
                            </SearchBoxHeader>
                        </SearchBoxContainer>
                    </SearchPageHeader>
                    <SearchPageContent>
                        {noResults ? (
                            <NoResultsText>No results for "{query}".</NoResultsText>
                        ) : (
                            <>
                                {dataItems.map((chat: any) => {
                                    return (
                                        <ChatResult key={chat.id} chat={chat} />
                                    );
                                })} 
                            </>
                        )}
                    </SearchPageContent>
                </SearchPageContainer>
            )}         
        </>
    );
}

export default SearchPage;
