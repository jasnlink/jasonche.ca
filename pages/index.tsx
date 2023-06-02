import { dehydrate } from 'react-query'
import { useQuery } from 'react-query'
import { queryClient, getProfileCard } from '@/src/api'


import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'

import Text from '@/src/components/Text'
import ContentBlock from '@/src/components/ContentBlock'

export async function getStaticProps() {
    await queryClient.prefetchQuery(['profileCard'], () => getProfileCard())

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    const { data } = useQuery(['profileCard'], () => getProfileCard())
    const profileData = data?.allProfileCard[0]

    const pageTitle = `${profileData?.fullName} - Full Stack Web Software Developer`

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta property="og:title" content={pageTitle} key="title" />
            </Head>
            <div className="h-full flex items-center justify-center">
                <div className="mx-auto max-w-md bg-zinc-900 p-8 lg:p-12 rounded-sm">
                    <Image src={profileData?.profileImage?.asset?.url || ''} alt={profileData?.profileImage?.alt || ''} height={100} width={100} className="rounded-full" />
                    <Text mt={6} variant="title">{profileData?.fullName}</Text>
                    <ContentBlock mt={6} gap={6} content={profileData?.bioRaw} />
                    <div className="mt-6">
                        {profileData?.highlightedSkills?.map((skill, index) => {
                            let skillContent = `${skill?.skill}: ${skill?.years} years`
                            return <div key={index} className="mt-4">{skillContent}</div>
                        })}
                    </div>
                    <Link className="mt-8 text-black bg-zinc-50 font-medium rounded-sm py-2 px-4 text-center select-none block border border-transparent transition-all hover:bg-transparent hover:text-zinc-50 hover:border-zinc-50" href={profileData?.resume?.asset?.url || ''} target="_blank">See my resume</Link>
                </div>
            </div>
        </>
    )
}
