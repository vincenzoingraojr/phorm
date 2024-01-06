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
                                Read more about the licenses for the technologies used in Phorm.
                            </PageDescription>
                            <PageText>
                                We'll upload the licenses for the technologies used in Phorm once all the apps are online. 
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default LicensesPage;