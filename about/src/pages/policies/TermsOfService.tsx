import { PageLayout } from "../../components/PageLayout";
import { SEO } from "../../components/Seo";
import { PageContentLayout } from "../../components/sublayouts/PageContentLayout";
import { PageBaseContainer, PageDescription, PageText, PageTitle } from "../../styles/global";

function TermsOfService() {
    return (
        <>
            <SEO title="About Phorm | Terms of service" description="In this page you can read the terms of service of Phorm." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>Terms of service</PageTitle>
                            <PageDescription>
                                Phorm terms of service.
                            </PageDescription>
                            <PageText>
                                The web platform is not yet online, and this applies to the mobile applications too. The entire project is in an early development stage, when we will release all the apps we will also create the terms of service of the platform.
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default TermsOfService;