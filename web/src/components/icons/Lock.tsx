import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

const LockIcon = styled(SvgIcon)`
    width: 24px;
    height: 24px;
    stroke: #000000;
    fill: none;
`;

function Lock() {
    return (
        <LockIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M336 208v-95a80 80 0 00-160 0v95" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><rect x="96" y="208" width="320" height="272" rx="48" ry="48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/></svg>
        </LockIcon>
    );
}

export default Lock;