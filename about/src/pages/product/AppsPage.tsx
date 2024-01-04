import { PageLayout } from "../../components/PageLayout";
import { SEO } from "../../components/Seo";
import { PageContentLayout } from "../../components/sublayouts/PageContentLayout";
import { PageBaseContainer, PageDescription, PageSmallTitle, PageText, PageTitle } from "../../styles/global";

function AppsPage() {
    return (
        <>
            <SEO title="About Phorm | Apps" description="In this page you can read about the apps we're building." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>Apps</PageTitle>
                            <PageDescription>
                                Read about the apps.
                            </PageDescription>
                            <PageText>
                                Read about the project development.
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Web
                                </PageSmallTitle>
                                <PageText>
                                    Web app.
                                </PageText>
                            </PageText>
                            <PageText>
                                <PageSmallTitle>
                                    Android & iOS
                                </PageSmallTitle>
                                <PageText>
                                    Android & iOS apps.
                                </PageText>
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default AppsPage;