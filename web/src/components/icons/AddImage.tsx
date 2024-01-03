import styled from "styled-components";
import { SvgIcon } from "../../styles/global";

const AddImageIcon = styled(SvgIcon)`
    width: 24px;
    height: 24px;
    stroke: #ffffff;
    fill: none;
`;

function AddImage() {
    return (
        <AddImageIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M320 255.79l-64-64-64 64M256 448.21V207.79"/></svg>
        </AddImageIcon>
    );
}

export default AddImage;