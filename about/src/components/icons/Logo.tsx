import { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

export interface LogoProps {
    type: "index-logo" | "small" | "default";
}

const LogoContainer = styled(SvgIcon).attrs(
    (props: { size: number }) => props
)`
    width: ${(props) => (props.size && `${props.size}px`)};
    height: ${(props) => (props.size && `${props.size}px`)};
    fill: #FF5C00;
    stroke: none;
`;

const Logo: FunctionComponent<LogoProps> = ({ type }) => {
    const [size, setSize] = useState(38);

    useEffect(() => {
        if (type === "index-logo") {
            setSize(56);
        } else if (type === "small") {
            setSize(28);
        } else {
            setSize(38);
        }
    }, [type]);

    return (
        <LogoContainer size={size}>
            <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.9904 6.92265L16 0.57735C15.3812 0.220084 14.6188 0.220084 14 0.57735L3.00962 6.92265C2.39082 7.27991 2.00962 7.94017 2.00962 8.6547V21.3453C2.00962 22.0598 2.39082 22.7201 3.00962 23.0773L6.30377 24.9792C6.404 24.693 6.52736 24.3329 6.65829 23.9328C6.98395 22.9376 7.34183 21.7385 7.51756 20.8134C7.72434 19.7248 7.84664 18.2787 7.9163 17.0755C7.95077 16.48 7.97178 15.9552 7.98415 15.5796C7.99032 15.3919 7.99434 15.2418 7.9968 15.1391L7.9994 15.0219L8 14.9909C8.00494 11.1291 11.137 8 15 8C18.866 8 22 11.134 22 15C22 18.866 18.866 22 15 22C12.8904 22 10.9988 21.0668 9.71537 19.5907C9.65263 20.1474 9.57602 20.6939 9.48242 21.1866C9.28138 22.245 8.88926 23.5459 8.55911 24.5548C8.39209 25.0652 8.23719 25.5121 8.12396 25.8317C8.10293 25.891 8.08332 25.946 8.06532 25.9963L14 29.4226C14.6188 29.7799 15.3812 29.7799 16 29.4226L26.9904 23.0774C27.6092 22.7201 27.9904 22.0598 27.9904 21.3453V8.6547C27.9904 7.94017 27.6092 7.27992 26.9904 6.92265Z" />
                <path d="M20 15C20 17.7614 17.7614 20 15 20C12.2386 20 9.99999 17.7614 9.99999 15C9.99999 12.2386 12.2386 10 15 10C17.7614 10 20 12.2386 20 15Z" />
            </svg>
        </LogoContainer>
    );
};

export default Logo;
