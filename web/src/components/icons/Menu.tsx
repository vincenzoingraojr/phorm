import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

const MenuIcon = styled(SvgIcon)`
    width: 26px;
    height: 26px;
    fill: none;
    stroke: #000000;
`;

function Menu() {
    return (
        <MenuIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="32" d="M80 160h352M80 256h352M80 352h352"/></svg>
        </MenuIcon>
    );
}

export default Menu;
