import { PageLayout } from "../../components/PageLayout";
import { SEO } from "../../components/Seo";
import { PageContentLayout } from "../../components/sublayouts/PageContentLayout";
import { PageBaseContainer, PageDescription, PageText, PageTitle } from "../../styles/global";

function ProductPage() {
    return (
        <>
            <SEO title="About Phorm | The project" description="What we're building with Phorm." />
            <PageLayout children={
                <PageContentLayout
                    children={
                        <PageBaseContainer>
                            <PageTitle>The product</PageTitle>
                            <PageDescription>
                                Read more about what we're building with Phorm.
                            </PageDescription>
                            <PageText>
                                The product.
                            </PageText>
                        </PageBaseContainer>
                    }  
                />
            } />
        </>
    );
};

export default ProductPage;