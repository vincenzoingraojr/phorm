import { devices } from "../../styles/devices";
import { PageBlock, PageText } from "../../styles/global";
import styled from "styled-components";
import Logo from "../icons/Logo";
import { Link } from "react-router-dom";

interface PageLayoutProps {
    children: JSX.Element;
}

const PageLayoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 100vh;
    gap: 48px;
    margin-top: 0px;
    margin-bottom: 0px;
`;

const MainComponent = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const BrandContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const BrandInnerContainer = styled.div`
    display: inline-flex;
    margin-top: 48px;
    padding-bottom: 48px;
    padding-left: 24px;
    padding-right: 24px;
    width: 100%;

    @media ${devices.mobileS} {
        padding-left: 32px;
        padding-right: 32px;
    }

    @media ${devices.mobileL} {
        width: 380px;
    }

    @media (min-width: 600px) {
        width: 440px;
    }

    @media ${devices.tablet} {
        width: 520px;
    }

    @media ${devices.laptopM} {
        width: 640px;
    }
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    height: 80px;
    font-size: 14px;
    column-gap: 12px;
    row-gap: 4px;
    padding-left: 24px;
    padding-right: 24px;
    width: 100%;

    @media ${devices.mobileS} {
        padding-left: 32px;
        padding-right: 32px;
    }

    @media ${devices.mobileL} {
        width: 380px;
    }

    @media (min-width: 600px) {
        width: 440px;
    }

    @media ${devices.tablet} {
        width: 520px;
    }

    @media ${devices.laptopM} {
        width: 640px;
    }
`;

const FooterItem = styled(PageText)`
    display: block;
    text-rendering: optimizeLegibility;
`;

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <PageLayoutContainer>
            <BrandContainer>
                <BrandInnerContainer>
                    <PageBlock>
                        <Link to="/" title="Go to the homepage" aria-label="Go to the homepage">
                            <Logo type="index-logo" />
                        </Link>
                    </PageBlock>
                </BrandInnerContainer>
            </BrandContainer>
            <MainComponent>{children}</MainComponent>
            <Footer>
                <FooterItem>
                    &copy; {new Date().getFullYear()} Phorm
                </FooterItem>
                <FooterItem>
                    <a href="https://about.phormapp.com" target="_blank" rel="noreferrer noopener" title="About Phorm" aria-label="About Phorm">About</a>
                </FooterItem>
                <FooterItem>
                    <a href="https://about.phormapp.com/tos" target="_blank" rel="noreferrer noopener" title="Terms of use" aria-label="Terms of use">Terms of use</a>
                </FooterItem>
                <FooterItem>
                    <a href="https://about.phormapp.com/privacy-policy" target="_blank" rel="noreferrer noopener" title="Privacy policy" aria-label="Privacy policy">Privacy policy</a>
                </FooterItem>
            </Footer>
        </PageLayoutContainer>
    );
};
