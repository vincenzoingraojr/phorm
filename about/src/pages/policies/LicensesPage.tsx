import { PageLayout } from "../../components/PageLayout";
import { SEO } from "../../components/Seo";
import { PageContentLayout } from "../../components/sublayouts/PageContentLayout";
import { PageBaseContainer, PageDescription, PageText, PageTitle } from "../../styles/global";

function LicensesPage() {
    return (
        <>
            <SEO title="About Phorm | Licenses" description="In this page you can read about the licenses." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>Licenses</PageTitle>
                            <PageDescription>
                                Read more about the licenses of the technologies used in Phorm.
                            </PageDescription>
                            <PageText>
                                Licenses
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default LicensesPage;