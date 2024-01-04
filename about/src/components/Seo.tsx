import { FunctionComponent, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

interface SeoProps {
    title: string;
    description: string;
    image?: string;
    isLarge?: boolean;
}

export const SEO: FunctionComponent<SeoProps> = ({
    title,
    description,
    image,
    isLarge,
}) => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
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
                        : "https://cdn.phormapp.com/brand/logo.png"
                }
            />
            <meta
                property="twitter:image"
                content={
                    image
                        ? image
                        : "https://cdn.phormapp.com/brand/logo.png"
                }
            />
        </Helmet>
    );
};
