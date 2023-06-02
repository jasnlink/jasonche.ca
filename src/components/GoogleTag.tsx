import Script from "next/script"

export default function GoogleTag() {
    return (
        <>
            <Script defer src="https://www.googletagmanager.com/gtag/js?id=G-YLMZM6JBQX" strategy="lazyOnload" />
            <Script defer id="google-analytics" strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-YLMZM6JBQX');
                    gtag('config', 'G-YLMZM6JBQX', {
                        page_path: window.location.pathname,
                    });
                `}
            </Script>
        </>
    )
}