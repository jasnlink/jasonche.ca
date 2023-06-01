import { Hydrate, QueryClientProvider } from 'react-query'

import { queryClient } from '@/src/api'

import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/src/components/Layout'
import NavMenu from '@/src/components/NavMenu'
import Content from '@/src/components/Content'

export default function App({ Component, pageProps }: AppProps) {

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <Layout>
                    <NavMenu />
                    <Content>
                        <Component {...pageProps} />
                    </Content>
                </Layout>
            </Hydrate>
        </QueryClientProvider>
    )
}
