import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/src/components/Layout'
import NavMenu from '@/src/components/NavMenu'
import Content from '@/src/components/Content'
import Router from 'next/router'

export default function App({ Component, pageProps }: AppProps) {


    return (
        <Layout>
            <NavMenu />
            <Content>
                <Component {...pageProps} />
            </Content>
        </Layout>
    )
}
