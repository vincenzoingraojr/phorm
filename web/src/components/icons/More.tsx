import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

const MoreIcon = styled(SvgIcon)`
    width: 24px;
    height: 24px;
    fill: #000000;
    stroke: none;
`;

function More() {
    return (
        <MoreIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle cx="256" cy="256" r="48"/><circle cx="256" cy="416" r="48"/><circle cx="256" cy="96" r="48"/></svg>
        </MoreIcon>
    );
}

export default More;
