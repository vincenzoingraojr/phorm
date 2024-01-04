import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

const ForwardArrow = styled(SvgIcon)`
    width: 24px;
    height: 24px;
    stroke: #000000;
    fill: none;
`;

function Forward() {
    return (
        <ForwardArrow>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="48" d="M268 112l144 144-144 144M392 256H100"/></svg>
        </ForwardArrow>
    );
}

export default Forward;