import { Field } from "formik";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Eye from "../icons/Eye";

interface InputFieldProps {
    field: string;
    type: string;
    placeholder: string;
    value?: string;
    errors?: any;
}

const InputFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

const InputFieldError = styled.div`
    display: block;
    font-size: 14px;
`;

const InputFieldContainer = styled.div`
    display: block;
    position: relative;
    background-color: #b5adad;
    min-height: 60px;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 6px;
`;

const InputInfoContainer = styled.div.attrs(
    (props: { focus: boolean }) => props
)`
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: flex-start;
    height: 22px;
    margin-top: ${(props) => (props.focus ? "4px" : "19px")};
    margin-bottom: ${(props) => (props.focus ? "4px" : "0px")};
    transition: margin ease 0.2s;
`;

const LabelInputInfo = styled.label.attrs((props: { focus: boolean }) => props)`
    display: block;
    font-size: ${(props) => (props.focus ? "14px" : "16px")};
    cursor: pointer;
    transition: font-size ease 0.2s;
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    min-height: 26px;
    width: 100%;
    margin-top: 30px;
    transition: margin ease 0.2s;
    margin-bottom: 4px;
`;

const InputContainerField = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    gap: 12px;
`;

const ShowPassword = styled.div`
    display: block;
    cursor: pointer;
    padding: 2px;

    &:hover,
    &:focus {
        border-radius: 9999px;
        background-color: rgba(56, 53, 53, 0.6);
    }
`;

const InputField: FunctionComponent<InputFieldProps> = ({
    field,
    type,
    placeholder,
    value,
    errors,
}) => {
    let isPassword = false;
    const [switchedType, setSwitchedType] = useState(false);
    let showType;

    if (type === "password") {
        isPassword = true;
    }

    if (!switchedType) {
        showType = "password";
    } else {
        showType = "text";
    }

    const [isFocused, setIsFocused] = useState(false);

    const inputField = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputField !== null && inputField.current?.value !== "") {
            setIsFocused(true);
        }
    }, [isFocused]);

    return (
        <InputFieldWrapper>
            {(errors && errors[field]) ? (
                <InputFieldError>{errors[field]}</InputFieldError>
            ) : null}
            <InputFieldContainer
                onClick={() => {
                    setIsFocused(true);

                    if (inputField !== null) {
                        inputField.current?.focus();
                    }
                }}
            >
                <InputInfoContainer focus={isFocused}>
                    <LabelInputInfo htmlFor={field} focus={isFocused}>
                        {placeholder}
                    </LabelInputInfo>
                </InputInfoContainer>
                <InputContainer>
                    <InputContainerField>
                        <Field
                            id={field}
                            as={type === "textarea" ? "textarea" : "input"}
                            aria-required
                            aria-label={placeholder}
                            autoCapitalize="none"
                            spellCheck="false"
                            autoComplete="off"
                            autoCorrect="off"
                            name={field}
                            type={isPassword ? showType : type}
                            onFocus={() => {
                                setIsFocused(true);
                            }}
                            onBlur={() => {
                                setIsFocused(false);
                            }}
                            value={value}
                            innerRef={inputField}
                        />
                        {isPassword ? (
                            <ShowPassword
                                role="button"
                                onClick={() => {
                                    setSwitchedType(!switchedType);
                                }}
                            >
                                <Eye mode={switchedType} />
                            </ShowPassword>
                        ) : null}
                    </InputContainerField>
                </InputContainer>
            </InputFieldContainer>
        </InputFieldWrapper>
    );
};

export default InputField;
