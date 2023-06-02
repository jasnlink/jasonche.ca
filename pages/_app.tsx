import { Hydrate, QueryClientProvider } from 'react-query'
import { queryClient } from '@/src/api'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/src/components/Layout'
import NavMenu from '@/src/components/NavMenu'
import Content from '@/src/components/Content'

import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {

    const isProduction = process.env.NODE_ENV === "production";

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Layout>
                    <NavMenu />
                    <Content>
                        {!!isProduction && (
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
                        )}
                        <Component {...pageProps} />
                    </Content>
                </Layout>
            </Hydrate>
        </QueryClientProvider>
    )
}
