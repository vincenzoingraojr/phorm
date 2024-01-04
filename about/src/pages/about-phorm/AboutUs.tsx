import { PageLayout } from "../../components/PageLayout";
import { SEO } from "../../components/Seo";
import { PageContentLayout } from "../../components/sublayouts/PageContentLayout";
import { PageBaseContainer, PageDescription, PageText, PageTitle } from "../../styles/global";

function AboutUs() {
    return (
        <>
            <SEO title="About Phorm | The project" description="In this page you can find out more about the project." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>About the project</PageTitle>
                            <PageDescription>
                                Discover more about the project and the products we're building.
                            </PageDescription>
                            <PageText>
                                Phorm.
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default AboutUs;