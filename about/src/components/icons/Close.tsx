import styled from "styled-components";
import { FunctionComponent, useEffect, useState } from "react";
import { SvgIcon } from "../../styles/global";

interface CloseProps {
    type: string;
}

const CloseIcon = styled(SvgIcon).attrs(
    (props: { isNormal: boolean }) => props
)`
    width: ${(props) => (props.isNormal ? "24px" : "18px")};
    height: ${(props) => (props.isNormal ? "24px" : "18px")};
    fill: none;
    stroke: #000000;
`;

const Close: FunctionComponent<CloseProps> = ({ type }) => {
    const [isNormal, setIsNormal] = useState(false);

    useEffect(() => {
        if (type === "normal") {
            setIsNormal(true);
        } else {
            setIsNormal(false);
        }
    }, [type]);

    return (
        <CloseIcon isNormal={isNormal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368L144 144M368 144L144 368"/></svg>
        </CloseIcon>
    );
};

export default Close;
