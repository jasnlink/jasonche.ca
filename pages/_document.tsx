import { Html, Head, Main, NextScript } from 'next/document'
import { Partytown } from '@builder.io/partytown/react'
import Script from 'next/script'

export default function Document() {
  const isProduction = process.env.NODE_ENV === "production";
  return (
    <Html lang="en">
      <Head>
      {!!isProduction && (
        <>
          <Partytown debug={true} logScriptExecution={true} forward={['dataLayer.push']} />
          <Script
            id="google-analytics"
            type="text/partytown"
            strategy="worker"
            src="https://www.googletagmanager.com/gtag/js?id=G-YLMZM6JBQX"
          />
        </>
      )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
