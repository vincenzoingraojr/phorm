import { FunctionComponent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { SmallButton } from "../styles/global";
import PortalComponent from "../utils/PortalComponent";

interface MenuOptionsProps {
    title: string;
    children: JSX.Element;
    isOpen: boolean;
    toggleOptions: () => void;
    fixedBehaviour?: boolean;
    icon: JSX.Element;
    mirrored?: boolean;
    passedHeight?: number;
    passedScrollY?: number;
}

const MenuOptionsContainer = styled.div`
    display: block;
`;

const OptionsContainerBackground = styled.div`
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: rgba(21, 20, 20, 0.6);
`;

const MenuOptionsButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 9999px;
    background-color: transparent;
    transition: background-color ease 0.2s;

    &:hover,
    &:focus {
        background-color: rgba(56, 53, 53, 0.6);
    }
`;

const OptionsContainer = styled.div.attrs(
    (props: { isInUpperHalf: boolean; top: number; side: number, mirrored?: boolean }) => props
)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: fixed;
    top: unset;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    background-color: #ffffff;
    border-radius: 24px 24px 0px 0px;
    z-index: 1000;
    max-height: 50vh;
    overflow: auto;
    width: 100%;
    padding-top: 24px;

    @media ${devices.mobileL} {
        border-radius: 12px;
        background-color: #ffffff;
        top: ${(props) => props.top}px;
        left: ${(props) => props.mirrored ? `${props.side}px` : "unset"};
        right: ${(props) => props.mirrored ? "unset" : `${props.side}px`};
        bottom: unset;
        max-height: unset;
        overflow: hidden;
        width: max-content;
        max-width: 384px;
        min-width: 140px;
        transform: ${(props) =>
            props.isInUpperHalf
                ? "translateY(0)"
                : "translateY(calc(-100% + 36px))"};
        padding-top: 0px;
    }
`;

const OptionsContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    z-index: 9999;
`;

const CloseOptionsContainer = styled.div`
    display: block;
    font-weight: 700;
    padding-top: 24px;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 30px;
    width: 100%;

    @media ${devices.mobileL} {
        display: none;
    }
`;

const CloseOptionsButton = styled(SmallButton)`
    color: #000000;
    border: 2px solid #000000;
    width: 100%;
`;

export const MenuOptions: FunctionComponent<MenuOptionsProps> = ({
    title,
    children,
    isOpen,
    toggleOptions,
    icon,
    fixedBehaviour,
    mirrored,
    passedHeight,
    passedScrollY,
}) => {
    const buttonRef = useRef<HTMLDivElement | null>(null);
    const [top, setTop] = useState<number>(0);
    const [side, setSide] = useState<number>(0);
    const [isInUpperHalf, setIsInUpperHalf] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const buttonElement = buttonRef.current;
            
            if (buttonElement) {
                const rect = buttonElement.getBoundingClientRect();
                const screenHeight = passedHeight ? passedHeight : document.body.clientHeight;
                const scrollY = passedScrollY ? passedScrollY : window.scrollY;

                const position = rect.top + scrollY;

                setIsInUpperHalf(position < screenHeight / 2);

                setTop(rect.top);
                setSide(mirrored ? rect.left : document.body.clientWidth - rect.right);
            }
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        window.addEventListener("click", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            window.removeEventListener("click", handleScroll);
        };
    }, [mirrored, passedHeight, passedScrollY]);

    return (
        <MenuOptionsContainer onClick={(e) => e.stopPropagation()}>
            <MenuOptionsButton
                role="button"
                title={title}
                aria-label={title}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleOptions();
                }}
                ref={buttonRef}
            >
                {icon}
            </MenuOptionsButton>
            {isOpen && (
                <PortalComponent>
                    <OptionsContainerBackground
                        onClick={() => {
                            toggleOptions();
                        }}
                    />
                    <OptionsContainer
                        onClick={(e) => e.stopPropagation()}
                        role="menu"
                        top={top}
                        side={side}
                        mirrored={mirrored}
                        isInUpperHalf={
                            fixedBehaviour !== undefined
                                ? fixedBehaviour
                                : isInUpperHalf
                        }
                    >
                        <OptionsContent>{children}</OptionsContent>
                        <CloseOptionsContainer>
                            <CloseOptionsButton
                                role="button"
                                title="Close"
                                aria-label="Close"
                                onClick={() => {
                                    toggleOptions();
                                }}
                            >
                                Close
                            </CloseOptionsButton>
                        </CloseOptionsContainer>
                    </OptionsContainer>
                </PortalComponent>
            )}
        </MenuOptionsContainer>
    );
};
