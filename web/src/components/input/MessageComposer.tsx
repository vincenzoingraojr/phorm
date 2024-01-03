import { Field } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import Send from "../icons/Send";

interface MessageComposerProps {
    value: string;
}

const ComposerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    padding: 16px;
`;

const TextInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 12px;
    border-radius: 16px;
    height: auto;
    background-color: #aaa9a9;
    width: calc(100% - 64px);
`;

const SendButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 48px;
    height: 48px;
    border-radius: 9999px;
    background-color: #ff5c00;
    opacity: 1;
    transition: opacity ease 0.2s;
    border: none;

    &:hover,
    &:focus {
        opacity: 0.7;
    }

    &:disabled {
        cursor: auto;
        opacity: 0.5;
    }

    &:disabled:hover,
    &:disabled:focus {
        opacity: 0.5;
    }
`;

const MessageComposer: FunctionComponent<MessageComposerProps> = ({ value }) => {
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        if (/^\s+\S*/.test(value) || value === "") {
            setIsEmpty(true);
        } else {
            setIsEmpty(false);
        }
    }, [value]);
    
    return (
        <ComposerContainer>
            <TextInputContainer>
                <Field 
                    id={"content"}
                    as={"textarea"}
                    aria-required
                    aria-label={"Write something..."}
                    placeholder={"Write something..."}
                    name={"content"}
                    type={"text"}
                    value={value}
                    rows={3}
                />
            </TextInputContainer>
            <SendButton
                role="button"
                type="submit"
                title="Send message"
                aria-label="Send message"
                disabled={isEmpty}
            >
                <Send />
            </SendButton>
        </ComposerContainer>
    );
}

export default MessageComposer;