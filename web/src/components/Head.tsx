import { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

interface HeadProps {
    title: string;
    description: string;
    isLarge?: boolean;
    image?: string;
}

const Head: FunctionComponent<HeadProps> = ({
    title,
    description,
    isLarge,
    image,
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta
                name="twitter:card"
                content={isLarge ? "summary_large_image" : "summary"}
            />
            <meta
                property="og:image"
                content={
                    image
                        ? image
                        : "https://cdn.phormlabs.com/brand/logo.png"
                }
            />
            <meta
                property="twitter:image"
                content={
                    image
                        ? image
                        : "https://cdn.phormlabs.com/brand/logo.png"
                }
            />
        </Helmet>
    );
};

export default Head;
