import { FunctionComponent, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

interface HeadProps {
    title: string;
    description: string;
    noTop?: boolean;
}

const Head: FunctionComponent<HeadProps> = ({
    title,
    description,
    noTop,
}) => {
    const { pathname } = useLocation();

    useEffect(() => {
        if (!noTop) {
            window.scrollTo(0, 0);
        }
    }, [pathname, noTop]);

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Helmet>
    );
};

export default Head;
