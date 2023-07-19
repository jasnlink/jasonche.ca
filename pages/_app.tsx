import { Hydrate, QueryClientProvider } from 'react-query'
import { queryClient } from '@/src/api'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/src/components/Layout'
import NavMenu from '@/src/components/NavMenu'
import Content from '@/src/components/Content'

import { Partytown } from '@builder.io/partytown/react'
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
                                <Partytown debug={true} logScriptExecution={true} forward={['dataLayer', 'gtag']} />
                                <Script
                                    id="google-analytics"
                                    type="text/partytown"
                                    strategy="afterInteractive"
                                    src="https://www.googletagmanager.com/gtag/js?id=G-YLMZM6JBQX"
                                />
                                <Script
                                    id="google-tag"
                                    type="text/partytown"
                                    strategy="afterInteractive"
                                >
                                    {`
                                        window.dataLayer = window.dataLayer || [];
                                        window.gtag = function gtag(){window.dataLayer.push(arguments);}
                                        gtag('js', new Date());
                                        gtag('config', 'G-YLMZM6JBQX',{ 'debug_mode':true });
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
