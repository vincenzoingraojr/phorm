import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

const ShieldIcon = styled(SvgIcon)`
    width: 24px;
    height: 24px;
    stroke: #000000;
    fill: none;
`;

function Shield() {
    return (
        <ShieldIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M463.1 112.37C373.68 96.33 336.71 84.45 256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 240.58 457.79 256 464c15.42-6.21 223.3-94.87 207.1-351.63z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
        </ShieldIcon>
    );
}

export default Shield;