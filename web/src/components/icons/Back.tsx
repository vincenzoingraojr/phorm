import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

const BackArrow = styled(SvgIcon)`
    width: 24px;
    height: 24px;
    stroke: #000000;
    fill: none;
`;

function Back() {
    return (
        <BackArrow>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"/></svg>
        </BackArrow>
    );
}

export default Back;
