import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

const DownArrow = styled(SvgIcon)`
    width: 18px;
    height: 18px;
    stroke: #000000;
    fill: none;
`;

function Down() {
    return (
        <DownArrow>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M112 184l144 144 144-144"/></svg>
        </DownArrow>
    );
}

export default Down;
