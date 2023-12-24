import Head from "../components/Head";
import { PageLayout } from "../components/layouts/PageLayout";
import { PageContentLayout } from "../components/layouts/sublayouts/PageContentLayout";
import { PageBaseContainer, PageText, PageTitle } from "../styles/global";

function Authentication() {
    return (
        <>
            <Head title="Phorm" description="Your scientific AI chatbot." />
            <PageLayout 
                children={
                    <PageContentLayout 
                        children={
                            <PageBaseContainer>
                                <PageTitle>Phorm</PageTitle>
                                <PageText>
                                    AI-driven solutions for scientific problem-solving, empowering researchers, and making science accessible to everyone.
                                </PageText>
                                <PageText>
                                    <b>You're not logged in.</b>
                                </PageText>
                            </PageBaseContainer>
                        }
                    />
                }   
            />
        </>
    );
}

export default Authentication;
