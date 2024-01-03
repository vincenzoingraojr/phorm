import styled from "styled-components";
import { devices } from "./devices";
import { Link } from "react-router-dom";

export const Button = styled.button`
    display: block;
    border: none;
    background-color: inherit;
    color: inherit;
    padding: 12px 24px;
    font-weight: 700;
    border-radius: 12px;
    cursor: pointer;
`;

export const SmallButton = styled(Button)`
    padding: 6px 18px;
    border: inherit;
    background-color: transparent;
    transition: background-color ease 0.2s;

    &:hover,
    &:focus {
        background-color: rgba(56, 53, 53, 0.6);
    }
`;

export const LinkButton = styled(Link)`
    display: inline-block;
    padding: 12px 24px;
    border-radius: 12px;
    text-decoration: none;
    background-color: inherit;
    color: inherit;
    font-weight: 700;

    &:hover,
    &:active {
        text-decoration: none;
    }
`;

export const PageBlock = styled.div`
    display: block;
`;

export const PageText = styled.div`
    display: block;
    text-align: left;
`;

export const PageTextMT24 = styled(PageText)`
    margin-top: 24px;
`;

export const PageTextMB24 = styled(PageText)`
    margin-bottom: 24px;
`;

export const PageTextMT48 = styled(PageText)`
    margin-top: 48px;
`;

export const PageTextMB48 = styled(PageText)`
    margin-bottom: 48px;
`;

export const SvgIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    fill: inherit;
    stroke: inherit;

    svg {
        width: inherit;
        height: inherit;
        fill: inherit;
        stroke: inherit;
    }

    svg path {
        fill: inherit;
        stroke: inherit;
    }
`;

export const AuthForm = styled.div`
    display: block;
`;

export const AuthFormTitle = styled.div`
    display: block;
    font-weight: 700;
    margin-bottom: 48px;
    font-size: 32px;

    @media ${devices.mobileS} {
        font-size: 44px;
    }

    @media ${devices.mobileL} {
        font-size: 50px;
    }

    @media ${devices.tablet} {
        font-size: 60px;
    }
`;

export const AuthFormContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const Status = styled.div`
    display: block;
    padding: 6px;
    border-radius: 6px;
    font-size: 14px;
    background-color: #ff5c00;
    color: #ffffff;
    margin-bottom: 24px;
`;

export const AuthHalfInput = styled.div`
    display: flex;
    gap: 24px;
    flex-direction: column;
    align-items: unset;

    @media ${devices.mobileS} {
        flex-direction: column;
        align-items: unset;
    }

    @media ${devices.mobileL} {
        flex-direction: row;
        align-items: flex-end;
    }
`;

export const AuthButton = styled(Button)`
    background-color: #ff5c00;
    color: #ffffff;
`;

export const ControlContainer = styled.div.attrs(
    (props: { size?: number }) => props
)`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: ${(props) => (props.size ? `${props.size}px` : `36px`)} !important;
    height: ${(props) => (props.size ? `${props.size}px` : `36px`)} !important;
    border-radius: 9999px;
    background-color: transparent;
    transition: background-color ease 0.2s;

    &:hover,
    &:focus {
        background-color: rgba(36, 34, 34, 0.6);
    }
`;

export const PageTitle = styled.div`
    display: block;
    font-weight: 700;
    font-size: 32px;

    @media ${devices.mobileL} {
        font-size: 42px;
    }

    @media ${devices.tablet} {
        font-size: 52px;
    }

    @media ${devices.laptopS} {
        font-size: 64px;
    }
`;

export const PageBaseContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 48px;
`;

export const PageDescription = styled(PageText)`
    font-size: 20px;
    font-weight: 500;
`;

export const OptionItem = styled.div`
    display: flex;
    background-color: transparent;
    color: #000000;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    padding: 12px 16px;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    background-color: transparent;
    transition: background-color ease 0.2s;

    &:hover,
    &:focus {
        background-color: #aaa9a9;
    }
`;

export const OptionItemIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const OptionItemText = styled.div`
    display: block;
    font-weight: inherit;
`;

export const ImageButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;
    transition: background-color ease 0.2s;

    &:hover,
    &:focus {
        background-color: rgba(0, 0, 0, 0.8);
    }
`;
