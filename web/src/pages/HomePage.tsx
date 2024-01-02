import Head from "../components/Head";
import { useMeQuery } from "../generated/graphql";
import ChatLayout from "../components/layouts/ChatLayout";

function HomePage() {
    const { data } = useMeQuery({
        fetchPolicy: "network-only",
    });

    return (
        <>
            <Head
                title="Home | Phorm"
                description="Your scientific AI chatbot."
            />
            <ChatLayout>
                Hello, {data?.me?.firstName}
            </ChatLayout>
        </>
    );
}

export default HomePage;
