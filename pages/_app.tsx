import { Hydrate, QueryClientProvider } from 'react-query'
import { queryClient } from '@/src/api'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/src/components/Layout'
import NavMenu from '@/src/components/NavMenu'
import Content from '@/src/components/Content'

import dynamic from 'next/dynamic'

export default function App({ Component, pageProps }: AppProps) {

    const isProduction = process.env.NODE_ENV === "production";
    const DynamicGoogleTag = dynamic(() => import('@/src/components/GoogleTag'))

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Layout>
                    <NavMenu />
                    <Content>
                        {!!isProduction && (
                            <DynamicGoogleTag />
                        )}
                        <Component {...pageProps} />
                    </Content>
                </Layout>
            </Hydrate>
        </QueryClientProvider>
    )
}
